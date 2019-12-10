const production = process.env.REACT_APP_ENV === 'production';

export const subscriptionProducts = production ? [
    {
        productId: 'prod_G8YHW9gpThjntf',
        productName: 'PPC Automate',
        planName: 'Optimization Setup',
        planId: 'plan_G8d203zIH8MTi5',
        key: 'ppc',
    }
] : [
    {
        productId: 'prod_G8YHW9gpThjntf',
        productName: 'PPC Automate',
        planName: 'Optimization Setup',
        planId: 'plan_G8d203zIH8MTi5',
        key: 'ppc',
    }

];
