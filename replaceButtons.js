#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'client/src/pages/Home.jsx');

try {
  let content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  // New button styling
  const newButtons = [
    '                        <button className="px-8 py-3 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all">',
    '                            For Her',
    '                        </button>',
    '                        <button className="px-8 py-3 border-2 border-black rounded-full hover:bg-black hover:text-white transition-all">',
    '                            For Him',
    '                        </button>',
  ];

  // Replace lines 337-352 (index 336-351)
  lines.splice(336, 16, ...newButtons);

  fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
  console.log('✓ Done! Buttons replaced successfully.');
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
