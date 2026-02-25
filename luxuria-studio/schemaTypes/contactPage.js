export default {
    name: 'contactPage',
    title: 'Contact Page',
    type: 'document',
    groups: [
        { name: 'hero', title: 'Hero' },
        { name: 'contact', title: 'Contact Details' },
        { name: 'form', title: 'Form Settings' },
        { name: 'stores', title: 'Store Locations' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        // HERO
        { name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'Contact Us' },
        { name: 'heading', title: 'Heading', type: 'string', group: 'hero', initialValue: 'Get in Touch' },
        { name: 'intro', title: 'Intro Text', type: 'text', rows: 3, group: 'hero' },
        { name: 'heroBgImage', title: 'Hero Background Image', type: 'image', group: 'hero', options: { hotspot: true } },

        // CONTACT DETAILS
        { name: 'phone', title: 'Phone Number', type: 'string', group: 'contact' },
        { name: 'email', title: 'Email Address', type: 'string', group: 'contact' },
        { name: 'hours', title: 'Working Hours', type: 'string', group: 'contact', initialValue: 'Mon-Sat: 10:00 AM - 8:00 PM' },
        { name: 'address', title: 'Office Address', type: 'text', rows: 3, group: 'contact' },
        { name: 'mapEmbedUrl', title: 'Google Maps Embed URL', type: 'url', group: 'contact' },
        {
            name: 'socialLinks',
            title: 'Social Media Links',
            type: 'object',
            group: 'contact',
            fields: [
                { name: 'instagram', title: 'Instagram URL', type: 'url' },
                { name: 'facebook', title: 'Facebook URL', type: 'url' },
                { name: 'twitter', title: 'Twitter / X URL', type: 'url' },
                { name: 'youtube', title: 'YouTube URL', type: 'url' },
                { name: 'whatsapp', title: 'WhatsApp Number (with country code)', type: 'string' },
            ]
        },

        // FORM
        { name: 'formHeading', title: 'Form Section Heading', type: 'string', group: 'form', initialValue: 'Send Us a Message' },
        { name: 'formSubtext', title: 'Form Subtext', type: 'string', group: 'form' },
        { name: 'formRecipientEmail', title: 'Form Submission Email', type: 'string', group: 'form', description: 'Where form submissions should be sent' },

        // STORES
        {
            name: 'stores',
            title: 'Store Locations',
            type: 'array',
            group: 'stores',
            of: [{
                type: 'object',
                name: 'storeLocation',
                fields: [
                    { name: 'name', title: 'Store Name', type: 'string' },
                    { name: 'address', title: 'Address', type: 'text', rows: 2 },
                    { name: 'phone', title: 'Phone', type: 'string' },
                    { name: 'hours', title: 'Hours', type: 'string' },
                    { name: 'mapUrl', title: 'Maps Link', type: 'url' },
                ],
                preview: { select: { title: 'name', subtitle: 'address' } }
            }]
        },

        // SEO
        { name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo' },
        { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2, group: 'seo' },
    ],
    preview: { prepare() { return { title: 'Contact Page' } } }
}
