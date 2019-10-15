export const regionsMenu = [
    {
        region: 'North America',
        countries: [
            {
                name: 'US',
                flag: 'us.svg',
                description: 'NBI49DMDH34BG',
                active: true,
            },
            {
                name: 'Canada',
                flag: 'canada.svg',
                description: 'NBI49DMDH34BG',
            },
            {
                name: 'Mexico',
                flag: 'us.svg',
                description: 'NBI49DMDH34BG',
            },
        ],
    },
    {
        region: 'Europe',
        countries: [
            {
                name: 'UK',
                flag: 'us.svg',
                description: 'NBI49DMDH34BG',
            },
            {
                name: 'DE',
                flag: 'us.svg',
                description: 'NBI49DMDH34BG',
            },
            {
                name: 'FR',
                flag: 'us.svg',
                description: 'NBI49DMDH34BG',
            },
            {
                name: 'IT',
                flag: 'us.svg',
                description: 'NBI49DMDH34BG',
            },
            {
                name: 'ES',
                flag: 'us.svg',
                description: 'NBI49DMDH34BG',
            },
        ],
    },
];

export const menuMain = [
    {
        title: 'Zero to Hero',
        link: '/zero-to-hero',
        icon: 'zeroToHero',
    },
    {
        title: 'Analytics',
        link: '/analytics',
        icon: 'analytics',
    },
    {
        title: 'PPC Automate',
        link: '/ppc',
        icon: 'ppcAutomate',
        subMenu: [
            {
                title: 'Dashboard',
                link: '/dashboard',
            },
            {
                title: 'Expansion',
                link: '/expansion',
            },
            {
                title: 'Scan',
                link: '/scan',
            },
            {
                title: 'Optimization',
                link: '/optimization',
            },
            {
                title: 'Charge Report',
                link: '/report',
            },
            {
                title: 'Product Settings',
                link: '/product-settings',
            },
        ],
    },
];

export const menuBottom = [
    {
        title: 'Manage Plans',
        link: '',
        icon: 'managePlans',
    },
    {
        title: 'Wallet',
        link: '',
        icon: 'wallet',
    },
    {
        title: 'Account',
        link: 'ppc-automate',
        icon: 'account',
    },
    {
        title: 'Help Center',
        link: '',
        icon: 'helpCenter',
    },
    {
        title: 'Log Out',
        link: '/',
        icon: 'logOut',
        className: 'logOut',
    },
];
