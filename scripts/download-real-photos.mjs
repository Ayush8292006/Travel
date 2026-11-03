import fs from "fs";
import path from "path";
import https from "https";

// Real, authentic, high-quality Unsplash photography for India travel
const PHOTO_URLS = {
  // HEROES (16:9)
  "hero-spiti": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1920&h=1080&q=85",
  "hero-kashmir": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1920&h=1080&q=85",
  "hero-rajasthan": "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1920&h=1080&q=85",
  "hero-ladakh": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&h=1080&q=85",

  // DESTINATIONS (3:4)
  "dest-spiti": "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&h=1600&q=85",
  "dest-kashmir": "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1200&h=1600&q=85",
  "dest-manali": "https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&h=1600&q=85",
  "dest-ladakh": "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&h=1600&q=85",
  "dest-rajasthan": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&h=1600&q=85",
  "dest-kerala": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&h=1600&q=85",
  "dest-goa": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&h=1600&q=85",

  // TRIPS (4:3)
  "trip-1": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&h=900&q=85",
  "trip-2": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&h=900&q=85",
  "trip-3": "https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1200&h=900&q=85",
  "trip-4": "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1200&h=900&q=85",
  "trip-5": "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&h=900&q=85",
  "trip-6": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&h=900&q=85",
  "trip-7": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&h=900&q=85",
  "trip-8": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&h=900&q=85",

  // MOMENTS (9:16)
  "moment-1": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=720&h=1280&q=85",
  "moment-2": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=720&h=1280&q=85",
  "moment-3": "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=720&h=1280&q=85",
  "moment-4": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=720&h=1280&q=85",
  "moment-5": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=720&h=1280&q=85",
  "moment-6": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=720&h=1280&q=85",

  // TRAVELERS (1:1)
  "traveler-1": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=600&q=85",
  "traveler-2": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=600&q=85",
  "traveler-3": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=600&q=85",
  "traveler-4": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&h=600&q=85",

  // INSTAGRAM (1:1)
  "insta-1": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&h=800&q=85",
  "insta-2": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&h=800&q=85",
  "insta-3": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&h=800&q=85",
  "insta-4": "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&h=800&q=85",
  "insta-5": "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&h=800&q=85",
  "insta-6": "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&h=800&q=85",
  "insta-7": "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&h=800&q=85",
  "insta-8": "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&h=800&q=85",

  // OG
  "og-default": "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&h=630&q=85"
};

function downloadUrl(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadUrl(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on("finish", () => {
        fileStream.close();
        resolve();
      });
      fileStream.on("error", reject);
    }).on("error", reject);
  });
}

async function main() {
  const dir1 = path.join(process.cwd(), "public", "images");
  const dir2 = path.join(process.cwd(), "public", "images", "real");
  fs.mkdirSync(dir1, { recursive: true });
  fs.mkdirSync(dir2, { recursive: true });

  console.log("Downloading real authentic travel photography from Unsplash...");
  const entries = Object.entries(PHOTO_URLS);
  let successCount = 0;

  for (const [key, url] of entries) {
    try {
      const p1Jpg = path.join(dir1, `${key}.jpg`);
      const p2Jpg = path.join(dir2, `${key}.jpg`);
      const p1Webp = path.join(dir1, `${key}.webp`);
      const p2Webp = path.join(dir2, `${key}.webp`);

      await downloadUrl(url, p1Jpg);
      fs.copyFileSync(p1Jpg, p2Jpg);
      fs.copyFileSync(p1Jpg, p1Webp);
      fs.copyFileSync(p1Jpg, p2Webp);

      console.log(`✓ Downloaded real photo: ${key}`);
      successCount++;
    } catch (err) {
      console.error(`✗ Error downloading ${key}:`, err.message);
    }
  }

  console.log(`\nSuccessfully downloaded ${successCount}/${entries.length} real photographs!`);
}

main();

