export default {
    name: 'collection',
    title: 'Collection',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Collection Title',
            type: 'string',
            validation: (Rule) => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule) => Rule.required()
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3
        },
        {
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true }
        },
        {
            name: 'category',
            title: 'Main Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Men', value: 'Men' },
                    { title: 'Women', value: 'Women' },
                    { title: 'Accessories', value: 'Accessories' },
                    { title: 'All', value: 'All' },
                ]
            }
        },
        {
            name: 'products',
            title: 'Products in this Collection',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'product' }] }]
        },
        {
            name: 'isFeatured',
            title: 'Featured Collection?',
            type: 'boolean',
            initialValue: false
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
            description: 'Lower number = appears first',
            initialValue: 99
        },
        {
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string'
        },
        {
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            rows: 2
        },
    ],
    orderings: [
        {
            title: 'Display Order',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }]
        }
    ],
    preview: {
        select: { title: 'title', subtitle: 'category', media: 'coverImage' }
    }
}
