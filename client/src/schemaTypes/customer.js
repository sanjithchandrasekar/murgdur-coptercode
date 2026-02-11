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
            name: 'createdAt',
            title: 'Created At',
            type: 'datetime',
            initialValue: () => new Date().toISOString()
        }
    ],
    preview: {
        select: {
            title: 'firstName',
            subtitle: 'mobile'
        }
    }
}
