# Sanity CMS Integration Guide for Luxuria

This guide will help you integrate Sanity CMS into your existing project to manage your products dynamically.

## Phase 1: Setting up Sanity Studio

1.  **Install the Sanity CLI globally:**
    ```bash
    npm install -g sanity@latest
    ```

2.  **Initialize a new Sanity project:**
    Run this command in the root folder (`c:\Projects\murugdur1`):
    ```bash
    npm create sanity@latest
    ```
    *   **Project name**: `luxuria-studio` (or similar)
    *   **Project selection**: Create new project
    *   **Dataset configuration**: Use default (`production`)
    *   **Project path**: `./studio` (This will create a `studio` folder alongside `client`)
    *   **Template**: `Clean project` or `E-commerce` (Clean is better for custom schemas)
    *   **TypeScript**: No (unless you prefer it, but our schemas are JS)

## Phase 2: Adding the Schema

1.  **Copy the Schema:**
    Take the `product.js` file from `SANITY_SETUP_FILES/product.js` and move it to your new studio's schema folder:
    `c:\Projects\murugdur1\studio\schemas\product.js`

2.  **Register the Schema:**
    Open `c:\Projects\murugdur1\studio\schemas\index.js` (or `schema.js`) and import/add the product schema:
    ```javascript
    import product from './product'

    export const schemaTypes = [product]
    ```

3.  **Run the Studio:**
    ```bash
    cd studio
    npm run dev
    ```
    Open `http://localhost:3333` and you should see the "Product" document type. You can now add products manually.

## Phase 3: Connecting the Client (React)

1.  **Install Dependencies:**
    In your `client` folder (`c:\Projects\murugdur1\client`):
    ```bash
    npm install @sanity/client @sanity/image-url
    ```

2.  **Setup Client Config:**
    Copy `SANITY_SETUP_FILES/clientConfig.js` to `c:\Projects\murugdur1\client\src\utils\sanity.js`.
    *   **Important**: Update `projectId` in this file with your actual Project ID (found in `studio/sanity.config.js` or `sanity.cli.js`).

3.  **Fetch Data:**
    You can now replace the static import in `Shop.jsx` with the fetch function.

    *Example modification for `Shop.jsx`:*
    ```javascript
    import { useState, useEffect } from 'react';
    import { fetchProducts } from '../utils/sanity';

    const Shop = () => {
        const [products, setProducts] = useState([]);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const loadProducts = async () => {
                const data = await fetchProducts();
                // Map Sanity data to your app's structure if needed, 
                // but the query in clientConfig.js is already designed to match.
                setProducts(data);
                setLoading(false);
            };
            loadProducts();
        }, []);

        if (loading) return <div>Loading...</div>;

        // ... rest of your component
    ```

## Phase 4: Migrating Data (Optional)

If you have a lot of products in `products.js`, you might want to write a script to import them using the Sanity Client. 

1.  **Create a script** (e.g., `importData.js` in root) that reads your `products.js`, iterates over them, and calls `client.create()` for each.
    *   *Note*: You will need a Sanity token with "Write" permissions for this (Manager -> API -> Tokens).

### Data Import Script Concept
```javascript
import { createClient } from '@sanity/client'
import { products } from './client/src/data/products.js' 
// Note: You might need to adjust imports since products.js uses 'require' style image paths or ES modules which node might verify.
// A simpler way is to just copy the array into this script.

const client = createClient({
  projectId: 'YOUR_ID',
  dataset: 'production',
  token: 'YOUR_WRITE_TOKEN', // SECRET!
  useCdn: false,
})

const importData = async () => {
  for (const product of products) {
    // You'll need to upload images first to get asset IDs, which is complex.
    // For a start, you might just import text data and upload images manually in the studio.
    
    const doc = {
      _type: 'product',
      name: product.name,
      price: product.price,
      // ... map other fields
    }
    
    await client.create(doc)
    console.log(`Created ${product.name}`)
  }
}

importData()
```
