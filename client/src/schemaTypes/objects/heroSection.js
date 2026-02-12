export default {
    name: 'section.hero',
    title: 'Hero Section',
    type: 'object',
    fields: [
        {
            name: 'slides',
            title: 'Slides',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Slide',
                    fields: [
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'subtitle', type: 'string', title: 'Subtitle' },
                        { name: 'videoUrl', type: 'url', title: 'Video URL (Optional background video)' },
                        { name: 'image', type: 'image', title: 'Background Image' },
                        { name: 'link', type: 'string', title: 'Button Link (e.g. /shop)' },
                        { name: 'ctaText', type: 'string', title: 'Button Text', initialValue: 'Explore Collection' }
                    ]
                }
            ]
        }
    ]
}
