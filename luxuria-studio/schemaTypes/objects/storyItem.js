export default {
    name: 'storyItem',
    title: 'Story Item',
    type: 'object',
    fields: [
        {
            name: 'image',
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true }
        },
        { name: 'category', title: 'Category', type: 'string', description: 'e.g. Heritage, Campaign, Sustainability' },
        { name: 'title', title: 'Story Title', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'description', title: 'Description', type: 'text', rows: 4 },
        { name: 'readMoreLink', title: 'Read More Link (optional)', type: 'url' },
    ],
    preview: {
        select: { title: 'title', subtitle: 'category', media: 'image' }
    }
}
