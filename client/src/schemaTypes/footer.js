export default {
    name: 'footer',
    title: 'Footer',
    type: 'document',
    groups: [
        { name: 'brand', title: 'Brand' },
        { name: 'links', title: 'Footer Links' },
        { name: 'newsletter', title: 'Newsletter' },
        { name: 'legal', title: 'Legal' },
    ],
    fields: [
        // BRAND
        { name: 'tagline', title: 'Footer Brand Tagline', type: 'string', group: 'brand' },
        { name: 'mailAddress', title: 'Mail Address', type: 'text', rows: 2, group: 'brand' },
        { name: 'officeAddress', title: 'Registered Office Address', type: 'text', rows: 3, group: 'brand' },
        {
            name: 'socialLinks',
            title: 'Social Links',
            type: 'object',
            group: 'brand',
            fields: [
                { name: 'instagram', title: 'Instagram', type: 'url' },
                { name: 'facebook', title: 'Facebook', type: 'url' },
                { name: 'twitter', title: 'Twitter / X', type: 'url' },
                { name: 'youtube', title: 'YouTube', type: 'url' },
                { name: 'pinterest', title: 'Pinterest', type: 'url' },
            ]
        },

        // LINKS
        {
            name: 'aboutLinks',
            title: 'About / Company Links',
            type: 'array',
            group: 'links',
            of: [{
                type: 'object',
                name: 'footerLink',
                fields: [
                    { name: 'title', title: 'Label', type: 'string' },
                    { name: 'url', title: 'URL Path', type: 'string' },
                ],
                preview: { select: { title: 'title', subtitle: 'url' } }
            }]
        },
        {
            name: 'helpLinks',
            title: 'Help & Support Links',
            type: 'array',
            group: 'links',
            of: [{
                type: 'object',
                name: 'helpLink',
                fields: [
                    { name: 'title', title: 'Label', type: 'string' },
                    { name: 'url', title: 'URL Path', type: 'string' },
                ],
                preview: { select: { title: 'title', subtitle: 'url' } }
            }]
        },
        {
            name: 'shopLinks',
            title: 'Shop / Collections Links',
            type: 'array',
            group: 'links',
            of: [{
                type: 'object',
                name: 'shopLink',
                fields: [
                    { name: 'title', title: 'Label', type: 'string' },
                    { name: 'url', title: 'URL Path', type: 'string' },
                ],
                preview: { select: { title: 'title', subtitle: 'url' } }
            }]
        },
        {
            name: 'policyLinks',
            title: 'Legal / Policy Links',
            type: 'array',
            group: 'links',
            of: [{
                type: 'object',
                name: 'policyLink',
                fields: [
                    { name: 'title', title: 'Label', type: 'string' },
                    { name: 'url', title: 'URL Path', type: 'string' },
                ],
                preview: { select: { title: 'title', subtitle: 'url' } }
            }]
        },

        // NEWSLETTER
        { name: 'newsletterHeading', title: 'Newsletter Heading', type: 'string', group: 'newsletter', initialValue: 'Join the Dynasty' },
        { name: 'newsletterSubtext', title: 'Newsletter Subtext', type: 'string', group: 'newsletter' },
        { name: 'newsletterPlaceholder', title: 'Email Placeholder', type: 'string', group: 'newsletter', initialValue: 'Enter your email' },
        { name: 'newsletterButtonText', title: 'Button Text', type: 'string', group: 'newsletter', initialValue: 'Subscribe' },

        // LEGAL
        { name: 'copyrightText', title: 'Copyright Text', type: 'string', group: 'legal', initialValue: '© 2025 Murgdur. All Rights Reserved.' },
        { name: 'gstNumber', title: 'GST / Tax Number', type: 'string', group: 'legal' },
        { name: 'cinNumber', title: 'CIN Number', type: 'string', group: 'legal' },
    ],
    preview: { prepare() { return { title: 'Footer' } } }
}
