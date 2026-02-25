export default {
    name: 'timelineEntry',
    title: 'Timeline Entry',
    type: 'object',
    fields: [
        { name: 'year', title: 'Year / Date', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'title', title: 'Milestone Title', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        {
            name: 'image',
            title: 'Image (optional)',
            type: 'image',
            options: { hotspot: true }
        }
    ],
    preview: {
        select: { title: 'title', subtitle: 'year' }
    }
}
