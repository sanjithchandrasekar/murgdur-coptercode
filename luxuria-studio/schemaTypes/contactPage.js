export default {
    name: 'contactPage',
    title: 'Contact Page',
    type: 'document',
    fields: [
        { name: 'eyebrow', type: 'string', title: 'Eyebrow', initialValue: 'Contact Us' },
        { name: 'heading', type: 'string', title: 'Heading', initialValue: 'Get in Touch' },
        { name: 'intro', type: 'text', title: 'Intro Text' },
        { name: 'phone', type: 'string', title: 'Phone Number' },
        { name: 'email', type: 'string', title: 'Email Address' },
        { name: 'hours', type: 'string', title: 'Working Hours' },
        { name: 'address', type: 'text', title: 'Address' }
    ]
}
