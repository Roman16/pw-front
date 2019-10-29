export const regionsMenu = [
    {
        region: 'North America',
        countries: [
            {
                name: 'US',
                flag: 'us.svg',
                description: 'NBI49DMDH34BG',
                active: true
            },
            {
                name: 'Canada',
                flag: 'canada.svg',
                description: 'NBI49DMDH34BG'
            },
            {
                name: 'Mexico',
                flag: 'us.svg',
                description: 'NBI49DMDH34BG'
            }
        ]
    },
    {
        region: 'Europe',
        countries: [
            {
                name: 'UK',
                flag: 'us.svg',
                description: 'NBI49DMDH34BG'
            },
            {
                name: 'DE',
                flag: 'us.svg',
                description: 'NBI49DMDH34BG'
            },
            {
                name: 'FR',
                flag: 'us.svg',
                description: 'NBI49DMDH34BG'
            },
            {
                name: 'IT',
                flag: 'us.svg',
                description: 'NBI49DMDH34BG'
            },
            {
                name: 'ES',
                flag: 'us.svg',
                description: 'NBI49DMDH34BG'
            }
        ]
    }
];

export const menuMain = [
    /*
     * Zero to Hero
     */
    // {
    //     title: 'Zero to Hero',
    //     link: '/zero-to-hero',
    //     icon: 'zeroToHero'
    // },

    /*
     * Analytics
     */
    // {
    //     title: 'Analytics',
    //     link: '/analytics',
    //     icon: 'analytics'
    // },
    {
        title: 'PPC Automate',
        link: '/ppc',
        icon: 'ppcAutomate',
        subMenu: [
            {
                title: 'Dashboard',
                link: '/dashboard'
            },
            {
                title: 'Optimization Setup',
                link: '/optimization'
            },
            {
                title: 'Optimization Reports',
                link: '/report'
            },
            {
                title: 'Product Settings',
                link: '/product-settings'
            },
            {
                title: 'PPC Scanner',
                link: '-scaner',
                className: 'ppcScaner'
            }
            // {
            //     title: 'Expansion',
            //     link: '/expansion'
            // }
        ]
    }
];

export const menuBottom = [
    /*
     * Manage Plans
     */
    // {
    //     title: 'Manage Plans',
    //     link: '',
    //     icon: 'managePlans'
    // },

    /*
     * Wallet
     */
    // {
    //     title: 'Wallet',
    //     link: '',
    //     icon: 'wallet'
    // },
    {
        title: 'Account',
        link: 'https://profitwhales.com/account/settings',
        icon: 'account',
        className: 'account'
    },
    {
        title: 'Help Center',
        link: 'https://profit-whales.kayako.com',
        icon: 'helpCenter',
        className: 'helpCenter'
    },
    {
        title: 'Log Out',
        link: '/login',
        icon: 'logOut',
        className: 'logOut'
    }
];
