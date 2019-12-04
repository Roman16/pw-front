import api from './request';
import axios from 'axios';
import {userUrls} from '../constans/api.urls';

const stripeKey = process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE
    : process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_TYooMQauvdEDq54NiTphI7jx';

export const userService = {
    login,
    loginWithAmazon,
    regist,
    getUserInfo,
    setMWS,
    unsetMWS,
    unsetPPC,
    getStripeAvailableCountries,
    updateInformation,
    updatePhoto,
    changePassword,
    updateCompanyInformation,
    updatePaymentMethod,
    fetchCompanyInformation,
    fetchBillingInformation,
    fetchBillingHistory,
    addPaymentMethod,
    setDefaultPaymentMethod,
    deletePaymentMethod,
    reactivateSubscription,
    cancelSubscription,
    subscribe,
    confirmPayment
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

function unsetMWS() {
    return api('post', userUrls.deleteMws);
}

function unsetPPC() {
    return api('post', userUrls.deleteLwa);
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
function fetchCompanyInformation(cardId) {
    return api('get', userUrls.companyInformation(cardId));
}

function updateCompanyInformation(cardId, company) {
    const data = company;
    Object.keys(data).forEach((key) => (data[key] == null || data[key] === "") && delete data[key]);
    return api('post', userUrls.companyInformation(cardId), data);
}

//-------------------------------------

//-------------------------------------
//-------------payment-----------------
function fetchBillingInformation() {
    return api('get', userUrls.paymentMethodList);
}

function addPaymentMethod(data) {
    return api('post', userUrls.addPaymentMethod, data);
}

function updatePaymentMethod(card) {
    const data = card;
    Object.keys(data).forEach((key) => (data[key] == null || data[key] === "") && delete data[key]);
    return api('post', userUrls.updatePaymentMethod(data.id), data);
}

function setDefaultPaymentMethod(id) {
    return api('post', userUrls.setDefaultPaymentMethod(id));
}

function deletePaymentMethod(id) {
    return api('post', userUrls.deletePaymentMethod(id));
}

function fetchBillingHistory({page, pageSize}) {
    return api('get', `${userUrls.paymentHistoryList}?page=${page}&size=${pageSize}`);
}

function confirmPayment(data) {
    return api('post', userUrls.confirm, data);
}

//-------------------------------------
//-------------subscription---------
function subscribe(data) {
    return api('post', userUrls.subscribe(data.subscriptionId),  data);
}

function reactivateSubscription(data) {
    return api('post', userUrls.reactivate(data.subscriptionId),  data);
}

function cancelSubscription(data) {
    return api('post', userUrls.cancel(data.subscriptionId),  data);
}

//-------------------------------------
function getStripeAvailableCountries() {
    return axios.get(`https://api.stripe.com/v1/country_specs?limit=100`, {
        headers: {'Authorization': `Bearer ${stripeKey}`}
    });
}
