"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getManifestImage } from "@/data/images.manifest";

interface RealImageProps {
  imageKey: string;
  srcOverride?: string;
  altOverride?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  compactSkeleton?: boolean;
}

const warnedKeys = new Set<string>();

export default function RealImage({
  imageKey,
  srcOverride,
  altOverride,
  className = "",
  imgClassName = "",
  priority = false,
  compactSkeleton = false,
}: RealImageProps) {
  const asset = getManifestImage(imageKey);
  const targetSrc = srcOverride || asset.src;
  const targetAlt = altOverride || asset.alt;
  const isPriority = priority || Boolean(asset.priority);

  const [currentSrc, setCurrentSrc] = useState(targetSrc);
  const [missing, setMissing] = useState(false);
  const [retried, setRetried] = useState(false);

  useEffect(() => {
    setCurrentSrc(targetSrc);
    setMissing(false);
    setRetried(false);
  }, [targetSrc]);

  const handleError = () => {
    if (!retried) {
      setRetried(true);
      // If was /images/..., try /images/real/... or .jpg
      if (currentSrc.includes("/images/real/")) {
        setCurrentSrc(currentSrc.replace("/images/real/", "/images/"));
      } else if (currentSrc.endsWith(".webp")) {
        setCurrentSrc(currentSrc.replace(/\.webp$/, ".jpg"));
      } else {
        setMissing(true);
      }
    } else {
      setMissing(true);
    }
  };

  useEffect(() => {
    if (missing && !warnedKeys.has(targetSrc)) {
      warnedKeys.add(targetSrc);
      console.warn(
        `[Trail Stories TODO] Missing real image asset at "/public${targetSrc}". Drop your authentic WebP/AVIF photograph there.`
      );
    }
  }, [missing, targetSrc]);

  const fileName = currentSrc.split("/").pop() || imageKey;

  return (
    <div
      className={`relative overflow-hidden bg-deep-beige text-black select-none ${className}`}
    >
      {!missing ? (
        <img
          src={currentSrc}
          alt={targetAlt}
          width={asset.width}
          height={asset.height}
          loading={isPriority ? "eager" : "lazy"}
          onError={handleError}
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      ) : (
        <div
          role="img"
          aria-label={targetAlt}
          className="w-full h-full min-h-full bg-beige grain-overlay flex flex-col justify-between p-4 sm:p-6 border border-black/10 relative"
        >
          {/* Subtle architectural crosshairs for luxury editorial skeleton */}
          <div
            aria-hidden="true"
            className="absolute inset-3 border border-black/8 pointer-events-none"
          />

          {!compactSkeleton ? (
            <>
              <div className="relative z-10 flex items-center justify-between gap-2 text-[10px] tracking-[0.2em] uppercase text-muted font-sans">
                <span>Trail Stories Archive</span>
                <span>
                  {asset.width}×{asset.height}
                </span>
              </div>

              <div className="relative z-10 my-auto py-4 text-center space-y-1.5 px-2">
                <p className="font-serif italic text-lg sm:text-xl text-black/80 leading-snug">
                  {targetAlt}
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted font-mono">
                  /public/images/real/{fileName}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-muted">
                <span>Awaiting Real Plate</span>
                <span>WebP</span>
              </div>
            </>
          ) : (
            <div className="relative z-10 m-auto text-center">
              <span className="text-[9px] tracking-[0.18em] uppercase text-muted block">
                {imageKey.replace("dest-", "").replace("traveler-", "T")}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

