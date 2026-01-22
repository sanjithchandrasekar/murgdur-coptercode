# Murgdur E-commerce - Sanity Studio Setup

## Setup Instructions

### 1. Install Dependencies
```bash
cd studio
npm install
```

### 2. Create Sanity Account & Project
1. Go to https://www.sanity.io/ and sign up/login
2. Create a new project
3. Note your Project ID and Dataset name

### 3. Configure Sanity
Update `studio/sanity.config.js`:
```javascript
projectId: 'your-project-id', // Replace with your actual project ID
dataset: 'production',          // Or your dataset name
```

### 4. Configure Backend
Update `server/.env`:
```
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
SANITY_TOKEN=your-sanity-token
```

To get your Sanity token:
1. Go to https://www.sanity.io/manage
2. Select your project
3. Go to API > Tokens
4. Create a new token with Editor permissions

### 5. Run Sanity Studio
```bash
cd studio
npm run dev
```

Studio will be available at: http://localhost:3333

### 6. Deploy Sanity Studio (Optional)
```bash
cd studio
npm run deploy
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:slug` - Get product by slug
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/type/:type` - Get products by type
- `GET /api/products/featured/all` - Get featured products

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category by slug

## Schema Types

### Product
- name (string)
- slug (slug)
- price (number)
- originalPrice (number)
- images (array of images)
- category (Men/Women/Accessories)
- type (shoes/bags/belts/wallets/shirt/trouser/watches/perfume/sunglasses)
- description (text)
- sizes (array of strings)
- colors (array of strings)
- rating (number 0-5)
- reviews (number)
- inStock (boolean)
- featured (boolean)

### Category
- name (string)
- slug (slug)
- description (text)
- image (image)
