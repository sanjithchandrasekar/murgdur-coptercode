export default {
    name: 'aboutPage',
    title: 'About Page',
    type: 'document',
    groups: [
        { name: 'hero', title: '1. Hero' },
        { name: 'impact', title: '2. Impact Stats' },
        { name: 'purpose', title: '3. Purpose & Mission' },
        { name: 'values', title: '4. Core Values' },
        { name: 'journey', title: '5. Journey' },
        { name: 'industries', title: '6. Industries' },
        { name: 'gallery', title: '7. Gallery & Video' },
        { name: 'partners', title: '8. Partners & Awards' },
        { name: 'leadership', title: '9. Team' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        // --- HERO ---
        { name: 'heroHeading', title: 'Hero Heading', type: 'string', group: 'hero', initialValue: 'About Murgdur' },
        { name: 'heroSubheading', title: 'Hero Subheading', type: 'string', group: 'hero' },
        { name: 'heroEyebrow', title: 'Eyebrow Label', type: 'string', group: 'hero', initialValue: 'Our Story' },
        { name: 'heroBgImage', title: 'Hero Background Image', type: 'image', group: 'hero', options: { hotspot: true } },

        // --- IMPACT STATS ---
        { name: 'impactStatsHeading', title: 'Impact Stats Heading', type: 'string', group: 'impact', initialValue: 'Our Impact at a Glance' },
        { name: 'impactStats', title: 'Impact Stats', type: 'array', group: 'impact', of: [{ type: 'statCard' }] },

        // --- PURPOSE / SHAPING FUTURE ---
        {
            name: 'shapingFutureSection', title: 'Shaping The Future Section', type: 'object', group: 'purpose',
            fields: [
                { name: 'eyebrow', title: 'Eyebrow', type: 'string' },
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'body', title: 'Body Text', type: 'text', rows: 5 },
                { name: 'image', title: 'Side Image', type: 'image', options: { hotspot: true } },
                { name: 'ctaText', title: 'CTA Button Text', type: 'string' },
                { name: 'ctaLink', title: 'CTA Link', type: 'string' },
            ]
        },
        {
            name: 'aboutPurpose', title: 'About Purpose Statement', type: 'object', group: 'purpose',
            fields: [
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'body', title: 'Body (Rich Text)', type: 'array', of: [{ type: 'block' }] },
                { name: 'image', title: 'Side Image', type: 'image', options: { hotspot: true } },
            ]
        },

        // --- CORE VALUES ---
        { name: 'coreValuesHeading', title: 'Core Values Section Heading', type: 'string', group: 'values', initialValue: 'What We Stand For' },
        { name: 'coreValuesSubheading', title: 'Core Values Subheading', type: 'string', group: 'values' },
        { name: 'coreValues', title: 'Core Values (Cards)', type: 'array', group: 'values', of: [{ type: 'coreValue' }] },

        // --- JOURNEY ---
        { name: 'journeyHeading', title: 'Journey Section Heading', type: 'string', group: 'journey', initialValue: 'Our Journey' },
        { name: 'journeySubheading', title: 'Journey Section Subheading', type: 'string', group: 'journey' },
        { name: 'journeyMilestones', title: 'Journey Milestones (Timeline)', type: 'array', group: 'journey', of: [{ type: 'timelineEntry' }] },

        // --- INDUSTRIES ---
        { name: 'industriesHeading', title: 'Industries Section Heading', type: 'string', group: 'industries', initialValue: 'Industries We Serve' },
        {
            name: 'industries', title: 'Industry Cards', type: 'array', group: 'industries',
            of: [{
                type: 'object', name: 'industryCard',
                fields: [
                    { name: 'icon', title: 'Icon (emoji or URL)', type: 'string' },
                    { name: 'title', title: 'Industry Name', type: 'string' },
                    { name: 'description', title: 'Description', type: 'text', rows: 2 },
                ],
                preview: { select: { title: 'title', subtitle: 'icon' } }
            }]
        },

        // --- GALLERY & VIDEO ---
        { name: 'scrollingBannerText', title: 'Scrolling Text Banner', type: 'string', group: 'gallery', description: 'e.g. Luxury • Heritage • Craftsmanship •' },
        {
            name: 'videoSection', title: 'Video Section', type: 'object', group: 'gallery',
            fields: [
                { name: 'heading', title: 'Heading', type: 'string' },
                { name: 'videoUrl', title: 'Video URL', type: 'url' },
                { name: 'poster', title: 'Poster Image', type: 'image', options: { hotspot: true } },
            ]
        },
        { name: 'galleryImages', title: 'Gallery Images', type: 'array', group: 'gallery', of: [{ type: 'image', options: { hotspot: true } }] },

        // --- PARTNERS & AWARDS ---
        { name: 'partnersHeading', title: 'Partners Section Heading', type: 'string', group: 'partners', initialValue: 'Our Partners & Clients' },
        { name: 'partners', title: 'Partners & Clients', type: 'array', group: 'partners', of: [{ type: 'partnerItem' }] },
        { name: 'awardsHeading', title: 'Awards Section Heading', type: 'string', group: 'partners', initialValue: 'Awards & Recognition' },
        { name: 'awards', title: 'Awards & Recognition', type: 'array', group: 'partners', of: [{ type: 'awardItem' }] },

        // --- LEADERSHIP ---
        { name: 'leadershipHeading', title: 'Leadership Section Heading', type: 'string', group: 'leadership', initialValue: 'Our Leadership' },
        { name: 'leadershipTeam', title: 'Leadership Team Members', type: 'array', group: 'leadership', of: [{ type: 'teamMember' }] },
        { name: 'boardHeading', title: 'Board Section Heading', type: 'string', group: 'leadership', initialValue: 'Board of Directors' },
        { name: 'boardMembers', title: 'Board Members', type: 'array', group: 'leadership', of: [{ type: 'teamMember' }] },

        // --- SEO ---
        { name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo' },
        { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2, group: 'seo' },
    ],
    preview: { prepare() { return { title: 'About Page' } } }
}
