export default {
    name: 'testimonials',
    title: 'Testimonials',
    type: 'document',
    fields: [
        { name: 'sectionLabel', title: 'Eyebrow / Section Label (e.g. Client Voices)', type: 'string', initialValue: 'Client Voices' },
        { name: 'heading', title: 'Section Heading', type: 'string', initialValue: 'What Our Customers Say' },
        { name: 'subheading', title: 'Section Subheading', type: 'string' },
        {
            name: 'reviews',
            title: 'Reviews',
            type: 'array',
            of: [{ type: 'testimonialItem' }]
        }
    ],
    preview: { prepare() { return { title: 'Testimonials' } } }
}
