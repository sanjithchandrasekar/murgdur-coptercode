export default {
    name: 'storiesPage',
    title: 'Stories Page',
    type: 'document',
    fields: [
        { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Murgdur Stories' },
        {
            name: 'stories',
            type: 'array',
            title: 'Stories List',
            of: [{
                type: 'object',
                fields: [
                    { name: 'image', type: 'image', title: 'Cover Image' },
                    { name: 'category', type: 'string', title: 'Category' },
                    { name: 'title', type: 'string', title: 'Title' },
                    { name: 'description', type: 'text', title: 'Description' }
                ]
            }]
        }
    ]
}
