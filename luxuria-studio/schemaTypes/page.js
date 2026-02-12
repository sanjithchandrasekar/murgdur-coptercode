export default {
    name: 'page',
    title: 'Page (Generic)',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Page Title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            name: 'slug',
            title: 'Slug (URL Path)',
            type: 'slug',
            description: 'The URL path for this page (e.g. /about-us)',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: Rule => Rule.required()
        },
        {
            name: 'pageBuilder',
            title: 'Page Builder',
            type: 'array',
            of: [
                { type: 'section.hero' },
                { type: 'section.textWithImage' },
                { type: 'section.productGrid' },
                { type: 'section.video' }
            ],
            description: 'Add sections to build your page.'
        },
        {
            name: 'seo',
            title: 'SEO Settings',
            type: 'object',
            fields: [
                { name: 'metaTitle', type: 'string', title: 'Meta Title' },
                { name: 'metaDescription', type: 'text', title: 'Meta Description' }
            ]
        }
    ]
}
