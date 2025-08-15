// Generates rounded-corner favicon assets from an app icon.
// Looks for an input icon at common locations and outputs PNGs into /public.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  ".."
);
const publicDir = path.join(root, "public");

/**
 * Try multiple likely icon locations; return the first that exists.
 */
function findInputIcon() {
  const candidates = [
    path.join(root, "src", "assets", "icon.png"),
    path.join(root, "assets", "icon.png"),
    path.join(root, "src", "assets", "app-icon.png"),
    path.join(root, "public", "icon.png"),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

/**
 * Create a rounded-rectangle mask as an SVG buffer.
 * Apple-style rounding is approximated at ~20% radius of the size.
 */
function roundedMaskSvg(size, radiusRatio = 0.2) {
  const r = Math.round(size * radiusRatio);
  const svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${size}" height="${size}" rx="${r}" ry="${r}" fill="white"/>
  </svg>`;
  return Buffer.from(svg);
}

async function makeIcon(input, size) {
  const mask = roundedMaskSvg(size);
  const img = sharp(input).resize({ width: size, height: size, fit: "cover" });
  // Apply mask by using it as the alpha channel
  const base = await img
    .composite([{ input: mask, blend: "dest-in" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
  return base;
}

async function main() {
  const input = findInputIcon();
  if (!input) {
    console.warn(
      "[generate-favicons] No source icon found. Place an icon at src/assets/icon.png or assets/icon.png."
    );
    process.exit(0);
  }
  console.log(
    `[generate-favicons] Using source icon: ${path.relative(root, input)}`
  );

  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  const targets = [
    { name: "favicon-32x32.png", size: 32 },
    { name: "favicon-16x16.png", size: 16 },
    { name: "apple-touch-icon.png", size: 180 },
  ];

  await Promise.all(
    targets.map(async ({ name, size }) => {
      const out = path.join(publicDir, name);
      const buf = await makeIcon(input, size);
      await fs.promises.writeFile(out, buf);
      console.log(`Generated ${path.relative(root, out)} (${size}x${size})`);
    })
  );
}

main().catch((err) => {
  console.error("[generate-favicons] Error:", err);
  process.exit(1);
});
