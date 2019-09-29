import PagesRouter from '../pages';
import PagesRouterWithMain from '../pages/PagesRouterWithMain';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PPCAutomate from '../pages/PPCAutomate';
import PPCReport from '../pages/PPCReport';
import ProductSettings from '../pages/ProductSettings';

const routers = [
    {
        path: '/',
        strict: true,
        component: PagesRouter,
        routes: [
            {
                path: '/login',
                exact: true,
                component: Login,
            },
            {
                path: '/register',
                exact: true,
                component: Register,
            },
            {
                path: '/ppc',
                strict: true,
                component: PagesRouterWithMain,
                routes: [
                    {
                        path: '/ppc/product-settings',
                        exact: true,
                        component: ProductSettings,
                    },
                    {
                        path: '/ppc',
                        exact: true,
                        before: () => '/ppc/report',
                    },
                    {
                        path: '/ppc/optimization',
                        exact: true,
                        component: PPCAutomate,
                    },
                    {
                        path: '/ppc/report',
                        exact: true,
                        component: PPCReport,
                    },

                ],
            },

        ],
    },
];

export default routers;
