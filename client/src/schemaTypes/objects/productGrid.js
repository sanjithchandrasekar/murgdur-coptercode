export default {
    name: 'section.productGrid',
    title: 'Product Grid / Featured Collection',
    type: 'object',
    fields: [
        { name: 'eyebrow', type: 'string', title: 'Eyebrow Text' },
        { name: 'heading', type: 'string', title: 'Collection Heading' },
        { name: 'products', type: 'array', title: 'Select Products', of: [{ type: 'reference', to: { type: 'product' } }] },
        {
            name: 'layout',
            title: 'Display Layout',
            type: 'string',
            options: {
                list: [
                    { title: 'Grid (Default)', value: 'grid' },
                    { title: 'Carousel', value: 'carousel' },
                    { title: 'Featured Item Highlight', value: 'highlight' }
                ]
            },
            initialValue: 'grid'
        }
    ]
}
