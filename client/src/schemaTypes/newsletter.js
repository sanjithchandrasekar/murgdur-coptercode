export default {
    name: 'newsletter',
    title: 'Newsletter Section',
    type: 'document',
    fields: [
        { name: 'heading', title: 'Heading', type: 'string', initialValue: 'Join The Royal Circle' },
        { name: 'subHeading', title: 'Sub Heading', type: 'text' },
        { name: 'bgImage', title: 'Background Image', type: 'image', options: { hotspot: true } },
        { name: 'placeholder', title: 'Email Input Placeholder', type: 'string', initialValue: 'Enter your royal email' },
        { name: 'buttonText', title: 'Subscribe Button Text', type: 'string', initialValue: 'Subscribe' },
        {
            name: 'features',
            title: 'Feature Bullets',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'e.g. "Exclusive offers", "Early access to new collections"'
        },
        { name: 'privacyText', title: 'Privacy Note', type: 'string' },
    ],
    preview: { prepare() { return { title: 'Newsletter Section' } } }
}
