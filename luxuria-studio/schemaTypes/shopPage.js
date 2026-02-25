export default {
    name: 'shopPage',
    title: 'Shop Page',
    type: 'document',
    groups: [
        { name: 'hero', title: 'Hero / Banner' },
        { name: 'editorial', title: 'Editorial Banners' },
        { name: 'categories', title: 'Category Config' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        // HERO
        { name: 'heroHeading', title: 'Hero Heading', type: 'string', group: 'hero', initialValue: 'The House of Murgdur' },
        { name: 'heroSubheading', title: 'Hero Subheading', type: 'string', group: 'hero' },
        { name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'New Collection' },
        { name: 'heroBgImage', title: 'Hero Background Image', type: 'image', group: 'hero', options: { hotspot: true } },
        { name: 'heroCtaText', title: 'CTA Button Text', type: 'string', group: 'hero', initialValue: 'Explore Collection' },
        { name: 'heroCtaLink', title: 'CTA Link', type: 'string', group: 'hero', initialValue: '/shop' },

        // EDITORIAL BANNERS
        {
            name: 'editorialBanners',
            title: 'Editorial Banners (Mid-Page)',
            type: 'array',
            group: 'editorial',
            description: 'Large editorial banners inserted between product grids',
            of: [{
                type: 'object',
                name: 'editorialBanner',
                fields: [
                    { name: 'category', title: 'Target Category', type: 'string', description: 'e.g. "all", "shoes", "bags"' },
                    { name: 'eyebrow', title: 'Eyebrow Label', type: 'string' },
                    { name: 'heading', title: 'Heading', type: 'string' },
                    { name: 'subtext', title: 'Subtext', type: 'text', rows: 2 },
                    { name: 'ctaText', title: 'CTA Button Text', type: 'string' },
                    { name: 'ctaLink', title: 'CTA Link', type: 'string' },
                    { name: 'image', title: 'Banner Image', type: 'image', options: { hotspot: true } },
                    {
                        name: 'imageSide',
                        title: 'Image Position',
                        type: 'string',
                        options: { list: [{ title: 'Right', value: 'right' }, { title: 'Left', value: 'left' }] },
                        initialValue: 'right'
                    },
                    { name: 'bgColor', title: 'Background Color (hex)', type: 'string', initialValue: '#1a1a1a' },
                    { name: 'textColor', title: 'Text Color (hex)', type: 'string', initialValue: '#ffffff' },
                ],
                preview: {
                    select: { title: 'heading', subtitle: 'category', media: 'image' }
                }
            }]
        },

        // CATEGORY CONFIG
        {
            name: 'categoryConfig',
            title: 'Category Tabs Configuration',
            type: 'array',
            group: 'categories',
            description: 'Configure the category filter tabs in the shop',
            of: [{
                type: 'object',
                name: 'categoryTab',
                fields: [
                    { name: 'label', title: 'Tab Label', type: 'string' },
                    { name: 'value', title: 'Filter Value (slug)', type: 'string' },
                    { name: 'isActive', title: 'Show Tab?', type: 'boolean', initialValue: true },
                ],
                preview: { select: { title: 'label', subtitle: 'value' } }
            }]
        },

        // SEO
        { name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo' },
        { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2, group: 'seo' },
    ],
    preview: { prepare() { return { title: 'Shop Page' } } }
}
