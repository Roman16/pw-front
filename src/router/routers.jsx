import PagesRouter from '../pages';
import Login from '../pages/Login';
import PPCAutomate from '../pages/PPCAutomate';
import PPCReport from '../pages/PPCReport';

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
                path: '/ppc-automate',
                exact: true,
                component: PPCAutomate,
            },
            {
                path: '/ppc-report',
                exact: true,
                component: PPCReport,
            },

        ],
    },
];

export default routers;
