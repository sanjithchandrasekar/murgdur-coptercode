#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'client/src/pages/Home.jsx');

try {
  let content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  // Find the comment line (note: it's "Filter Buttons-For Her" with hyphen, no spaces)
  let startIdx = -1;
  let endIdx = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('{/* Filter Buttons-For Her')) {
      startIdx = i;
    }
    if (startIdx !== -1 && lines[i].includes('</div>') && lines[i + 1]?.includes('</div>') && lines[i + 2]?.includes('</section>')) {
      endIdx = i;
      break;
    }
  }

  if (startIdx !== -1 && endIdx !== -1) {
    // Replace with updated Link components
    const newButtons = [
      '          {/* Filter Buttons-For Her / For Him */}',
      '          <div className="flex justify-center items-center gap-4 mt-12">',
      '            <Link',
      '              to="/shop?cat=women"',
      '              className="px-8 py-3 bg-black text-white text-[11px] font-normal uppercase tracking-[0.22em] hover:bg-white hover:text-black border border-black transition-all duration-300"',
      '            >',
      '              For Her',
      '            </Link>',
      '            <Link',
      '              to="/shop?cat=men"',
      '              className="px-8 py-3 bg-black text-white text-[11px] font-normal uppercase tracking-[0.22em] hover:bg-white hover:text-black border border-black transition-all duration-300"',
      '            >',
      '              For Him',
      '            </Link>',
      '          </div>',
    ];

    const finalLines = [
      ...lines.slice(0, startIdx),
      ...newButtons,
      ...lines.slice(endIdx + 1),
    ];

    fs.writeFileSync(filePath, finalLines.join('\n'), 'utf-8');
    console.log('✓ Done! Home.jsx filter buttons updated.');
  } else {
    console.log('⚠ Could not find target section in Home.jsx');
  }
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}
