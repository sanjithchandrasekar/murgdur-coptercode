export default {
    name: 'teamMember',
    title: 'Team Member',
    type: 'object',
    fields: [
        {
            name: 'photo',
            title: 'Photo',
            type: 'image',
            options: { hotspot: true }
        },
        { name: 'name', title: 'Full Name', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'role', title: 'Role / Title', type: 'string' },
        { name: 'bio', title: 'Bio', type: 'text', rows: 3 },
        { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
    ],
    preview: {
        select: { title: 'name', subtitle: 'role', media: 'photo' }
    }
}
