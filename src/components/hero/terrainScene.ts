import type * as THREE_NS from "three";

/**
 * A real-time 3D Himalayan relief: ridged-noise mountains with a river
 * valley carved through them, drawn as a hand-plotted survey map
 * (contour lines + graticule) that "draws itself" as the camera arrives.
 */

// ---------- deterministic value noise ----------
function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}
function smooth(t: number) {
  return t * t * (3 - 2 * t);
}
function noise(x: number, y: number) {
  const ix = Math.floor(x),
    iy = Math.floor(y);
  const fx = x - ix,
    fy = y - iy;
  const a = hash(ix, iy),
    b = hash(ix + 1, iy),
    c = hash(ix, iy + 1),
    d = hash(ix + 1, iy + 1);
  const ux = smooth(fx),
    uy = smooth(fy);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy; // 0..1
}
function ridged(x: number, y: number) {
  let sum = 0,
    amp = 0.55,
    freq = 1,
    prev = 1;
  for (let i = 0; i < 5; i++) {
    let n = 1 - Math.abs(noise(x * freq, y * freq) * 2 - 1);
    n = n * n;
    sum += n * amp * prev;
    prev = n;
    freq *= 2.03;
    amp *= 0.5;
  }
  return sum;
}
function fbm(x: number, y: number) {
  let s = 0,
    a = 0.5,
    f = 1;
  for (let i = 0; i < 4; i++) {
    s += noise(x * f, y * f) * a;
    f *= 2.1;
    a *= 0.5;
  }
  return s;
}

/** river centre-line x for a given z */
export const riverX = (z: number) => Math.sin(z * 0.085) * 4.2 + Math.sin(z * 0.031 + 1.3) * 6.5;

export function heightAt(x: number, z: number) {
  const m = ridged(x * 0.075 + 3.1, z * 0.075 - 7.4) * 9.5 + fbm(x * 0.2, z * 0.2) * 1.6;
  const dv = Math.abs(x - riverX(z));
  const t = Math.min(1, Math.max(0, (dv - 1.2) / 8.5));
  const valley = t * t * (3 - 2 * t);
  return -0.4 + fbm(x * 0.6, z * 0.6) * 0.35 + m * valley;
}

export interface Waypoint {
  x: number;
  z: number;
}

export interface TerrainScene {
  render: (state: { flight: number; overview: number; reveal: number; time: number }) => void;
  resize: (w: number, h: number) => void;
  project: (i: number) => { x: number; y: number; visible: boolean };
  dispose: () => void;
}

export function createTerrainScene(
  THREE: typeof THREE_NS,
  canvas: HTMLCanvasElement,
  waypoints: Waypoint[],
  lite: boolean
): TerrainScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !lite, alpha: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(lite ? 1.25 : 1.75, window.devicePixelRatio || 1));
  const INK = new THREE.Color("#0d0b09");
  const FOG = new THREE.Color("#1a1612");
  renderer.setClearColor(FOG, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 170);

  // ---------- terrain ----------
  const SIZE = 90;
  const SEG = lite ? 170 : 300;
  const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position as THREE_NS.BufferAttribute;
  const river = new Float32Array(pos.count);
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i),
      z = pos.getZ(i);
    pos.setY(i, heightAt(x, z));
    const d = Math.abs(x - riverX(z));
    river[i] = 1 - Math.min(1, Math.max(0, (d - 0.12) / 0.35));
  }
  geo.setAttribute("aRiver", new THREE.BufferAttribute(river, 1));
  geo.computeVertexNormals();

  const terrainMat = new THREE.ShaderMaterial({
    uniforms: {
      uInk: { value: INK },
      uFog: { value: FOG },
      uRock: { value: new THREE.Color("#9c8364") },
      uShade: { value: new THREE.Color("#2a2119") },
      uGold: { value: new THREE.Color("#e2c88f") },
      uReveal: { value: 0 },
      uOverview: { value: 0 },
      uCam: { value: new THREE.Vector3() },
    },
    vertexShader: /* glsl */ `
      attribute float aRiver;
      varying float vH; varying vec3 vW; varying vec3 vN; varying float vR;
      void main(){
        vH = position.y; vR = aRiver;
        vec4 w = modelMatrix * vec4(position, 1.0);
        vW = w.xyz; vN = normalize(normal);
        gl_Position = projectionMatrix * viewMatrix * w;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 uInk; uniform vec3 uFog; uniform vec3 uRock; uniform vec3 uShade; uniform vec3 uGold;
      uniform float uReveal; uniform float uOverview; uniform vec3 uCam;
      varying float vH; varying vec3 vW; varying vec3 vN; varying float vR;
      float lineAA(float v, float w){
        float d = abs(fract(v - 0.5) - 0.5) / max(fwidth(v), 1e-4);
        return 1.0 - min(d / w, 1.0);
      }
      void main(){
        vec3 N = normalize(vN);
        vec3 L = normalize(vec3(-0.7, 0.5, 0.35));
        float diff = clamp(dot(N, L), 0.0, 1.0);
        float slope = 1.0 - N.y;
        // sun-raked rock, shadowed gullies
        vec3 base = mix(uShade, uRock, 0.15 + 0.85 * diff);
        base *= 0.75 + 0.25 * smoothstep(-0.5, 8.0, vH);
        // snow caps on the high, gentler faces
        float snow = smoothstep(5.6, 7.6, vH) * (1.0 - smoothstep(0.5, 0.85, slope));
        base = mix(base, vec3(0.95, 0.93, 0.88) * (0.5 + 0.5 * diff), snow * 0.85);

        // survey linework: 50 m contours, 250 m index contours, 4-unit graticule
        float contour = lineAA(vH * 2.0, 1.0) * 0.4;
        float major = lineAA(vH * 0.4, 1.3) * 0.85;
        float grid = max(lineAA(vW.x / 4.0, 0.8), lineAA(vW.z / 4.0, 0.8)) * 0.16;
        float lines = max(max(contour, major), grid);

        // the survey is plotted outward from the viewer
        float dist = length(vW - uCam);
        float front = uReveal * 80.0;
        float drawn = 1.0 - smoothstep(front - 8.0, front, dist);
        float edge = smoothstep(front - 3.0, front, dist) * (1.0 - smoothstep(front, front + 0.8, dist));

        vec3 col = mix(uInk, base, drawn * (0.2 + 0.8 * uReveal));
        col = mix(col, uGold, lines * drawn * mix(0.5, 0.85, uOverview));
        col += uGold * edge * (1.0 - uOverview);
        col = mix(col, vec3(0.7, 0.8, 0.84), vR * drawn * 0.45);

        float fog = smoothstep(mix(16.0, 36.0, uOverview), mix(55.0, 95.0, uOverview), dist);
        col = mix(col, uFog, fog);
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  const terrain = new THREE.Mesh(geo, terrainMat);
  scene.add(terrain);

  // ---------- drifting snow / dust ----------
  const N = lite ? 450 : 1400;
  const pGeo = new THREE.BufferGeometry();
  const pArr = new Float32Array(N * 3);
  const pSeed = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    pArr[i * 3] = (Math.random() - 0.5) * 40;
    pArr[i * 3 + 1] = Math.random() * 16;
    pArr[i * 3 + 2] = (Math.random() - 0.5) * 40;
    pSeed[i] = Math.random();
  }
  pGeo.setAttribute("position", new THREE.BufferAttribute(pArr, 3));
  pGeo.setAttribute("aSeed", new THREE.BufferAttribute(pSeed, 1));
  const pMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uAlpha: { value: 0 }, uPx: { value: renderer.getPixelRatio() } },
    vertexShader: /* glsl */ `
      attribute float aSeed; uniform float uTime; uniform float uPx; varying float vA;
      void main(){
        vec3 p = position;
        p.y = mod(p.y + uTime * (0.25 + aSeed * 0.6), 16.0) - 1.0;
        p.x += sin(uTime * 0.3 + aSeed * 30.0) * 0.4;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (1.2 + aSeed * 2.2) * uPx * (14.0 / -mv.z);
        vA = 0.25 + 0.6 * aSeed;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uAlpha; varying float vA;
      void main(){
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d) * vA * uAlpha;
        gl_FragColor = vec4(0.92, 0.84, 0.65, a);
      }`,
  });
  const points = new THREE.Points(pGeo, pMat);
  scene.add(points);

  // ---------- survey pins ----------
  const pinWorld: THREE_NS.Vector3[] = [];
  const pinGroup = new THREE.Group();
  const pinMat = new THREE.LineBasicMaterial({ color: 0xe2c88f, transparent: true, opacity: 0 });
  const ringGeo = new THREE.RingGeometry(0.45, 0.55, 48);
  ringGeo.rotateX(-Math.PI / 2);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xe2c88f, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false });
  waypoints.forEach((w) => {
    const gy = heightAt(w.x, w.z);
    const top = new THREE.Vector3(w.x, gy + 4.2, w.z);
    pinWorld.push(top);
    const lg = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(w.x, gy, w.z), top]);
    pinGroup.add(new THREE.Line(lg, pinMat));
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(w.x, gy + 0.05, w.z);
    pinGroup.add(ring);
  });
  scene.add(pinGroup);

  // ---------- camera flight path down the valley ----------
  const pts: THREE_NS.Vector3[] = [];
  for (let i = 0; i <= 14; i++) {
    const t = i / 14;
    const z = 30 - t * 44;
    const ground = Math.max(heightAt(riverX(z), z), 0);
    const alt = 11 * Math.pow(1 - Math.min(1, t / 0.4), 2) + 2.2; // dive, then skim the river
    pts.push(new THREE.Vector3(riverX(z), ground + alt, z));
  }
  const path = new THREE.CatmullRomCurve3(pts, false, "centripetal");
  const OVER_POS = new THREE.Vector3(-3, 38, 30);
  const OVER_LOOK = new THREE.Vector3(-3, 0, -1);
  const camPos = new THREE.Vector3();
  const look = new THREE.Vector3();
  const tmp = new THREE.Vector3();
  const tmp2 = new THREE.Vector3();

  let W = 1,
    H = 1;

  return {
    resize(w, h) {
      W = w;
      H = h;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const portrait = w / h < 0.8;
      camera.fov = portrait ? 64 : 52;
      OVER_POS.set(-3, portrait ? 56 : 38, portrait ? 36 : 30);
      camera.updateProjectionMatrix();
    },
    render({ flight, overview, reveal, time }) {
      const f = Math.min(0.999, Math.max(0, flight));
      path.getPointAt(f, tmp);
      path.getPointAt(Math.min(1, f + 0.22), tmp2);
      tmp2.y = Math.max(tmp2.y, tmp.y - 2.5) + 0.4; // look up the valley, not at our feet
      // gentle banking sway, like a real aerial shot
      tmp.x += Math.sin(time * 0.35) * 0.15;
      camPos.lerpVectors(tmp, OVER_POS, overview);
      look.lerpVectors(tmp2, OVER_LOOK, overview);
      camera.position.copy(camPos);
      camera.up.set(Math.sin(f * 6.0) * 0.06 * (1 - overview), 1, 0).normalize();
      camera.lookAt(look);

      terrainMat.uniforms.uReveal.value = reveal;
      terrainMat.uniforms.uOverview.value = overview;
      terrainMat.uniforms.uCam.value.copy(camPos);
      pMat.uniforms.uTime.value = time;
      pMat.uniforms.uAlpha.value = reveal * (1 - overview * 0.7);
      pinMat.opacity = overview;
      ringMat.opacity = overview * 0.9;
      points.position.set(camPos.x, 0, camPos.z - 6);
      renderer.render(scene, camera);
    },
    project(i) {
      const v = pinWorld[i].clone().project(camera);
      return { x: ((v.x + 1) / 2) * W, y: ((1 - v.y) / 2) * H, visible: v.z < 1 };
    },
    dispose() {
      geo.dispose();
      terrainMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      pinMat.dispose();
      renderer.dispose();
    },
  };
}
