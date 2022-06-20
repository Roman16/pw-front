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
    getUserInfo,
    setMWS,
    unsetMWS,
    unsetPPC,
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
    reactivateSubscription,
    subscribe,
    confirmPayment,
    updateSubscriptionStatus,
    applyCoupon,
    getSubscription,
    getCouponStatus,
    ebookOnSubscribe,
    onSubscribe,
    sendContacts,
    startFreeTrial,
    toggleMarketplace,

    getBlogPosts,
    sendContactForm,
    sendShortContactForm,
    sendFormToPartnerSupport,
    sendCustomerSatisfactionSurveyForm,
    sendGrowthAccelerationForm,

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
    attachAmazonAds
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
    return api('post', userUrls.resendEmail, undefined,undefined, undefined, undefined, undefined, false)
}

function confirmEmail({token}) {
    return api('post', `${userUrls.confirmEmail}/${token}`, {token}, undefined, undefined, undefined, undefined, false)
}

function getUserInfo() {
    return api('get', userUrls.allInfo)
}

function setMWS(data) {
    return api('post', userUrls.mws, data, undefined, undefined, undefined, undefined, false)
}

function unsetMWS(id) {
    return api('post', userUrls.deleteMws, id, undefined, undefined, undefined, undefined, false)
}

function unsetPPC(id) {
    return api('post', userUrls.deleteLwa, id, undefined, undefined, undefined, undefined, false)
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
function getSubscription() {
    return api('get', userUrls.subscriptionList, undefined, undefined, undefined, undefined, undefined, false)
}

function subscribe(data) {
    return api('post', userUrls.subscribe(data.subscription_id), data, undefined, undefined, undefined, undefined, false)
}

function reactivateSubscription(data) {
    return api('post', userUrls.reactivate(data.subscription_id), data, undefined, undefined, undefined, undefined, false)
}



function updateSubscriptionStatus() {
    return api('post', userUrls.updateStatus, undefined, undefined, undefined, undefined, undefined, false)
}

function applyCoupon(id, planId, coupon) {
    return api('post', `${userUrls.coupon(id)}?coupon_code=${coupon}&subscription_plan_id=${planId}`, undefined, undefined, undefined, undefined, undefined, false)
}

function getCouponStatus(coupon) {
    return api('post', `${userUrls.couponStatus}?coupon_code=${coupon}`, undefined, undefined, undefined, undefined, undefined, false)
}

function getSubscriptionsState(scope) {
    return api('get', `${userUrls.subscriptionState}?scopes[]=${scope}`, undefined, undefined, undefined, undefined, undefined, false)
}

function activateSubscription(data) {
    return api('post', userUrls.activateSubscription, data, undefined, undefined, undefined, undefined, false)
}

function retryPayment(data) {
    return api('post', userUrls.retryPayment, data, undefined, undefined, undefined, undefined, false)
}

function cancelSubscription(data) {
    return api('post', userUrls.cancelSubscription, data, undefined, undefined, undefined, undefined, false)
}

function getActivateInfo({scope, coupon}) {
    return api('get', `${userUrls.activateInfo}?scopes[]=${scope}${coupon ? `&coupon=${coupon}` : ''}`, undefined, undefined, undefined, undefined, undefined, false)
}

function getCouponInfo(coupon) {
    return api('get', `${userUrls.couponInfo}?coupon=${coupon}`, undefined, undefined, undefined, undefined, undefined, false)
}

function activateCoupon(data) {
    return api('post', `${userUrls.couponActivate}`, data, undefined, undefined, undefined, undefined, false)
}

function toggleMarketplace(id) {
    return api('post', `${userUrls.toggleMarketplace(id)}`, undefined, undefined, undefined, undefined, undefined, false)
}

//-------------------------------------
function ebookOnSubscribe(email) {
    return api('post', `${userUrls.ebookSubscribe}`, email, undefined, undefined, undefined, undefined, false)
}

function onSubscribe(email) {
    return api('post', `${userUrls.userSubscribe}`, email, undefined, undefined, undefined, undefined, false)
}

function sendContacts(data) {
    return api('post', `${userUrls.contacts}`, data, undefined, undefined, undefined, undefined, false)
}

function sendContactForm(data) {
    return api('post', `${userUrls.contactForm}`, {...data, page_url: window.location.href}, undefined, undefined, undefined, undefined, false)
}

function sendShortContactForm(data) {
    return api('post', `${userUrls.shortContactForm}`, {...data, page_url: window.location.href}, undefined, undefined, undefined, undefined, false)
}

function sendFormToPartnerSupport(data) {
    return api('post', `${userUrls.partnerContactForm}`, {...data, page_url: window.location.href}, undefined, undefined, undefined, undefined, false)
}

function sendCustomerSatisfactionSurveyForm(data) {
    return api('post', `${userUrls.customerSatisfactionSurveyForm}`, data, undefined, undefined, undefined, undefined, false)
}

function sendGrowthAccelerationForm(data) {
    return api('post', `${userUrls.growthAccelerationForm}`, data, undefined, undefined, undefined, undefined, false)
}

function getRegistrationTokens() {
    return api('get', `${userUrls.registrationTokens}`, undefined, undefined, undefined, undefined, undefined, false)
}

function checkImportStatus() {
    return api('get', `${userUrls.importStatus}`, undefined, undefined, undefined, undefined, undefined, false)
}

function getPPCConnectLink({callbackUrl, regionId}) {
    return api('get', `${userUrls.PPCConnectLink}?amazon_region_account_id=${regionId}&callback_redirect_uri=${callbackUrl}`, undefined, undefined, undefined, undefined, undefined, false)
}
function getMWSConnectLink() {
    return api('get', `${userUrls.MWSConnectLink}`, undefined, undefined, undefined, undefined, undefined, false)
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

function getIndexHtml() {
    return axios.get(`${baseUrl}/index.html`)
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


