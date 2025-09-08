const fs = require("fs");

// ---------- Utilities ----------

// Convert string in given base to BigInt
function parseBigIntFromBase(str, base) {
  const digits = "0123456789abcdefghijklmnopqrstuvwxyz";
  const b = BigInt(base);
  str = str.toLowerCase();
  let acc = 0n;
  for (let ch of str) {
    if (ch === "_") continue;
    const val = BigInt(digits.indexOf(ch));
    if (val < 0n || val >= b) throw new Error(`Invalid digit '${ch}' for base ${base}`);
    acc = acc * b + val;
  }
  return acc;
}

// ---------- Main Algorithm ----------

// Step 1: Read JSON file
const rawData = fs.readFileSync("data1.json", "utf8");
const data = JSON.parse(rawData);

const k = Number(data.keys.k);
if (!Number.isInteger(k) || k <= 0) throw new Error("Invalid k");

// Step 2: Read first k roots
const roots = [];
let count = 0;
for (let key of Object.keys(data)) {
  if (key === "keys") continue;
  if (count >= k) break;

  const base = Number(data[key].base);
  const value = data[key].value.toString();
  const r = parseBigIntFromBase(value, base);
  roots.push(r);
  count++;
}

// Step 3: Compute constant term using (-1)^k * product(roots)
let constant = 1n;
for (let r of roots) constant *= r;

if (k % 2 !== 0) constant = -constant;

// Step 4: Print exact constant
console.log(constant.toString());
