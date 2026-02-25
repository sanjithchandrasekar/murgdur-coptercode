export default {
    name: 'heritagePage',
    title: 'Heritage Page',
    type: 'document',
    groups: [
        { name: 'hero', title: 'Hero' },
        { name: 'story', title: 'Our Story' },
        { name: 'founder', title: 'Founder' },
        { name: 'timeline', title: 'Timeline' },
        { name: 'craftsmanship', title: 'Craftsmanship' },
        { name: 'gallery', title: 'Gallery' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        // HERO
        { name: 'heroHeading', title: 'Hero Heading', type: 'string', group: 'hero', initialValue: 'A Legacy of Excellence' },
        { name: 'heroSubheading', title: 'Hero Subheading', type: 'string', group: 'hero' },
        { name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'Since 2019' },
        { name: 'heroBgImage', title: 'Hero Background Image', type: 'image', group: 'hero', options: { hotspot: true } },

        // STORY SECTION
        { name: 'contentHeading', title: 'Story Section Heading', type: 'string', group: 'story' },
        { name: 'contentBody', title: 'Main Story Text', type: 'array', group: 'story', of: [{ type: 'block' }] },
        { name: 'contentImage', title: 'Story Section Image', type: 'image', group: 'story', options: { hotspot: true } },

        // FOUNDER
        { name: 'founderHeading', title: 'Founder Section Heading', type: 'string', group: 'founder' },
        { name: 'founderName', title: 'Founder Name', type: 'string', group: 'founder', initialValue: 'Sri Sundershan Duraisamy' },
        { name: 'founderTitle', title: 'Founder Title', type: 'string', group: 'founder' },
        { name: 'founderBio', title: 'Founder Biography', type: 'text', rows: 6, group: 'founder' },
        { name: 'founderImage', title: 'Founder Portrait', type: 'image', group: 'founder', options: { hotspot: true } },
        { name: 'founderQuote', title: 'Founder Quote', type: 'text', rows: 2, group: 'founder' },

        // TIMELINE
        { name: 'timelineHeading', title: 'Timeline Heading', type: 'string', group: 'timeline', initialValue: 'Our Milestones' },
        { name: 'timeline', title: 'Heritage Timeline', type: 'array', group: 'timeline', of: [{ type: 'timelineEntry' }] },

        // CRAFTSMANSHIP
        { name: 'craftHeading', title: 'Craftsmanship Section Heading', type: 'string', group: 'craftsmanship' },
        { name: 'craftSubtext', title: 'Craftsmanship Subtext', type: 'text', rows: 3, group: 'craftsmanship' },
        {
            name: 'craftFeatures',
            title: 'Craft Features',
            type: 'array',
            group: 'craftsmanship',
            of: [{
                type: 'object',
                name: 'craftFeature',
                fields: [
                    { name: 'icon', title: 'Icon (emoji)', type: 'string' },
                    { name: 'title', title: 'Feature Title', type: 'string' },
                    { name: 'description', title: 'Description', type: 'text', rows: 2 },
                ],
                preview: { select: { title: 'title', subtitle: 'icon' } }
            }]
        },

        // GALLERY
        { name: 'galleryHeading', title: 'Gallery Heading', type: 'string', group: 'gallery' },
        { name: 'galleryImages', title: 'Gallery Images', type: 'array', group: 'gallery', of: [{ type: 'image', options: { hotspot: true } }] },

        // SEO
        { name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo' },
        { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2, group: 'seo' },
    ],
    preview: { prepare() { return { title: 'Heritage Page' } } }
}
