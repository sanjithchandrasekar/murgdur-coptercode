const fs = require('fs');
const path = require('path');

const baseDir = 'E:/Projects/murugdur1/client/public/images/new';
const p1Path = 'E:/Projects/murugdur1/client/src/data/products.js';
const p2Path = 'E:/Projects/murugdur1/client/src/data/productsCollection.js';

const p1 = fs.readFileSync(p1Path, 'utf8');
const dirs = fs.readdirSync(baseDir);

let highestId = 2000;
const newProducts = [];

dirs.forEach(d => {
    const fullPath = path.join(baseDir, d);
    if (fs.statSync(fullPath).isDirectory()) {
        const files = fs.readdirSync(fullPath);
        files.forEach(f => {
            if (f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg')) {
                let relPath = '/images/new/' + d + '/' + f;
                if (!p1.includes(relPath)) {
                    // It's a missing image. Let's create a product object for it.
                    // Parse name from filename, removing extensions and underscores/brackets.
                    let cleanedName = f.replace(/\.(png|jpg|jpeg)$/, '');

                    // Let's decide category and price
                    let category = "Accessories";
                    let type = "accessories";
                    let price = 5000;
                    let color = "#000000";

                    let dl = d.toLowerCase();
                    let fl = f.toLowerCase();

                    if (dl.includes("shirt") || dl.includes("tee")) {
                        category = "Men"; type = "shirts"; price = 3000;
                        if (fl.includes("white")) color = "#ffffff";
                        if (fl.includes("olive")) color = "#556b2f";
                    } else if (dl.includes("shoe") || dl.includes("heel") || dl.includes("flat") || dl.includes("sandal")) {
                        category = "Women"; type = "shoes"; price = 8000;
                        if (fl.includes("pink")) color = "#ffc0cb";
                        if (fl.includes("silver")) color = "#c0c0c0";
                        if (fl.includes("gold")) color = "#ffd700";
                        if (fl.includes("olive")) color = "#556b2f";
                    } else if (dl.includes("bag") || dl.includes("tote")) {
                        category = (dl.includes('women') || dl.includes('lady')) ? "Women" : "Accessories";
                        type = "bags"; price = 15000;
                    } else if (dl.includes("wallet") || dl.includes("cardholder")) {
                        category = "Accessories"; type = "wallets"; price = 3500;
                    } else if (dl.includes("sweater") || dl.includes("hoodie") || dl.includes("pullover")) {
                        category = "Men"; type = (dl.includes("hoodie") ? "hoodies" : "sweaters"); price = 7000;
                    } else if (dl.includes("sherwani") || dl.includes("achkan") || dl.includes('tee')) {
                        category = "Men"; type = "clothing"; price = 25000;
                    } else if (dl.includes("sunglass")) {
                        category = "Accessories"; type = "sunglasses"; price = 6000;
                    }

                    // Some like 5s2.png in Navy Sherwani are just extra images of an existing product
                    if (f.match(/^[0-9]+[a-z0-9]*\.(png|jpg)$/)) {
                        // These shouldn't be new products, they are just secondary images.
                        // Skip them to avoid spam
                        return;
                    }

                    // Format Name
                    let name = d + " " + cleanedName;
                    name = name.replace(/[_\(\)]/g, ' ').replace(/\s+/g, ' ').trim();
                    // capitalize
                    name = name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

                    highestId++;

                    let pObj = `
  {
    id: ${highestId},
    name: "${name}",
    price: ${price},
    originalPrice: ${price + 1500},
    image: "${relPath}",
    images: ["${relPath}"],
    category: "${category}",
    type: "${type}",
    description: "Premium ${name} designed for sophisticated luxury.",
    colors: ["${color}"],
    sizes: ["S", "M", "L", "XL", "Free Size"],
    rating: 4.8,
    reviews: 12
  }`;
                    newProducts.push({ type, pObj, name });
                }
            }
        });
    }
});

console.log('Filtered out extra images and left with ' + newProducts.length + ' products.');

// 1) Append to products.js
let appendStr = newProducts.map(n => n.pObj).join(',');
if (newProducts.length > 0) {
    let p1Data = fs.readFileSync(p1Path, 'utf8');
    let endIdx = p1Data.lastIndexOf('];');
    if (endIdx !== -1) {
        p1Data = p1Data.slice(0, endIdx) + ',' + appendStr + '\n' + p1Data.slice(endIdx);
        fs.writeFileSync(p1Path, p1Data);
    }
}

// 2) Append to productsCollection.js
let p2Data = fs.readFileSync(p2Path, 'utf8');

// group by "type"
let catGroups = {};
newProducts.forEach(n => {
    if (!catGroups[n.type]) catGroups[n.type] = [];

    // convert type back to subcategory in the string representation
    let fixedStr = n.pObj.replace(/type:/, 'subcategory:');
    catGroups[n.type].push(fixedStr);
});

let collectionInjections = Object.keys(catGroups).map(typeKey => {
    let prefix = "catExtra" + typeKey.charAt(0).toUpperCase() + typeKey.slice(1);
    let arrayStr = `\nconst ${prefix} = [${catGroups[typeKey].join(',')}];\n`;
    return { prefix, arrayStr };
});

let insertPos = p2Data.indexOf('// Combine all products');
if (insertPos !== -1) {
    let newVars = collectionInjections.map(c => c.arrayStr).join('\n');
    p2Data = p2Data.slice(0, insertPos) + newVars + '\n' + p2Data.slice(insertPos);
}

// export array
let combineMatch = p2Data.indexOf('export const products = [');
if (combineMatch !== -1) {
    let endOfProducts = p2Data.indexOf('];', combineMatch);
    let insertions = collectionInjections.map(c => '  ...' + c.prefix + ',').join('\n');
    p2Data = p2Data.slice(0, endOfProducts) + insertions + '\n' + p2Data.slice(endOfProducts);
}

// collections
let collMapMatch = p2Data.indexOf('export const productCollections = {');
if (collMapMatch !== -1) {
    let endOfMap = p2Data.indexOf('};', collMapMatch);
    let insertions = collectionInjections.map(c => '  ' + c.prefix + ',').join('\n');
    p2Data = p2Data.slice(0, endOfMap) + insertions + '\n' + p2Data.slice(endOfMap);
}

fs.writeFileSync(p2Path, p2Data);

console.log('Appended into both files successfully!');
