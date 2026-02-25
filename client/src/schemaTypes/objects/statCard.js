export default {
    name: 'statCard',
    title: 'Stat Card',
    type: 'object',
    fields: [
        { name: 'number', title: 'Number / Value', type: 'string', description: 'e.g. "500+" or "₹1Cr+"' },
        { name: 'label', title: 'Label', type: 'string', description: 'e.g. "Happy Customers"' },
        { name: 'description', title: 'Sub-description', type: 'string' },
    ],
    preview: {
        select: { title: 'number', subtitle: 'label' }
    }
}
