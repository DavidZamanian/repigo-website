import fs from "node:fs";
import path from "node:path";

const root = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  ".."
);
const targets = [
  path.join(root, "index.html"),
  path.join(root, "public", "index.html"),
];

const stamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14); // YYYYMMDDHHMMSS

function bust(html) {
  const patterns = [
    [
      /href="\/favicon-32x32\.png(?:\?v=[^"]*)?"/g,
      `href="/favicon-32x32.png?v=${stamp}"`,
    ],
    [
      /href="\/favicon-16x16\.png(?:\?v=[^"]*)?"/g,
      `href="/favicon-16x16.png?v=${stamp}"`,
    ],
    [
      /href="\/apple-touch-icon\.png(?:\?v=[^"]*)?"/g,
      `href="/apple-touch-icon.png?v=${stamp}"`,
    ],
  ];
  let out = html;
  for (const [re, repl] of patterns) out = out.replace(re, repl);
  return out;
}

for (const file of targets) {
  if (!fs.existsSync(file)) continue;
  const prev = fs.readFileSync(file, "utf8");
  const next = bust(prev);
  if (next !== prev) {
    fs.writeFileSync(file, next);
    console.log(
      `[cache-bust-icons] Updated ${path.relative(root, file)} with v=${stamp}`
    );
  } else {
    console.log(
      `[cache-bust-icons] No changes for ${path.relative(root, file)}`
    );
  }
}
