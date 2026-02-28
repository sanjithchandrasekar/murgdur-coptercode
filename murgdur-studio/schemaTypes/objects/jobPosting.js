export default {
    name: 'jobPosting',
    title: 'Job Posting',
    type: 'object',
    fields: [
        { name: 'role', title: 'Job Role', type: 'string', validation: (Rule) => Rule.required() },
        { name: 'location', title: 'Location', type: 'string', description: 'e.g. "Design Studio • Mumbai, India"' },
        {
            name: 'type',
            title: 'Employment Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Full-time', value: 'full-time' },
                    { title: 'Part-time', value: 'part-time' },
                    { title: 'Contract', value: 'contract' },
                    { title: 'Internship', value: 'internship' },
                ]
            }
        },
        { name: 'description', title: 'Job Description', type: 'text', rows: 5 },
        { name: 'applyLink', title: 'Apply Link (optional)', type: 'url' },
        { name: 'isActive', title: 'Active Listing?', type: 'boolean', initialValue: true },
    ],
    preview: {
        select: { title: 'role', subtitle: 'location' }
    }
}
