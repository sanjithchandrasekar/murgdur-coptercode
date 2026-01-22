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
    ],
};
