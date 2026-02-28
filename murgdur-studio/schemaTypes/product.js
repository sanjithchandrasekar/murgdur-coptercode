export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: (Rule) => Rule.required().min(0),
        },
        {
            name: 'originalPrice',
            title: 'Original Price',
            type: 'number',
            description: 'The price before discount (strikethrough price)',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 4,
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Men', value: 'Men' },
                    { title: 'Women', value: 'Women' },
                    { title: 'Accessories', value: 'Accessories' },
                ],
            },
            validation: (Rule) => Rule.required(),
        },
        {
            name: 'type',
            title: 'Product Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Shoes', value: 'shoes' },
                    { title: 'Bags', value: 'bags' },
                    { title: 'Perfumes', value: 'perfumes' },
                    { title: 'Watches', value: 'watches' },
                    { title: 'Clothing', value: 'clothing' },
                    { title: 'Belts', value: 'belts' },
                    { title: 'Jewellery', value: 'jewellery' },
                    { title: 'Wallets', value: 'wallets' },
                    { title: 'Sandals', value: 'sandals' },
                    { title: 'Accessories', value: 'accessories' },
                    { title: 'Dresses', value: 'dresses' },
                    { title: 'Shirts', value: 'shirts' },
                    { title: 'Slippers', value: 'slippers' },
                    { title: 'Sunglasses', value: 'sunglasses' },
                    { title: 'Hoodies', value: 'hoodies' },
                    { title: 'Sweaters', value: 'sweaters' },
                    { title: 'Travel', value: 'travel' },
                ],
            },
        },
        {
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'images',
            title: 'Gallery Images',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            description: 'Additional images for the product',
        },
        {
            name: 'sizes',
            title: 'Sizes',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    // Apparel sizes
                    { title: 'XS', value: 'XS' },
                    { title: 'S', value: 'S' },
                    { title: 'M', value: 'M' },
                    { title: 'L', value: 'L' },
                    { title: 'XL', value: 'XL' },
                    { title: 'XXL', value: 'XXL' },
                    { title: 'XXXL', value: 'XXXL' },
                    { title: 'Free Size', value: 'Free Size' },
                    { title: 'One Size', value: 'One Size' },
                    // Shoe sizes
                    { title: '5', value: '5' },
                    { title: '6', value: '6' },
                    { title: '7', value: '7' },
                    { title: '8', value: '8' },
                    { title: '9', value: '9' },
                    { title: '10', value: '10' },
                    { title: '11', value: '11' },
                    { title: '12', value: '12' },
                    // Watch sizes (case diameter)
                    { title: '38mm', value: '38mm' },
                    { title: '40mm', value: '40mm' },
                    { title: '41mm', value: '41mm' },
                    { title: '42mm', value: '42mm' },
                    { title: '44mm', value: '44mm' },
                    { title: '46mm', value: '46mm' },
                    // Perfume / liquid sizes
                    { title: '50ml', value: '50ml' },
                    { title: '100ml', value: '100ml' },
                    // Belt / waist sizes (cm)
                    { title: '85cm', value: '85cm' },
                    { title: '90cm', value: '90cm' },
                    { title: '95cm', value: '95cm' },
                    { title: '100cm', value: '100cm' },
                    // Travel bag size
                    { title: 'Cabin Size', value: 'Cabin Size' },
                ],
            },
        },
        {
            name: 'colors',
            title: 'Colors',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', type: 'string', title: 'Color Name' },
                        { name: 'hex', type: 'string', title: 'Hex Code (e.g. #000000)' },
                    ],
                },
            ],
        },
        {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Optional tags for filtering (e.g. bestseller, new-arrival, featured)'
        },
        {
            name: 'featured',
            title: 'Featured Product?',
            type: 'boolean',
            initialValue: false,
            description: 'Show this product in homepage & featured sections'
        },
        {
            name: 'rating',
            title: 'Rating',
            type: 'number',
            initialValue: 5,
            validation: (Rule) => Rule.min(0).max(5),
        },
        {
            name: 'reviews',
            title: 'Review Count',
            type: 'number',
            initialValue: 0,
        },
        {
            name: 'stock',
            title: 'Stock Quantity',
            type: 'number',
            initialValue: 10
        },
        {
            name: 'productId',
            title: 'Product ID',
            type: 'string',
            description: 'Unique product identifier e.g. MURG-0001',
            validation: (Rule) => Rule.regex(/^MURG-\d{4}$/, {
                name: 'productId',
                invert: false,
            }).warning('Format should be MURG-XXXX (e.g. MURG-0042)'),
        },
        {
            name: 'sku',
            title: 'SKU',
            type: 'string'
        },
        {
            name: 'isNew',
            title: 'New Arrival?',
            type: 'boolean',
            initialValue: false
        },
        {
            name: 'onSale',
            title: 'On Sale?',
            type: 'boolean',
            initialValue: false
        },
        {
            name: 'fabric',
            title: 'Fabric / Material',
            type: 'string'
        },
        {
            name: 'care',
            title: 'Care Instructions',
            type: 'text'
        },
        {
            name: 'details',
            title: 'Additional Details',
            type: 'array',
            of: [{ type: 'block' }]
        },
        {
            name: 'relatedProducts',
            title: 'Related Products / You May Also Like',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'product' }] }],
            description: 'Manually select related products to show on the product page.'
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'category',
            media: 'mainImage',
        },
        prepare({ title, subtitle, media }) {
            return {
                title: title || 'Untitled Product',
                subtitle: subtitle ? `Category: ${subtitle}` : '',
                media,
            }
        }
    },
    orderings: [
        {
            title: 'Name A–Z',
            name: 'nameAsc',
            by: [{ field: 'name', direction: 'asc' }]
        },
        {
            title: 'Price: Low to High',
            name: 'priceLow',
            by: [{ field: 'price', direction: 'asc' }]
        },
        {
            title: 'Price: High to Low',
            name: 'priceHigh',
            by: [{ field: 'price', direction: 'desc' }]
        },
        {
            title: 'Rating',
            name: 'ratingDesc',
            by: [{ field: 'rating', direction: 'desc' }]
        },
    ],
};
