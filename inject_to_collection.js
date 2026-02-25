const fs = require('fs');

const extractPath = 'E:/Projects/murugdur1/extracted_new_products.json';
const data = JSON.parse(fs.readFileSync(extractPath, 'utf8'));

// data.items is an array of string definitions of products
const newArraysMap = {}; // name -> array of string
const productsToAppend = [];

data.items.forEach(str => {
    // convert `type: "..."` to `subcategory: "..."`
    let fixedStr = str.replace(/type\s*:(\s*"[^"]+")/, 'subcategory:$1');

    // extract category & subcategory to figure out array name
    let catMatch = fixedStr.match(/category:\s*"([^"]+)"/);
    let subMatch = fixedStr.match(/subcategory:\s*"([^"]+)"/);

    if (catMatch && subMatch) {
        let cat = catMatch[1].toLowerCase();
        let sub = subMatch[1].toLowerCase();
        // generate array name e.g. "men" + "Hoodies" = "menHoodies"
        let arrayName = '';
        if (cat === 'men' || cat === 'women') {
            arrayName = cat + sub.charAt(0).toUpperCase() + sub.slice(1);
        } else {
            arrayName = sub.charAt(0).toLowerCase() + sub.slice(1);
        }

        if (!newArraysMap[arrayName]) newArraysMap[arrayName] = [];
        newArraysMap[arrayName].push(fixedStr);
    } else {
        // fallback
        if (!newArraysMap['miscProducts']) newArraysMap['miscProducts'] = [];
        newArraysMap['miscProducts'].push(fixedStr);
    }
});

let collectionFile = fs.readFileSync('E:/Projects/murugdur1/client/src/data/productsCollection.js', 'utf8');

let newCode = '\n// === NEWLY INJECTED COLLECTIONS ===\n';

for (let key in newArraysMap) {
    // Check if collectionFile already defines this const
    if (!collectionFile.includes(`const ${key} = [`)) {
        newCode += `const ${key} = [\n`;
        newCode += newArraysMap[key].join(',\n') + '\n];\n\n';
        productsToAppend.push(key);
    } else {
        // If it exists, theoretically we should append inside the array, 
        // but for simplicity we can just create `new_${key}`
        let newKey = key + 'New';
        newCode += `const ${newKey} = [\n`;
        newCode += newArraysMap[key].join(',\n') + '\n];\n\n';
        productsToAppend.push(newKey);
    }
}

// Now we need to append the spread arrays inside `export const products = [`
let combineMatch = collectionFile.indexOf('export const products = [');
if (combineMatch !== -1) {
    let endOfProducts = collectionFile.indexOf('];', combineMatch);
    if (endOfProducts !== -1) {
        let toInsert = productsToAppend.map(p => `  ...${p},`).join('\n') + '\n';
        collectionFile = collectionFile.slice(0, endOfProducts) + toInsert + collectionFile.slice(endOfProducts);
    }
}

// Append to export const productCollections = {
let prodColMatch = collectionFile.indexOf('export const productCollections = {');
if (prodColMatch !== -1) {
    let endOfProdCol = collectionFile.indexOf('};', prodColMatch);
    if (endOfProdCol !== -1) {
        let toInsert = productsToAppend.map(p => `  ${p},`).join('\n') + '\n';
        collectionFile = collectionFile.slice(0, endOfProdCol) + toInsert + collectionFile.slice(endOfProdCol);
    }
}

// Inject new arrays code BEFORE the export const products
let insertPos = collectionFile.indexOf('// Combine all products');
if (insertPos !== -1) {
    collectionFile = collectionFile.slice(0, insertPos) + newCode + collectionFile.slice(insertPos);
}

fs.writeFileSync('E:/Projects/murugdur1/client/src/data/productsCollection.js', collectionFile);
console.log('Injected arrays:', productsToAppend);
