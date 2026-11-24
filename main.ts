// One-Star Review of Something Essential — make.fun entry.
// Writes one deadpan one-star review of an everyday essential, at most
// 160 characters, to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The essential: gravity. The grievance: nothing is ever lowered gently,
// everything arrives at the floor at full speed. Deadpan throughout, and
// the sting lands in the last few words. No exclamation marks, no winking.
const REVIEW =
  "One star. Gravity has never once lowered anything gently; everything arrives at the floor at full speed, and it refuses to take returns.";

function main(): void {
  const text = REVIEW;
  if (text.length < 1 || text.length > 160) {
    throw new Error(`review must be 1-160 characters, got ${text.length}`);
  }
  if (text.trim() !== text || /\n/.test(text)) {
    throw new Error("review must be a single line with no surrounding whitespace");
  }
  if (/!/.test(text)) {
    throw new Error("deadpan means no exclamation marks");
  }
  // The form is part of the joke: it must read as a filed review, so it
  // opens with the rating and names the essential it complains about.
  if (!text.startsWith("One star. ")) {
    throw new Error("review must open with the one-star rating");
  }
  if (!/gravity/i.test(text)) {
    throw new Error("review must name the essential it reviews");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
}

main();
