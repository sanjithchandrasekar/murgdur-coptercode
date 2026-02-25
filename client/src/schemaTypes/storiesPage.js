export default {
    name: 'storiesPage',
    title: 'Stories Page',
    type: 'document',
    groups: [
        { name: 'main', title: 'Main Content' },
        { name: 'featured', title: 'Featured Story' },
        { name: 'stories', title: 'Stories Grid' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        { name: 'heading', title: 'Page Heading', type: 'string', group: 'main', initialValue: 'Murgdur Stories' },
        { name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'main', initialValue: 'Our Narratives' },
        { name: 'intro', title: 'Intro Text', type: 'text', rows: 2, group: 'main' },

        // FEATURED STORY
        {
            name: 'featuredStory',
            title: 'Featured Story (Hero)',
            type: 'object',
            group: 'featured',
            fields: [
                { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
                { name: 'category', title: 'Category', type: 'string' },
                { name: 'title', title: 'Title', type: 'string' },
                { name: 'description', title: 'Description', type: 'text', rows: 3 },
                { name: 'readMoreLink', title: 'Read More Link', type: 'url' },
            ]
        },

        // STORIES GRID
        {
            name: 'stories',
            title: 'Stories Grid',
            type: 'array',
            group: 'stories',
            of: [{ type: 'storyItem' }]
        },

        // SEO
        { name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo' },
        { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2, group: 'seo' },
    ],
    preview: { prepare() { return { title: 'Stories Page' } } }
}
