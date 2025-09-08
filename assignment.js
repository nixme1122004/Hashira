const fs = require("fs");

// Step 1: Read JSON file
const rawData = fs.readFileSync("data.json", "utf8");
const data = JSON.parse(rawData);

const n = data.keys.n;
const k = data.keys.k;

// Step 2: Extract at least k roots
let roots = [];
let count = 0;

for (let key of Object.keys(data)) {
  if (key === "keys") continue;
  if (count >= k) break;

  let base = parseInt(data[key].base);
  let value = data[key].value;
  let decimalValue = parseInt(value, base); // base conversion
  roots.push(decimalValue);
  count++;
}

// Step 3: Construct polynomial from roots
let coefficients = [1]; // start with polynomial = 1

for (let r of roots) {
  let newCoefficients = Array(coefficients.length + 1).fill(0);

  for (let i = 0; i < coefficients.length; i++) {
    newCoefficients[i] += -r * coefficients[i];
    newCoefficients[i + 1] += coefficients[i];
  }
  coefficients = newCoefficients;
}

// Step 4: Print results
console.log("Roots:", roots);
console.log("Polynomial coefficients (from highest degree to constant):");
console.log(coefficients);
