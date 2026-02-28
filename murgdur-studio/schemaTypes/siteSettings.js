export default {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    groups: [
        { name: 'identity', title: 'Brand Identity' },
        { name: 'nav', title: 'Navigation' },
        { name: 'contact', title: 'Contact Info' },
        { name: 'social', title: 'Social Media' },
        { name: 'seo', title: 'Default SEO' },
        { name: 'announce', title: 'Announcement Bar' },
    ],
    fields: [
        // IDENTITY
        { name: 'title', title: 'Site Title', type: 'string', group: 'identity', initialValue: 'Murgdur' },
        { name: 'tagline', title: 'Brand Tagline', type: 'string', group: 'identity' },
        { name: 'logo', title: 'Logo', type: 'image', group: 'identity', options: { hotspot: true } },
        { name: 'logoText', title: 'Logo Text (if no image)', type: 'string', group: 'identity', initialValue: 'MURGDUR' },
        { name: 'favicon', title: 'Favicon', type: 'image', group: 'identity' },

        // NAVIGATION
        {
            name: 'navLinks',
            title: 'Main Navigation Links',
            type: 'array',
            group: 'nav',
            of: [{
                type: 'object',
                name: 'navLink',
                fields: [
                    { name: 'label', title: 'Label', type: 'string' },
                    { name: 'href', title: 'URL Path (e.g. /shop)', type: 'string' },
                    { name: 'isExternal', title: 'External Link?', type: 'boolean', initialValue: false },
                    {
                        name: 'dropdown',
                        title: 'Dropdown Items',
                        type: 'array',
                        of: [{
                            type: 'object',
                            name: 'dropdownItem',
                            fields: [
                                { name: 'label', title: 'Label', type: 'string' },
                                { name: 'href', title: 'URL Path', type: 'string' },
                            ],
                            preview: { select: { title: 'label' } }
                        }]
                    }
                ],
                preview: { select: { title: 'label', subtitle: 'href' } }
            }]
        },

        // MEGA MENU
        {
            name: 'navMenu',
            title: 'Mega Menu Items',
            type: 'array',
            group: 'nav',
            description: 'Full mega menu — subcategories and highlight images for each top-level item',
            of: [{
                type: 'object',
                name: 'navMenuItem',
                fields: [
                    { name: 'id', title: 'ID (unique slug, no spaces — e.g. bags)', type: 'string' },
                    { name: 'name', title: 'Menu Label', type: 'string' },
                    { name: 'path', title: 'Link Path (e.g. /shop?type=bags)', type: 'string' },
                    { name: 'image', title: 'Category Showcase Image', type: 'image', options: { hotspot: true } },
                    { name: 'imageSubtitle', title: 'Image Caption / Subtitle', type: 'string' },
                    {
                        name: 'subcategories',
                        title: 'Subcategory Links',
                        type: 'array',
                        of: [{
                            type: 'object',
                            name: 'subcategoryLink',
                            fields: [
                                { name: 'name', title: 'Name', type: 'string' },
                                { name: 'path', title: 'Path', type: 'string' },
                            ],
                            preview: { select: { title: 'name', subtitle: 'path' } }
                        }]
                    },
                    {
                        name: 'highlights',
                        title: 'Featured Highlights (image cards)',
                        type: 'array',
                        of: [{
                            type: 'object',
                            name: 'highlightItem',
                            fields: [
                                { name: 'name', title: 'Name', type: 'string' },
                                { name: 'image', title: 'Highlight Image', type: 'image', options: { hotspot: true } },
                                { name: 'path', title: 'Path', type: 'string' },
                            ],
                            preview: { select: { title: 'name', media: 'image' } }
                        }]
                    },
                ],
                preview: { select: { title: 'name', subtitle: 'path', media: 'image' } }
            }]
        },

        // BOTTOM DRAWER LINKS
        {
            name: 'navSimpleLinks',
            title: 'Bottom Drawer Links',
            type: 'array',
            group: 'nav',
            description: 'Simple links shown at the bottom of the mobile/desktop drawer (e.g. Trunks, Services)',
            of: [{
                type: 'object',
                name: 'simpleLink',
                fields: [
                    { name: 'name', title: 'Name', type: 'string' },
                    { name: 'path', title: 'Path', type: 'string' },
                ],
                preview: { select: { title: 'name', subtitle: 'path' } }
            }]
        },

        // CONTACT
        { name: 'contactEmail', title: 'Main Contact Email', type: 'string', group: 'contact' },
        { name: 'contactPhone', title: 'Main Phone Number', type: 'string', group: 'contact' },
        {
            name: 'whatsapp',
            title: 'WhatsApp Number (with country code, no + or spaces)',
            type: 'string',
            group: 'contact',
            description: 'e.g. 919003337582 — used for Place Order button in cart',
            initialValue: '919003337582',
        },
        {
            name: 'whatsappOrderMessage',
            title: 'WhatsApp Order Message Template',
            type: 'text',
            rows: 3,
            group: 'contact',
            description: 'Use {{items}} for cart items list and {{total}} for total amount.',
            initialValue: 'Hello Murgdur! I would like to place an order for: {{items}}. Total: ₹{{total}}. Please assist me.',
        },
        { name: 'address', title: 'Head Office Address', type: 'text', rows: 3, group: 'contact' },

        // SOCIAL
        {
            name: 'social',
            title: 'Social Media',
            type: 'object',
            group: 'social',
            fields: [
                { name: 'instagram', title: 'Instagram URL', type: 'url' },
                { name: 'facebook', title: 'Facebook URL', type: 'url' },
                { name: 'twitter', title: 'Twitter / X URL', type: 'url' },
                { name: 'youtube', title: 'YouTube URL', type: 'url' },
                { name: 'pinterest', title: 'Pinterest URL', type: 'url' },
                { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
            ]
        },

        // DEFAULT SEO
        { name: 'metaTitle', title: 'Default Meta Title', type: 'string', group: 'seo' },
        { name: 'metaDescription', title: 'Default Meta Description', type: 'text', rows: 2, group: 'seo' },
        { name: 'ogImage', title: 'Default OG Image', type: 'image', group: 'seo' },

        // ANNOUNCEMENT BAR
        { name: 'announcementEnabled', title: 'Show Announcement Bar?', type: 'boolean', group: 'announce', initialValue: false },
        { name: 'announcementText', title: 'Announcement Text', type: 'string', group: 'announce' },
        { name: 'announcementLink', title: 'Announcement Link (optional)', type: 'string', group: 'announce' },
        { name: 'announcementBgColor', title: 'Background Color (hex)', type: 'string', group: 'announce', initialValue: '#000000' },
        { name: 'announcementTextColor', title: 'Text Color (hex)', type: 'string', group: 'announce', initialValue: '#D4AF37' },
    ],
    preview: { prepare() { return { title: 'Site Settings' } } }
}

