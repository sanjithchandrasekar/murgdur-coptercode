export default {
    name: 'coreValue',
    title: 'Core Value',
    type: 'object',
    fields: [
        { name: 'icon', title: 'Icon (emoji)', type: 'string' },
        { name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
    ],
    preview: {
        select: { title: 'title', subtitle: 'icon' }
    }
}
