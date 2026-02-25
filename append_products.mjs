import fs from 'fs';

// Read the generated products
const newProducts = JSON.parse(fs.readFileSync('./new_products_generated.json', 'utf-8'));

// Read existing products.js
let content = fs.readFileSync('./client/src/data/products.js', 'utf-8');

// Remove the closing bracket and semicolon
content = content.replace(/\];\s*$/, '');

// Create JavaScript code for new products
let productsCode = '';
newProducts.forEach((product, index) => {
  // Convert the product to JavaScript object format
  const jsProduct = {
    id: parseInt(product.id),
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image,
    category: product.category,
    type: product.type,
    description: product.description,
    images: product.images,
    sizes: product.sizes,
    colors: product.colors,
    rating: parseFloat(product.rating),
    reviews: product.reviews,
  };
  
  // Format with proper indentation (matching existing style)
  productsCode += '  {\n';
  productsCode += `    id: ${jsProduct.id},\n`;
  productsCode += `    name: "${jsProduct.name}",\n`;
  productsCode += `    price: ${jsProduct.price},\n`;
  productsCode += `    originalPrice: ${jsProduct.originalPrice},\n`;
  productsCode += `    image: "${jsProduct.image}",\n`;
  productsCode += `    category: "${jsProduct.category}",\n`;
  productsCode += `    type: "${jsProduct.type}",\n`;
  productsCode += `    description: "${jsProduct.description.replace(/"/g, '\\"')}",\n`;
  productsCode += `    images: [${jsProduct.images.map(img => `"${img}"`).join(', ')}],\n`;
  productsCode += `    sizes: [${jsProduct.sizes.map(s => `"${s}"`).join(', ')}],\n`;
  productsCode += `    colors: [${jsProduct.colors.map(c => `"${c}"`).join(', ')}],\n`;
  productsCode += `    rating: ${jsProduct.rating},\n`;
  productsCode += `    reviews: ${jsProduct.reviews},\n`;
  productsCode += '  }';
  
  // Add comma after each product except the last
  if (index < newProducts.length - 1) {
    productsCode += ',\n';
  }
});

// Append the new products and close the array
content += ',\n' + productsCode + '\n];\n';

// Write back to products.js
fs.writeFileSync('./client/src/data/products.js', content, 'utf-8');

console.log(`✓ Successfully added ${newProducts.length} new products to products.js`);
console.log(`\nNew product IDs: ${newProducts.map(p => p.id).join(', ')}`);
console.log('\nFile updated: client/src/data/products.js');
