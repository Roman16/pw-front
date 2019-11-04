import api from './request';
import axios from 'axios';
import { userUrls } from '../constans/api.urls';

export const userService = {
    login,
    regist,
    getUserInfo,
    setMWS,
    getStripeAvailableCountries
};

function login(user) {
    return api('post', userUrls.login, user);
}

function regist(user) {
    return api('post', userUrls.regist, user);
}

function getUserInfo() {
    return api('get', userUrls.allInfo);
}

function setMWS(data) {
    return api('post', userUrls.mws, data);
}

function getStripeAvailableCountries(token) {
    return axios.get(`https://api.stripe.com/v1/country_specs?limit=100`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
}
