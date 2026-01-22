export default {
    name: 'shopByOccasion',
    title: 'Shop By Occasion',
    type: 'document',
    fields: [
        { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Shop By Occasion' },
        { name: 'eyebrow', type: 'string', title: 'Eyebrow', initialValue: 'Curated For You' },
        {
            name: 'occasions',
            title: 'Occasions',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'name', type: 'string', title: 'Name' },
                        { name: 'image', type: 'image', title: 'Image' }
                    ]
                }
            ]
        }
    ]
}
