#!/usr/bin/env node
// Prune expired lead magnets: delete content/lead-magnets/*.json past their expiresAt.
// The page already 404s itself at expiry (see app/lead-magnets/[slug]/page.tsx); this
// script is the cleanup half so dead files don't accumulate in the repo.
//
// Usage:  node scripts/prune-lead-magnets.mjs           # delete expired
//         node scripts/prune-lead-magnets.mjs --dry     # list what would be deleted
import fs from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "content", "lead-magnets");
const dry = process.argv.includes("--dry");
const today = new Date();

if (!fs.existsSync(DIR)) {
  console.log("no content/lead-magnets directory");
  process.exit(0);
}

let removed = 0;
for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith(".json"))) {
  const full = path.join(DIR, file);
  let m;
  try {
    m = JSON.parse(fs.readFileSync(full, "utf8"));
  } catch {
    console.log(`skip (unparseable): ${file}`);
    continue;
  }
  const exp = new Date(`${m.expiresAt}T23:59:59Z`);
  if (exp.getTime() < today.getTime()) {
    const days = Math.floor((today - exp) / 86400000);
    if (dry) {
      console.log(`expired ${days}d ago: ${file}`);
    } else {
      fs.unlinkSync(full);
      console.log(`removed: ${file} (expired ${days}d ago)`);
    }
    removed++;
  }
}
console.log(`${dry ? "would remove" : "removed"}: ${removed}`);