export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
        {
            name: 'orderNumber',
            title: 'Order Number',
            type: 'string',
        },
        {
            name: 'customer',
            title: 'Customer',
            type: 'reference',
            to: [{ type: 'customer' }]
        },
        {
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'productId', type: 'string' },
                        { name: 'name', type: 'string' },
                        { name: 'price', type: 'number' },
                        { name: 'quantity', type: 'number' },
                        { name: 'size', type: 'string' },
                        { name: 'image', type: 'string' }
                    ]
                }
            ]
        },
        {
            name: 'totalAmount',
            title: 'Total Amount',
            type: 'number'
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Ordered', value: 'ordered' },
                    { title: 'Processing', value: 'processing' },
                    { title: 'Shipped', value: 'shipped' },
                    { title: 'Delivered', value: 'delivered' },
                    { title: 'Cancelled', value: 'cancelled' }
                ]
            },
            initialValue: 'ordered'
        },
        {
            name: 'shippingAddress',
            title: 'Shipping Address',
            type: 'text'
        },
        {
            name: 'paymentMethod',
            title: 'Payment Method',
            type: 'string'
        },
        {
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            initialValue: () => new Date().toISOString()
        }
    ],
    orderings: [
        {
            title: 'Newest First',
            name: 'createdAtDesc',
            by: [{ field: 'createdAt', direction: 'desc' }]
        },
        {
            title: 'Status',
            name: 'statusAsc',
            by: [{ field: 'status', direction: 'asc' }]
        }
    ],
    preview: {
        select: {
            title: 'orderNumber',
            subtitle: 'status',
            customer: 'customer.firstName',
        },
        prepare({ title, subtitle, customer }) {
            return {
                title: title ? `Order #${title}` : 'Unnamed Order',
                subtitle: [customer, subtitle].filter(Boolean).join(' — '),
            }
        }
    }
}
