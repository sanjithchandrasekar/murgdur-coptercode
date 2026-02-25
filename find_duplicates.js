const fs = require('fs');

const extractProducts = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    // very basic extracting of objects based on id field
    // find everything between { id: ... and the closing } for that object
    const regex = /\{\s*id:\s*\d+,[\s\S]*?\}(?=\s*,|\s*\])/g;
    let matches = content.match(regex);
    const products = [];
    if (matches) {
        matches.forEach((m) => {
            const idMatch = m.match(/id:\s*(\d+)/);
            const nameMatch = m.match(/name:\s*"([^"]+)"/);
            const imgMatch = m.match(/image:\s*"([^"]+)"/);
            if (idMatch && nameMatch && imgMatch) {
                products.push({ id: parseInt(idMatch[1]), name: nameMatch[1], image: imgMatch[1], str: m });
            }
        });
    }
    return products;
}

const prods = extractProducts('E:/Projects/murugdur1/client/src/data/products.js');

const nameCounts = {};
const imgCounts = {};

prods.forEach(p => {
    if (!nameCounts[p.name]) nameCounts[p.name] = [];
    nameCounts[p.name].push(p.id);

    if (!imgCounts[p.image]) imgCounts[p.image] = [];
    imgCounts[p.image].push(p.id);
});

const duplicateNames = Object.keys(nameCounts).filter(n => nameCounts[n].length > 1);
const duplicateImages = Object.keys(imgCounts).filter(i => imgCounts[i].length > 1);

console.log('Total products parsed in products.js:', prods.length);
console.log('Duplicate Names:', duplicateNames.length);
if (duplicateNames.length > 0) {
    duplicateNames.slice(0, 5).forEach(n => console.log(' Name:', n, 'IDs:', nameCounts[n]));
}

console.log('Duplicate Images:', duplicateImages.length);
if (duplicateImages.length > 0) {
    duplicateImages.slice(0, 5).forEach(i => console.log(' Image:', i, 'IDs:', imgCounts[i]));
}

// Now let's try productsCollection.js
const prodsCol = extractProducts('E:/Projects/murugdur1/client/src/data/productsCollection.js');

const ncCol = {};
const icCol = {};
prodsCol.forEach(p => {
    if (!ncCol[p.name]) ncCol[p.name] = [];
    ncCol[p.name].push(p.id);

    if (!icCol[p.image]) icCol[p.image] = [];
    icCol[p.image].push(p.id);
});

const dnCol = Object.keys(ncCol).filter(n => ncCol[n].length > 1);
const diCol = Object.keys(icCol).filter(i => icCol[i].length > 1);

console.log('Total products parsed in productsCollection.js:', prodsCol.length);
console.log('Duplicate Names in productsCollection.js:', dnCol.length);
if (dnCol.length > 0) {
    dnCol.slice(0, 5).forEach(n => console.log(' Name:', n, 'IDs:', ncCol[n]));
}

console.log('Duplicate Images in productsCollection.js:', diCol.length);
if (diCol.length > 0) {
    diCol.slice(0, 5).forEach(i => console.log(' Image:', i, 'IDs:', icCol[i]));
}
