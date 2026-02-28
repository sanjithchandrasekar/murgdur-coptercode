export default {
    name: 'section.textWithImage',
    title: 'Text With Image Section',
    type: 'object',
    fields: [
        { name: 'eyebrow', type: 'string', title: 'Eyebrow Text (Small Top Label)' },
        { name: 'heading', type: 'string', title: 'Main Heading' },
        { name: 'hashtag', type: 'string', title: 'HashTag / Bold Text' },
        { name: 'body', type: 'text', title: 'Body Text' },
        { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
        { name: 'ctaText', type: 'string', title: 'Button Text' },
        { name: 'ctaLink', type: 'string', title: 'Button Link' },
        {
            name: 'layout',
            title: 'Layout Style',
            type: 'string',
            options: {
                list: [
                    { title: 'Image Left', value: 'imageLeft' },
                    { title: 'Image Right', value: 'imageRight' },
                    { title: 'Full Width (Stacked)', value: 'stacked' }
                ],
                layout: 'radio'
            },
            initialValue: 'imageRight'
        }
    ]
}
