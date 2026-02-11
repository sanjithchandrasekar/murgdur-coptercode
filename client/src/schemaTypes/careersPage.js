export default {
    name: 'careersPage',
    title: 'Careers Page',
    type: 'document',
    fields: [
        { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Careers at Murgdur' },
        { name: 'intro', type: 'text', title: 'Intro Text' },
        {
            name: 'positions',
            type: 'array',
            title: 'Current Openings',
            of: [{
                type: 'object',
                fields: [
                    { name: 'role', type: 'string', title: 'Role' },
                    { name: 'location', type: 'string', title: 'Location' },
                    { name: 'type', type: 'string', title: 'Type', initialValue: 'Full Time' }
                ]
            }]
        },
        { name: 'contactText', type: 'string', title: 'Footer Contact Text' },
        { name: 'contactEmail', type: 'string', title: 'Footer Contact Email' }
    ]
}
