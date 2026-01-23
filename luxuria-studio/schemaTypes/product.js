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
                    { title: 'S', value: 'S' },
                    { title: 'M', value: 'M' },
                    { title: 'L', value: 'L' },
                    { title: 'XL', value: 'XL' },
                    { title: 'XXL', value: 'XXL' },
                    { title: 'XXXL', value: 'XXXL' },
                    { title: 'Free Size', value: 'Free Size' },
                    // Shoe sizes
                    { title: '5', value: '5' },
                    { title: '6', value: '6' },
                    { title: '7', value: '7' },
                    { title: '8', value: '8' },
                    { title: '9', value: '9' },
                    { title: '10', value: '10' },
                    { title: '11', value: '11' },
                    { title: '12', value: '12' },
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
            of: [{ type: 'reference', to: { type: 'product' } }],
            description: 'Manually select related products to show on the product page.'
        }
    ],
};
