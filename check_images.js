const fs = require('fs');
const path = require('path');

const srcDir = 'client/src';
const pubDir = 'client/public';

function walk(dir) {
  let files = [];
  fs.readdirSync(dir).forEach(f => {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) files = files.concat(walk(fp));
    else if (/\.(jsx|js)$/.test(f)) files.push(fp);
  });
  return files;
}

const allFiles = walk(srcDir);
const refs = new Set();
allFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const re = /['"]\/images\/[^'"]+\.(png|jpg|jpeg)['"]/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    refs.add(m[0].replace(/['"]/g, ''));
  }
});

const missing = [];
refs.forEach(ref => {
  const fp = path.join(pubDir, ref.replace('/images/', 'images/'));
  if (!fs.existsSync(fp)) missing.push(ref);
});

console.log('Missing (' + missing.length + '):');
missing.sort().forEach(m => console.log(' ', m));
console.log('\nAll refs (' + refs.size + '):');
[...refs].sort().forEach(r => {
  const fp = path.join(pubDir, r.replace('/images/', 'images/'));
  const exists = fs.existsSync(fp) ? 'OK' : 'MISSING';
  console.log(' [' + exists + ']', r);
});
