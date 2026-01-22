export default {
    name: 'visionPage',
    title: 'Vision Page',
    type: 'document',
    fields: [
        { name: 'eyebrow', type: 'string', title: 'Eyebrow' },
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'statement', type: 'text', title: 'Vision Statement' },
        {
            name: 'pillars',
            type: 'array',
            title: 'Pillars',
            of: [{
                type: 'object',
                fields: [
                    { name: 'icon', type: 'string', title: 'Icon (Emoji)' },
                    { name: 'title', type: 'string', title: 'Title' },
                    { name: 'description', type: 'text', title: 'Description' }
                ]
            }]
        },
        { name: 'bottomImage', type: 'image', title: 'Bottom Image' },
        { name: 'bottomCaption', type: 'string', title: 'Bottom Image Caption' }
    ]
}
