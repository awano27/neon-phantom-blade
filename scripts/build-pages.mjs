import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourceFile = join(rootDir, "index.html");
const outDir = join(rootDir, "pages-dist");

if (!existsSync(sourceFile)) {
  throw new Error(`Source file not found: ${sourceFile}`);
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

cpSync(sourceFile, join(outDir, "index.html"));
cpSync(sourceFile, join(outDir, "404.html"));
writeFileSync(join(outDir, ".nojekyll"), "");

console.log(`GitHub Pages artifact generated in ${outDir}`);
