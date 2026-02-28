export default {
    name: 'visionPage',
    title: 'Vision Page',
    type: 'document',
    groups: [
        { name: 'hero', title: 'Hero' },
        { name: 'statement', title: 'Vision Statement' },
        { name: 'pillars', title: 'Pillars' },
        { name: 'future', title: 'Future Goals' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        // HERO
        { name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'The Future of Royalty' },
        { name: 'heading', title: 'Heading', type: 'string', group: 'hero', initialValue: 'Our Vision' },
        { name: 'heroBgImage', title: 'Hero Background Image', type: 'image', group: 'hero', options: { hotspot: true } },

        // VISION STATEMENT
        { name: 'statement', title: 'Vision Statement', type: 'text', rows: 3, group: 'statement' },
        { name: 'statementSubtext', title: 'Supporting Text', type: 'text', rows: 3, group: 'statement' },

        // PILLARS
        { name: 'pillarsHeading', title: 'Pillars Section Heading', type: 'string', group: 'pillars', initialValue: 'Our Three Pillars' },
        {
            name: 'pillars',
            title: 'Vision Pillars',
            type: 'array',
            group: 'pillars',
            of: [{
                type: 'object',
                name: 'pillar',
                fields: [
                    { name: 'icon', title: 'Icon (emoji)', type: 'string' },
                    { name: 'title', title: 'Title', type: 'string' },
                    { name: 'description', title: 'Description', type: 'text', rows: 3 },
                ],
                preview: { select: { title: 'title', subtitle: 'icon' } }
            }]
        },

        // FUTURE GOALS
        { name: 'futureHeading', title: 'Future Goals Heading', type: 'string', group: 'future' },
        { name: 'futureBody', title: 'Future Goals Body', type: 'text', rows: 4, group: 'future' },
        {
            name: 'futureRoadmap',
            title: 'Future Roadmap Milestones',
            type: 'array',
            group: 'future',
            description: 'Year-based milestones for the roadmap cards',
            of: [{
                type: 'object',
                name: 'roadmapItem',
                fields: [
                    { name: 'year', title: 'Year (e.g. 2025)', type: 'string' },
                    { name: 'milestone', title: 'Milestone Description', type: 'text', rows: 2 },
                ],
                preview: { select: { title: 'year', subtitle: 'milestone' } }
            }]
        },
        { name: 'bottomImage', title: 'Bottom Banner Image', type: 'image', group: 'future', options: { hotspot: true } },
        { name: 'bottomCaption', title: 'Bottom Image Caption', type: 'string', group: 'future' },

        // SEO
        { name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo' },
        { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2, group: 'seo' },
    ],
    preview: { prepare() { return { title: 'Vision Page' } } }
}
