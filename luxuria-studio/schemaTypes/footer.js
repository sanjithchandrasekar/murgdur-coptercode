export default {
    name: 'footer',
    title: 'Footer',
    type: 'document',
    fields: [
        {
            name: 'aboutLinks',
            title: 'About Links',
            type: 'array',
            of: [{ type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'url', type: 'string' }] }]
        },
        {
            name: 'helpLinks',
            title: 'Help Links',
            type: 'array',
            of: [{ type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'url', type: 'string' }] }]
        },
        {
            name: 'policyLinks',
            title: 'Policy Links',
            type: 'array',
            of: [{ type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'url', type: 'string' }] }]
        },
        {
            name: 'mailAddress',
            title: 'Mail Us Address',
            type: 'text'
        },
        {
            name: 'officeAddress',
            title: 'Registered Office Address',
            type: 'text'
        },
        {
            name: 'socialLinks',
            title: 'Social Links',
            type: 'object',
            fields: [
                { name: 'facebook', type: 'url' },
                { name: 'twitter', type: 'url' },
                { name: 'youtube', type: 'url' },
                { name: 'instagram', type: 'url' }
            ]
        }
    ]
}
