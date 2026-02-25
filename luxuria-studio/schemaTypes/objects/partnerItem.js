export default {
    name: 'partnerItem',
    title: 'Partner / Client',
    type: 'object',
    fields: [
        { name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required() },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: { hotspot: true }
        },
        { name: 'website', title: 'Website URL', type: 'url' },
    ],
    preview: {
        select: { title: 'name', media: 'logo' }
    }
}
