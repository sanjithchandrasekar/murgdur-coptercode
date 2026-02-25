#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read file
const filePath = path.join(__dirname, 'client/src/pages/Home.jsx');

try {
  let content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  // Replace lines 337 and 340 to add bg-black and text-white
  lines[336] = '                        <button className="px-8 py-3 bg-black text-white border-2 border-black rounded-full hover:bg-white hover:text-black transition-all">';
  lines[339] = '                        <button className="px-8 py-3 bg-black text-white border-2 border-black rounded-full hover:bg-white hover:text-black transition-all">';

  // Write back
  fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
  console.log('✓ Done! Buttons are now black with white text.');
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
