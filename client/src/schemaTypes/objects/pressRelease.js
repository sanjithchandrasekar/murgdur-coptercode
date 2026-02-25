export default {
    name: 'pressRelease',
    title: 'Press Release',
    type: 'object',
    fields: [
        { name: 'date', title: 'Date', type: 'string', description: 'e.g. "October 15, 2025"' },
        { name: 'title', title: 'Headline', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'summary', title: 'Summary', type: 'text', rows: 3 },
        { name: 'pdfUrl', title: 'PDF URL (optional)', type: 'url' },
        {
            name: 'image',
            title: 'Thumbnail Image',
            type: 'image',
            options: { hotspot: true }
        }
    ],
    preview: {
        select: { title: 'title', subtitle: 'date' }
    }
}
