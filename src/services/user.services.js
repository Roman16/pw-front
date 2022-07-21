import api, {baseUrl} from './request'
import axios from 'axios'
import {userUrls} from '../constans/api.urls'

const stripeKey = process.env.REACT_APP_ENV === 'production'
    ? process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_LIVE
    : process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY_TEST || 'pk_test_TYooMQauvdEDq54NiTphI7jx'

export const userService = {
    login,
    logOut,
    loginWithAmazon,
    sendEmailForResetPassword,
    checkResetToken,
    changeUserPassword,
    regist,
    resendConfirmEmail,
    confirmEmail,
    setMWS,
    unsetMWS,
    unsetAdsApi,
    getStripeAvailableCountries,
    updateInformation,
    changePassword,
    updateCompanyInformation,
    updatePaymentMethod,
    fetchCompanyInformation,
    fetchBillingInformation,
    fetchBillingHistory,
    addPaymentMethod,
    setDefaultPaymentMethod,
    deletePaymentMethod,
    confirmPayment,
    startFreeTrial,
    toggleMarketplace,

    getBlogPosts,
    sendContactForm,

    getRegistrationTokens,
    checkImportStatus,

    getIndexHtml,

    getSubscriptionsState,
    cancelSubscription,
    getActivateInfo,
    getCouponInfo,
    activateCoupon,
    activateSubscription,
    retryPayment,

    getPPCConnectLink,
    getMWSConnectLink,
    getAmazonRegionAccounts,
    createAmazonRegionAccount,
    attachAmazonAds,
    attachMWS,

    getUserPersonalInformation,

    getNotifications,
    getAccountStatus,

    updateAmazonAccount
}

function login(user) {
    return api('post', userUrls.login, user, undefined, undefined, undefined, undefined, false)
}

function logOut() {
    return api('post', userUrls.logOut, undefined, undefined, undefined, undefined, false)
}

function loginWithAmazon(user) {
    return api('post', userUrls.loginAmazon, user)
}

function regist(user) {
    return api('post', userUrls.regist, user, undefined, undefined, undefined, undefined, false)
}


function sendEmailForResetPassword(email) {
    return api('post', userUrls.resetEmail, email, undefined, undefined, undefined, undefined, false)
}

function checkResetToken({userId, token}) {
    return api('get', `${userUrls.checkToken}/${userId}/${token}`, undefined, undefined, undefined, undefined, undefined, false)
}

function changeUserPassword({userId, token, newPassword}) {
    return api('post', `${userUrls.resetPassword}/${userId}/${token}`, newPassword, undefined, undefined, undefined, undefined, false)
}

function resendConfirmEmail() {
    return api('post', userUrls.resendEmail, undefined, undefined, undefined, undefined, undefined, false)
}

function confirmEmail({token}) {
    return api('post', `${userUrls.confirmEmail}/${token}`, {token}, undefined, undefined, undefined, undefined, false)
}

function setMWS(data) {
    return api('post', userUrls.mws, data, undefined, undefined, undefined, undefined, false)
}


function getUserPersonalInformation() {
    return api('get', userUrls.userPersonalInformation, undefined, undefined, undefined, undefined, undefined, false)
}

function updateInformation({name, last_name, email, private_label_seller}) {
    return api('post', userUrls.personalInformation, {
        name,
        last_name,
        private_label_seller: private_label_seller ? 1 : 0
    }, undefined, undefined, undefined, undefined, false)
}

function changePassword({current_password, new_password, password_confirmation}) {
    return api('post', userUrls.changePassword, {
        current_password,
        password_confirmation,
        password: new_password
    })
}

//-------------------------------------
//-------------company-----------------
function fetchCompanyInformation(cardId) {
    return api('get', userUrls.companyInformation(cardId), undefined, undefined, undefined, undefined, undefined, false)
}

function updateCompanyInformation(cardId, company) {
    const data = company
    Object.keys(data).forEach((key) => (data[key] == null || data[key] === "") && delete data[key])
    return api('post', userUrls.companyInformation(cardId), data, undefined, undefined, undefined, undefined, false)
}

//-------------------------------------

//-------------------------------------
//-------------payment-----------------
function fetchBillingInformation() {
    return api('get', userUrls.paymentMethodList, undefined, undefined, undefined, undefined, undefined, false)
}

function addPaymentMethod(data) {
    return api('post', userUrls.addPaymentMethod, data, undefined, undefined, undefined, undefined, false)
}

function updatePaymentMethod(card) {
    const data = card
    Object.keys(data).forEach((key) => (data[key] == null || data[key] === "") && delete data[key])
    return api('post', userUrls.updatePaymentMethod(data.id), data, undefined, undefined, undefined, undefined, false)
}

function setDefaultPaymentMethod(id, cancelToken) {
    return api('post', userUrls.setDefaultPaymentMethod(id), undefined, undefined, cancelToken, undefined, undefined, undefined, false)
}

function deletePaymentMethod(id) {
    return api('post', userUrls.deletePaymentMethod(id), undefined, undefined, undefined, undefined, undefined, false)
}

function fetchBillingHistory({page, pageSize}) {
    return api('get', `${userUrls.paymentHistoryList}?page=${page}&size=${pageSize}`, undefined, undefined, undefined, undefined, undefined, false)
}

function confirmPayment(data) {
    return api('post', userUrls.confirm, data, undefined, undefined, undefined, undefined, false)
}

//-------------------------------
function startFreeTrial() {
    return api('post', `${userUrls.freeTrial}`, undefined, undefined, undefined, undefined, undefined, false)
}

//-------------------------------------
//-------------subscription---------
function getSubscriptionsState(scope, id) {
    return api('get', `${userUrls.subscriptionState}?amazon_region_account_id=${id}&scopes[]=${scope}`, undefined, undefined, undefined, undefined, undefined, false)
}

function activateSubscription(data, id) {
    return api('post', `${userUrls.activateSubscription}?amazon_region_account_id=${id}`, data, undefined, undefined, undefined, undefined, false)
}

function retryPayment(data, id) {
    return api('post', `${userUrls.retryPayment}?amazon_region_account_id=${id}`, data, undefined, undefined, undefined, undefined, false)
}

function cancelSubscription(data, id) {
    return api('post', `${userUrls.cancelSubscription}?amazon_region_account_id=${id}`, data, undefined, undefined, undefined, undefined, false)
}

function getActivateInfo({scope, coupon, id}) {
    return api('get', `${userUrls.activateInfo}?amazon_region_account_id=${id}&scopes[]=${scope}${coupon ? `&coupon=${coupon}` : ''}`, undefined, undefined, undefined, undefined, undefined, false)
}

function getCouponInfo(coupon, id) {
    return api('get', `${userUrls.couponInfo}?amazon_region_account_id=${id}&coupon=${coupon}`, undefined, undefined, undefined, undefined, undefined, false)
}

function activateCoupon(data, id) {
    return api('post', `${userUrls.couponActivate}?amazon_region_account_id=${id}`, data, undefined, undefined, undefined, undefined, false)
}

//-------------------------------------

function toggleMarketplace(id) {
    return api('post', `${userUrls.toggleMarketplace(id)}`, undefined, undefined, undefined, undefined, undefined, false)
}

//-------------------------------------
function sendContactForm(data) {
    return api('post', `${userUrls.contactForm}`, {
        ...data,
        page_url: window.location.href
    }, undefined, undefined, undefined, undefined, false)
}

function getRegistrationTokens() {
    return api('get', `${userUrls.registrationTokens}`, undefined, undefined, undefined, undefined, undefined, false)
}

//-------------------------------------

function checkImportStatus(id) {
    return api('get', `${userUrls.importStatus}?amazon_region_account_marketplace_id=${id}`, undefined, undefined, undefined, undefined, undefined, false)
}

function getPPCConnectLink({callbackUrl, regionId}) {
    return api('get', `${userUrls.PPCConnectLink}?amazon_region_account_id=${regionId}&callback_redirect_uri=${callbackUrl}`, undefined, undefined, undefined, undefined, undefined, false)
}

function getMWSConnectLink(region) {
    return api('get', `${userUrls.MWSConnectLink}?region_type=${region}`, undefined, undefined, undefined, undefined, undefined, false)
}

function getAmazonRegionAccounts() {
    return api('get', `${userUrls.amazonRegionAccounts}`, undefined, undefined, undefined, undefined, undefined, false)
}

function createAmazonRegionAccount(data) {
    return api('post', `${userUrls.amazonRegionAccounts}`, data, undefined, undefined, undefined, undefined, false)
}

function attachAmazonAds(data) {
    return api('post', `${userUrls.adsCredentials}`, data, undefined, undefined, undefined, undefined, false)
}

function attachMWS(data) {
    return api('post', `${userUrls.mwsCredentials}`, data, undefined, undefined, undefined, undefined, false)
}

function unsetMWS(id) {
    return api('delete', `${userUrls.mwsCredentials}?amazon_region_account_id=${id}`, undefined, undefined, undefined, undefined, undefined, false)
}

function unsetAdsApi(id) {
    return api('delete', `${userUrls.adsCredentials}?amazon_region_account_id=${id}`, undefined, undefined, undefined, undefined, undefined, false)
}

function getAccountStatus(id) {
    return api('get', `${userUrls.accountStatus}?amazon_region_account_id=${id}`, undefined, undefined, undefined, undefined, undefined, false)
}

function updateAmazonAccount(data) {
    return api('put', `${userUrls.amazonRegionAccounts}`, data, undefined, undefined, undefined, undefined, false)
}

//-------------------------------------


function getIndexHtml() {
    return axios.get(`${baseUrl}/index.html`)
}


//-------------------------------------

function getNotifications() {
    return api('get', `${userUrls.notifications}`)
}

//-------------------------------------
function getStripeAvailableCountries() {
    return axios.get(`https://api.stripe.com/v1/country_specs?limit=100`, {
        headers: {'Authorization': `Bearer ${stripeKey}`}
    })
}

//-------------------------------------
function getBlogPosts() {
    return axios.get(`https://blog.profitwhales.com/wp-json/wp/v2/posts?per_page=3`)
}


