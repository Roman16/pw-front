import api from './request';
import axios from 'axios';
import {userUrls} from '../constans/api.urls';

const stripeKey = process.env.REACT_APP_ENV === 'production'
    ? process.env.STRIPE_PUBLISHABLE_KEY_LIVE
    : process.env.STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_TYooMQauvdEDq54NiTphI7jx';

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
    updateCompanyInformation,
    updatePaymentMethod,
    getPersonalInformation,
    fetchCompanyInformation,
    fetchBillingInformation
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


function getPersonalInformation() {
    return api('get', userUrls.personalInformation);
}

function updateInformation({name, last_name, email, private_label_seller}) {
    return api('post', userUrls.personalInformation, {
        name,
        last_name,
        private_label_seller: private_label_seller ? 1 : 0
    });
}

function updatePhoto(data) {
    return api('post', userUrls.updatePhoto, data);
}

function changePassword({current_password, new_password, password_confirmation}) {
    return api('post', userUrls.changePassword, {
        current_password,
        password_confirmation,
        password: new_password
    });
}

//-------------------------------------
//-------------company-----------------
function fetchCompanyInformation() {
    return api('get', userUrls.companyInformation);
}

function updateCompanyInformation(company) {
    return api('post', userUrls.companyInformation, company);
}
//-------------------------------------

//-------------------------------------
//-------------billing-----------------
function updatePaymentMethod(data) {
    return api('post', userUrls.paymentMethod, data);
}
function fetchBillingInformation() {
    return api('get', userUrls.paymentMethod);
}
function getStripeAvailableCountries() {
    return axios.get(`https://api.stripe.com/v1/country_specs?limit=100`, {
        headers: {'Authorization': `Bearer ${stripeKey}`}
    });
}
//-------------------------------------