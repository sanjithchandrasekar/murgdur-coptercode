export default {
    name: 'newsletter',
    title: 'Newsletter Section',
    type: 'document',
    fields: [
        { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Join The Royal Circle' },
        { name: 'subHeading', type: 'text', title: 'Sub Heading' },
        {
            name: 'features',
            title: 'Features List',
            type: 'array',
            of: [{ type: 'string' }]
        }
    ]
}
