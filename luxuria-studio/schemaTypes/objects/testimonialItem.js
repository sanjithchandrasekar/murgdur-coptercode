export default {
    name: 'testimonialItem',
    title: 'Testimonial',
    type: 'object',
    fields: [
        { name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (Rule) => Rule.required() },
        { name: 'author', title: 'Author Name', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'role', title: 'Role / Description', type: 'string', description: 'e.g. "Loyal Customer since 2021"' },
        { name: 'location', title: 'Location', type: 'string' },
        { name: 'rating', title: 'Rating (1-5)', type: 'number', options: { list: [1,2,3,4,5] }, initialValue: 5 },
        {
            name: 'avatar',
            title: 'Avatar Image',
            type: 'image',
            options: { hotspot: true }
        }
    ],
    preview: {
        select: { title: 'author', subtitle: 'quote', media: 'avatar' }
    }
}
