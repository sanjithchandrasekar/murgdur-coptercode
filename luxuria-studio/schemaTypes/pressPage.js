export default {
    name: 'pressPage',
    title: 'Press Page',
    type: 'document',
    groups: [
        { name: 'main', title: 'Main Content' },
        { name: 'releases', title: 'Press Releases' },
        { name: 'media', title: 'Media Kit' },
        { name: 'seo', title: 'SEO' },
    ],
    fields: [
        { name: 'heading', title: 'Page Heading', type: 'string', group: 'main', initialValue: 'Press Room' },
        { name: 'eyebrow', title: 'Eyebrow Text', type: 'string', group: 'main', initialValue: 'Media & Press' },
        { name: 'intro', title: 'Intro Text', type: 'text', rows: 3, group: 'main' },
        { name: 'heroBgImage', title: 'Hero Background Image', type: 'image', group: 'main', options: { hotspot: true } },

        // PRESS RELEASES
        { name: 'releasesHeading', title: 'Releases Section Heading', type: 'string', group: 'releases', initialValue: 'Latest News' },
        {
            name: 'releases',
            title: 'Press Releases',
            type: 'array',
            group: 'releases',
            of: [{ type: 'pressRelease' }]
        },

        // MEDIA KIT
        { name: 'mediaKitHeading', title: 'Media Kit Heading', type: 'string', group: 'media', initialValue: 'Media Enquiries' },
        { name: 'mediaKitText', title: 'Media Kit Description', type: 'text', rows: 2, group: 'media' },
        { name: 'mediaContactEmail', title: 'Media Contact Email', type: 'string', group: 'media', initialValue: 'press@murgdur.com' },
        { name: 'mediaContactPhone', title: 'Media Contact Phone', type: 'string', group: 'media' },
        {
            name: 'downloadableAssets',
            title: 'Downloadable Assets (zip/pdf)',
            type: 'array',
            group: 'media',
            of: [{
                type: 'object',
                name: 'asset',
                fields: [
                    { name: 'label', title: 'Label', type: 'string' },
                    { name: 'fileUrl', title: 'File URL', type: 'url' },
                ],
                preview: { select: { title: 'label' } }
            }]
        },

        // SEO
        { name: 'seoTitle', title: 'SEO Title', type: 'string', group: 'seo' },
        { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2, group: 'seo' },
    ],
    preview: { prepare() { return { title: 'Press Page' } } }
}
