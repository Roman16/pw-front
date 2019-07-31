import PagesRouter from '../pages';

import PPCAutomate from '../pages/PPCAutomate';

const routers = [
    {
        path: '/',
        strict: true,
        component: PagesRouter,
        routes: [
            {
                path: '/',
                exact: true,
                component: PPCAutomate,
            },

        ],
    },
];

export default routers;
