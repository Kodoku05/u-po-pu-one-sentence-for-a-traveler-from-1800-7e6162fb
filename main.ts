import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// The entry: one sentence explaining the modern internet to a traveler
// from 1800, built only from things a person from 1800 already knows:
// a coffeehouse, a traveller, a printer, a merchant, a chair.
// 199 Unicode code points, inside the 1-200 gate.
const TEXT =
  "A coffeehouse that never shuts, where every traveller, printer, and merchant in the world sits at one table, trading news, letters, and goods without leaving his chair, and any man may join the talk.";

// Fail closed: never write a text the gate would refuse (1-200 code
// points, exactly one sentence, not only whitespace). The count is in
// Unicode code points, not bytes and not UTF-16 units.
const points = [...TEXT].length;
if (points < 1 || points > 200 || /^\s*$/.test(TEXT)) {
  throw new Error(`entry text is ${points} code points, outside the 1-200 gate`);
}
if ((TEXT.match(/\./g) || []).length !== 1 || !TEXT.endsWith(".")) {
  throw new Error("entry text must be exactly one sentence");
}

const out = resolve(process.env.MAKEFUN_OUTPUT_DIR || "/output");
mkdirSync(out, { recursive: true });
writeFileSync(resolve(out, "entry.txt"), TEXT, "utf8");
