# Collections URL Cheat Sheet

## Basic URLs

### Collections Landing Page
```
http://localhost:5173/collections-showcase
```
- Browse all product categories
- View featured collections
- See product counts per category

### Collections Browser (Main Shopping)
```
http://localhost:5173/collections
```
- Shows all 27 products
- Access all filters and sorting

---

## Filter Parameters

### Category Filter (`cat`)

**Single Category**
```
/collections?cat=women
/collections?cat=men
/collections?cat=accessories
```

**Multiple Categories**
```
/collections?cat=women,accessories
/collections?cat=men,women
```

**All Categories**
```
/collections?cat=all
/collections  # (default)
```

---

### Price Range Filter (`price`)

```
/collections?price=0-5000              # Under ₹5,000
/collections?price=5000-15000          # ₹5,000 - ₹15,000
/collections?price=15000-30000         # ₹15,000 - ₹30,000
/collections?price=30000-50000         # ₹30,000 - ₹50,000
/collections?price=50000-1000000       # Above ₹50,000
```

---

### Color Filter (`colors`)

Color HEX codes (URL encoded):

```
/collections?colors=%23ffffff          # White
/collections?colors=%23000000          # Black
/collections?colors=%23ffd700          # Gold
/collections?colors=%238b6f47          # Brown
/collections?colors=%234169e1          # Royal Blue
```

**Multiple Colors**
```
/collections?colors=%23000000,%23ffffff,%23ffd700
```

---

### Sort Parameter (`sort`)

```
/collections?sort=newest              # Newest (default)
/collections?sort=price-low           # Price: Low to High
/collections?sort=price-high          # Price: High to Low
/collections?sort=rating              # Top Rated
```

---

### Search Parameter (`search`)

```
/collections?search=clutch
/collections?search=shoes
/collections?search=leather
```

---

## Combined Examples

### Women's Bags Under ₹15K
```
http://localhost:5173/collections?cat=women&price=0-15000&sort=price-low
```

### Black Accessories Sorted by Price (High to Low)
```
http://localhost:5173/collections?cat=accessories&colors=%23000000&sort=price-high
```

### Men's Items On Sale (Cheapest First)
```
http://localhost:5173/collections?cat=men&sort=price-low
```

### Top Rated Products Over ₹30K
```
http://localhost:5173/collections?price=30000-1000000&sort=rating
```

### Women's Dresses and Bags Under ₹30K
```
http://localhost:5173/collections?cat=women&price=0-30000
```

### Search for "leather" items Among Women's Products
```
http://localhost:5173/collections?cat=women&search=leather
```

### Premium Products (₹50K+) Sorted Newest
```
http://localhost:5173/collections?price=50000-1000000&sort=newest
```

### White and Gold Accessories
```
http://localhost:5173/collections?cat=accessories&colors=%23ffffff,%23ffd700
```

---

## Real Product Examples by Category

### Women's Handbags (cat=women)
1. White Leather Clutch - ₹8,999
2. Classic Black Tote - ₹12,499
3. Brown Leather Shoulder Bag - ₹15,999
4. Luxury Brown Leather Crossbody - ₹18,499
5. Pink Leather Evening Bag - ₹11,999

### Women's Dresses (cat=women)
1. Elegant Evening Gown - ₹35,999
2. Royal Blue Party Dress - ₹28,999
3. Emerald Green Cocktail Dress - ₹24,999
4. Gold Embroidered Saree - ₹32,999
5. Maroon Wedding Lehenga - ₹45,999

### Men's Shoes (cat=men)
1. Classic Black Formal Shoes - ₹9,999
2. Brown Leather Loafers - ₹8,999
3. Tan Suede Oxford - ₹11,999
4. White Leather Sneakers - ₹7,999
5. Premium Dress Shoes - ₹13,999

### Accessories (cat=accessories)
**Watches**
- Black Luxury Sports Watch - ₹24,999
- Gold Classic Watch - ₹32,999
- Silver Chronograph - ₹28,999

**Fragrances**
- Royal Black Eau de Parfum - ₹5,999
- Men Sherwani Fragrance - ₹4,999
- Women Luxury Perfume - ₹6,999

**Sunglasses**
- Gold Frame Sunglasses - ₹6,999

**Wallets**
- Black Leather Wallet - ₹3,999
- Zippy Premium Wallet - ₹4,999

**Belts**
- Royal Black Leather Belt - ₹3,499
- Leather Belt with Silver Buckle - ₹2,999

---

## Color Reference

Available colors in products:

| Color | HEX | Category |
|-------|-----|----------|
| White | `%23ffffff` | Handbags, Shoes |
| Black | `%23000000` | Bags, Shoes, Watches |
| Gold | `%23ffd700` | Watches, Wallets, Belts |
| Brown | `%238b6f47` | Handbags, Shoes |
| Pink | `%23ffc0cb` | Perfumes |
| Navy | `%231a237e` | Clothing |
| Royal Blue | `%234169e1` | Dresses |
| Green | `%2350c878` | Dresses |
| Silver | `%23c0c0c0` | Watches |

---

## View Mode URLs

### Grid View (Default, 3 Columns)
- All collection URLs default to grid view
- Best for browsing
- Shows multiple products at once

### List View
- Same URLs apply
- Toggle view mode using buttons on the page
- Better for detailed product comparison

---

## Query Parameter Encoding

**Note**: Special characters need URL encoding:

| Character | Encoded |
|-----------|---------|
| # (hex code prefix) | %23 |
| , (comma) | %2C or just , |
| - (dash) | - (no encoding needed) |
| space | %20 |

**Example**:
```
Black (#000000) → %23000000
Gold (#ffd700) → %23ffd700
```

---

## Bookmark These

### Quick Access Links

**Browse Everything**
```
http://localhost:5173/collections
```

**Women's Collection**
```
http://localhost:5173/collections?cat=women
```

**Budget Friendly (Under ₹10K)**
```
http://localhost:5173/collections?price=0-5000&sort=price-low
```

**Premium Items (₹30K+)**
```
http://localhost:5173/collections?price=30000-1000000&sort=price-high
```

**Accessories Only**
```
http://localhost:5173/collections?cat=accessories
```

**Top Rated Products**
```
http://localhost:5173/collections?sort=rating
```

---

## Tips & Tricks

1. **Clear Filters**: Click "Clear All Filters" button in sidebar
2. **Switch Views**: Use Grid/List toggle in top right
3. **Change Sorting**: Use the "Sort by" dropdown
4. **Mobile Filters**: Tap Filter icon to open/close sidebar
5. **Wishlist**: Heart icon to save favorites
6. **Quick Add**: Add to Bag button visible on hover (grid) or always (list)

---

Generated: February 17, 2026  
For Collections System v1.0
