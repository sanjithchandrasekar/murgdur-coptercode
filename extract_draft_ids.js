const fs = require('fs');
const filePath = process.argv[2];
const content = fs.readFileSync(filePath, 'utf8');
// Match XML-style _id content
const ids = [];
const xmlRegex = /<_id>(drafts\.[^<]+)<\/_id>/g;
let m;
while ((m = xmlRegex.exec(content)) !== null) {
  ids.push(m[1]);
}
// Also match JSON-style if needed
if (ids.length === 0) {
  const jsonLines = content.split('\n');
  for (const line of jsonLines) {
    const match = line.match(/"_id":\s*"(drafts\.[^"]+)"/);
    if (match) ids.push(match[1]);
  }
}
console.log(JSON.stringify(ids));
