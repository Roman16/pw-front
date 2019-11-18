import api from './request';
import axios from 'axios';
import {userUrls} from '../constans/api.urls';

export const userService = {
    login,
    loginWithAmazon,
    regist,
    getUserInfo,
    setMWS,
    getStripeAvailableCountries,
    updateInformation,
    updatePhoto,
    changePassword,
    updateCompanyInformation
};

function login(user) {
    return api('post', userUrls.login, user);
}

function loginWithAmazon(user) {
    return api('post', userUrls.loginAmazon, user);
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

function updateInformation({name, last_name, email, private_label_seller}) {
    return api('post', userUrls.updateUserInfo, {
        name,
        last_name,
        email,
        private_label_seller: private_label_seller ? 1 : 0
    });
}

function updatePhoto(data) {
    return api('post', userUrls.updatePhoto, data);
}

function changePassword({current_password, new_password}) {
    return api('post', userUrls.changePassword, {
        current_password,
        password: new_password
    });
}

function updateCompanyInformation(company) {
    return api('post', userUrls.companyInformation, company);
}

function getStripeAvailableCountries(token) {
    return axios.get(`https://api.stripe.com/v1/country_specs?limit=100`, {
        headers: {'Authorization': `Bearer ${token}`}
    });
}
