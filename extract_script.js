const fs = require('fs');

const p1 = fs.readFileSync('E:/Projects/murugdur1/client/src/data/products.js', 'utf8');
const p2 = fs.readFileSync('E:/Projects/murugdur1/client/src/data/productsCollection.js', 'utf8');

const regex = /\{\s*id:\s*\d+,[\s\S]*?\}/g;
let matches = p1.match(regex);
const extracted = [];

if (matches) {
    matches.forEach(m => {
        if (m.includes('/images/new/')) {
            const nameMatch = m.match(/name:\s*"([^"]+)"/);
            if (nameMatch) {
                if (!p2.includes(nameMatch[1])) {
                    extracted.push(m);
                }
            }
        }
    });
}

console.log('Found missing items to add:', extracted.length);
fs.writeFileSync('E:/Projects/murugdur1/extracted_new_products.json', JSON.stringify({ items: extracted }, null, 2));
