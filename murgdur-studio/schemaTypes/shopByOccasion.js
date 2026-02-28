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
                        { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
                        { name: 'link', type: 'string', title: 'Link URL (e.g. /shop?category=wedding)', description: 'Sets where clicking the card goes. Defaults to /shop.' }
                    ],
                    preview: { select: { title: 'name' } }
                }
            ]
        }
    ],
    preview: {
        prepare() { return { title: 'Shop By Occasion' } }
    }
}
