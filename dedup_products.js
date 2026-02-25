const fs = require('fs');

const dedupFile = (filePath, isCollection) => {
    let content = fs.readFileSync(filePath, 'utf8');

    // We need to match objects that look like:
    // {
    //   id: 123,
    //   name: "...",
    //   ...
    // }

    // Using a balanced bracket matcher or a careful regex.
    // Assuming each product object starts with `{ id: ` or `{\n    id: `
    const regex = /\{\s*id:\s*\d+,[\s\S]*?\}(?=[,\n]*\s*\{|\s*\])/g;

    let match;
    let seenImages = new Set();
    let seenNames = new Set();

    let rangesToRemove = [];

    let tempMatches = [];
    while ((match = regex.exec(content)) !== null) {
        tempMatches.push({
            start: match.index,
            end: match.index + match[0].length,
            str: match[0]
        });
    }

    tempMatches.forEach(m => {
        const idMatch = m.str.match(/id:\s*(\d+)/);
        const nameMatch = m.str.match(/name:\s*"([^"]+)"/);
        const imgMatch = m.str.match(/image:\s*"([^"]+)"/);

        if (idMatch && nameMatch && imgMatch) {
            const name = nameMatch[1];
            const image = imgMatch[1];

            if (seenImages.has(image) || seenNames.has(name)) {
                rangesToRemove.push(m);
                console.log(`Removing Duplicate: ${name} (ID: ${idMatch[1]})`);
            } else {
                seenImages.add(image);
                seenNames.add(name);
            }
        }
    });

    // sort ranges in reverse order to remove from end to beginning
    rangesToRemove.sort((a, b) => b.start - a.start);

    rangesToRemove.forEach(r => {
        // we want to remove the object, and possibly the comma after it
        let endIdx = r.end;
        while (endIdx < content.length && (content[endIdx] === ',' || content[endIdx] === ' ' || content[endIdx] === '\n' || content[endIdx] === '\r')) {
            endIdx++;
        }
        content = content.slice(0, r.start) + content.slice(endIdx);
    });

    // Clean up any empty double commas or hanging commas before ]
    content = content.replace(/,\s*,/g, ',');
    content = content.replace(/,\s*\]/g, '\n]');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Finished deduping ${filePath}. Removed ${rangesToRemove.length} items.`);
};

dedupFile('E:/Projects/murugdur1/client/src/data/products.js', false);
dedupFile('E:/Projects/murugdur1/client/src/data/productsCollection.js', true);
