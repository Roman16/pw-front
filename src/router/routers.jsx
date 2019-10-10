import React from 'react';
import PagesRouter from '../pages';
import Login from '../authentication/Login';
import Register from '../authentication/Register';
import PPCAutomate from '../pages/PPCAutomate';
import PPCReport from '../pages/PPCReport';
import ProductSettings from '../pages/ProductSettings';
import NotFound from '../pages/NotFound';
import { next } from './render-routers';

const routers = [
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
        path: '/',
        strict: true,
        component: PagesRouter,
        before: () => {
            if ([null, 'null'].includes(window.localStorage.getItem('token'))) {
                return next('/login');
            }


            return next();
        },

        routes: [

            {
                path: '/product-settings',
                exact: true,
                component: ProductSettings,
            },
            {
                path: '/optimization',
                exact: true,
                component: PPCAutomate,
            },
            {
                path: '/report',
                exact: true,
                component: PPCReport,
            },
            {
                path: '*',
                exact: true,
                component: NotFound,
            },


        ],

    },

];

export default routers;
