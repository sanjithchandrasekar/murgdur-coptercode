export default {
    name: 'legacySection',
    title: 'Legacy Section (Home)',
    type: 'document',
    fields: [
        { name: 'heading', type: 'string', title: 'Heading' },
        { name: 'subHeading', type: 'string', title: 'Sub Heading', initialValue: 'Our Heritage' },
        { name: 'body', type: 'text', title: 'Intro Body (First Paragraph)' },
        { name: 'additionalBody', type: 'text', title: 'Additional Body (Second Paragraph)', rows: 4 },
        { name: 'memoryTitle', type: 'string', title: 'Memory Title' },
        { name: 'memoryBody', type: 'text', title: 'Memory Body' },
        {
            name: 'stats',
            title: 'Heritage Stats',
            description: 'Displayed as a stat row (e.g. 500+ Clients, 15+ Artisans)',
            type: 'array',
            of: [{
                type: 'object',
                name: 'statItem',
                fields: [
                    { name: 'number', title: 'Number / Value (e.g. 500+)', type: 'string' },
                    { name: 'label', title: 'Label (e.g. Happy Clients)', type: 'string' },
                ],
                preview: { select: { title: 'number', subtitle: 'label' } }
            }]
        },
        { name: 'founderQuoteBody', type: 'text', title: 'Founder Quote Text', rows: 3 },
        { name: 'founderQuoteCite', type: 'string', title: 'Founder Quote Attribution (e.g. "— Sri Sundershan, Founder")' }
    ],
    preview: {
        prepare() { return { title: 'Legacy Section (Home)' } }
    }
}
