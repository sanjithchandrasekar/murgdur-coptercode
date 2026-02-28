export default {
    name: 'careersPage',
    title: 'Careers Page',
    type: 'document',
    groups: [
        { name: 'hero', title: 'Hero' },
        { name: 'culture', title: 'Culture & Values' },
        { name: 'jobs', title: 'Job Openings' },
        { name: 'contact', title: 'Contact' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        // HERO
        { name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'Join the House' },
        { name: 'heading', title: 'Page Heading', type: 'string', group: 'hero', initialValue: 'Careers at Murgdur' },
        { name: 'intro', title: 'Intro Text', type: 'text', rows: 4, group: 'hero' },
        { name: 'heroBgImage', title: 'Hero Background Image', type: 'image', group: 'hero', options: { hotspot: true } },

        // CULTURE
        { name: 'cultureHeading', title: 'Culture Section Heading', type: 'string', group: 'culture' },
        {
            name: 'cultureValues',
            title: 'Culture Values',
            type: 'array',
            group: 'culture',
            of: [{
                type: 'object',
                name: 'cultureValue',
                fields: [
                    { name: 'icon', title: 'Icon (emoji)', type: 'string' },
                    { name: 'title', title: 'Title', type: 'string' },
                    { name: 'description', title: 'Description', type: 'text', rows: 2 },
                ],
                preview: { select: { title: 'title', subtitle: 'icon' } }
            }]
        },

        // JOB OPENINGS
        { name: 'openingsHeading', title: 'Openings Section Heading', type: 'string', group: 'jobs', initialValue: 'Current Openings' },
        {
            name: 'positions',
            title: 'Job Postings',
            type: 'array',
            group: 'jobs',
            of: [{ type: 'jobPosting' }]
        },

        // CONTACT
        { name: 'contactText', title: 'Footer Contact Text', type: 'string', group: 'contact' },
        { name: 'contactEmail', title: 'Careers Email', type: 'string', group: 'contact', initialValue: 'careers@murgdur.com' },

        // PERKS / BENEFITS
        { name: 'perksHeading', title: 'Perks Section Heading', type: 'string', group: 'culture', initialValue: 'Why Join Murgdur?' },
        {
            name: 'perks',
            title: 'Employee Perks / Benefits',
            type: 'array',
            group: 'culture',
            description: 'List of perks shown as tags/chips (e.g. "Competitive Salary", "Remote Flexibility")',
            of: [{ type: 'string' }]
        },

        // SEO
        { name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo' },
        { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2, group: 'seo' },
    ],
    preview: { prepare() { return { title: 'Careers Page' } } }
}
