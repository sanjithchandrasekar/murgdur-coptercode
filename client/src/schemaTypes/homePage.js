export default {
    name: 'homePage',
    title: 'Home Page',
    type: 'document',
    fields: [
        {
            name: 'heroSlides',
            title: 'Hero Slider',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Slide',
                    fields: [
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'subtitle', type: 'string', title: 'Subtitle' },
                        { name: 'videoUrl', type: 'url', title: 'Video URL (Optional)' },
                        { name: 'image', type: 'image', title: 'Background Image' },
                        { name: 'link', type: 'string', title: 'Button Link (e.g. /shop)' }
                    ]
                }
            ]
        },
        {
            name: 'promoSection',
            title: 'Promotional Section (Stencil)',
            type: 'object',
            fields: [
                { name: 'eyebrow', type: 'string', title: 'Eyebrow Text (Small Top Label)' },
                { name: 'hashtag', type: 'string', title: 'Hashtag (Big Text)' },
                { name: 'heading', type: 'string', title: 'Heading' },
                { name: 'ctaText', type: 'string', title: 'Button Text' },
                { name: 'backgroundImage', type: 'image', title: 'Background Image' },
            ]
        },
        {
            name: 'welcomeSection',
            title: 'Welcome Note',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'body', type: 'text', title: 'Body Text' }
            ]
        },
        {
            name: 'videoCampaign',
            title: 'Video Campaign',
            type: 'object',
            fields: [
                { name: 'videoUrl', type: 'url', title: 'Video URL' },
                { name: 'heading', type: 'string', title: 'Heading' },
                { name: 'ctaText', type: 'string', title: 'Button Text' },
            ]
        },
        {
            name: 'treasures',
            title: 'Treasures of the Dynasty (Featured Products)',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'product' }]
                }
            ]
        }
    ]
}

