export default {
    name: 'awardItem',
    title: 'Award / Recognition',
    type: 'object',
    fields: [
        { name: 'year', title: 'Year', type: 'string' },
        { name: 'title', title: 'Award Title', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'description', title: 'Description', type: 'text', rows: 2 },
        { name: 'issuedBy', title: 'Issued By', type: 'string' },
        {
            name: 'badge',
            title: 'Badge / Trophy Image',
            type: 'image',
            options: { hotspot: true }
        }
    ],
    preview: {
        select: { title: 'title', subtitle: 'year' }
    }
}
