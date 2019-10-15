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
import AccountBindingPage from "../authentication/AccountBinding";

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
        path: '/account-binding/:parameter',
        exact: true,
        component: AccountBindingPage
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
