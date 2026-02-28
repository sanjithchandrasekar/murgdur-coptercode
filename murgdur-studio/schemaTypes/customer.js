export default {
    name: 'customer',
    title: 'Customer',
    type: 'document',
    fields: [
        {
            name: 'firstName',
            title: 'First Name',
            type: 'string',
        },
        {
            name: 'lastName',
            title: 'Last Name',
            type: 'string',
        },
        {
            name: 'mobile',
            title: 'Mobile Number',
            type: 'string',
        },
        {
            name: 'email',
            title: 'Email Address',
            type: 'string',
        },
        {
            name: 'password',
            title: 'Password',
            type: 'string',
            description: 'Stored as plain text per user request (Not recommended for production)',
        },
        {
            name: 'addressLine1',
            title: 'Address Line 1',
            type: 'string',
        },
        {
            name: 'addressLine2',
            title: 'Address Line 2',
            type: 'string',
        },
        {
            name: 'city',
            title: 'City',
            type: 'string',
        },
        {
            name: 'state',
            title: 'State',
            type: 'string',
        },
        {
            name: 'pincode',
            title: 'Pincode',
            type: 'string',
        },
        {
            name: 'addresses',
            title: 'Saved Addresses',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'id', type: 'string' },
                        { name: 'name', type: 'string' },
                        { name: 'mobile', type: 'string' },
                        { name: 'pincode', type: 'string' },
                        { name: 'city', type: 'string' },
                        { name: 'state', type: 'string' },
                        { name: 'addressLine', type: 'string' },
                        { name: 'address', type: 'string', title: 'Full Formatted Address' },
                        { name: 'country', type: 'string', initialValue: 'India' },
                        { name: 'isDefault', type: 'boolean', initialValue: false },
                        { name: 'type', type: 'string', initialValue: 'Home' }
                    ]
                }
            ]
        },
        {
            name: 'savedCards',
            title: 'Saved Payment Methods',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'id', type: 'string' },
                        { name: 'last4', type: 'string' },
                        { name: 'name', type: 'string' },
                        { name: 'expiry', type: 'string' },
                        { name: 'type', type: 'string', initialValue: 'Visa' }
                    ]
                }
            ]
        },
        {
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            initialValue: () => new Date().toISOString()
        }
    ],
    preview: {
        select: {
            first: 'firstName',
            last: 'lastName',
            subtitle: 'email',
        },
        prepare({ first, last, subtitle }) {
            return {
                title: [first, last].filter(Boolean).join(' ') || 'Unnamed Customer',
                subtitle: subtitle || '',
            }
        }
    }
}
