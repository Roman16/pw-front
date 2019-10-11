/* eslint-disable comma-dangle */
// import React from 'react';
import Login from '../authentication/Login';
import Register from '../authentication/Register';
import PagesRouter from '../pages';
import ProductSettings from '../pages/ProductSettings';
import PPCAutomate from '../pages/PPCAutomate';
import PPCReport from '../pages/PPCReport';
import NotFound from '../pages/NotFound';
import { next } from './render-routers';

const routers = [
    {
        path: '/login',
        exact: true,
        component: Login
    },
    {
        path: '/register',
        exact: true,
        component: Register
    },
    {
        path: '/',
        strict: true,
        component: PagesRouter,
        before: () => {
            // // todo add auth
            // console.log('check auth');
            next();
        },

        routes: [
            {
                path: '/ppc/product-settings',
                exact: true,
                component: ProductSettings
            },
            {
                path: '/ppc/optimization',
                exact: true,
                component: PPCAutomate
            },
            {
                path: '/ppc/report',
                exact: true,
                component: PPCReport
            },
            {
                path: '*',
                exact: true,
                component: NotFound
            }
        ]
    }
];

export default routers;
