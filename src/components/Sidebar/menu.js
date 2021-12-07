export const mainMenu = [
    {
        title: 'Zero to Hero',
        key: 'zth',
        link: 'zero-to-hero',
        icon: 'zth-icon',
        subMenu: [
            {
                title: 'Start Setup',
                link: 'campaign'
            },

            {
                title: 'ZTH Statuses',
                link: 'settings'
            },
        ]
    },
    {
        title: 'Analytics',
        key: 'analytics',
        icon: 'analytics-icon-sidebar',
        link: 'analytics/products'
    },
    // {
    //     title: 'Tableau',
    //     key: 'tableau',
    //     icon: 'analytics-icon-sidebar',
    //     link: 'tableau'
    // },
    {
        title: 'PPC Automation',
        key: 'ppc-automate',
        icon: 'ppc-automate-icon',
        link: 'ppc',
        subMenu: [
            {
                title: 'Set up Automation',
                link: 'automation'
            },
            {
                title: 'Automation Reports',
                link: 'report'
            },
            {
                title: 'Products Info',
                link: 'product-settings'
            },
            {
                title: 'Dayparting',
                link: 'dayparting',
            }
        ]
    }
]
