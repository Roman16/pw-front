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
    activateSubscription
}

function login(user) {
    return api('post', userUrls.login, user)
}

function logOut() {
    return api('post', userUrls.logOut)
}

function loginWithAmazon(user) {
    return api('post', userUrls.loginAmazon, user)
}

function regist(user) {
    return api('post', userUrls.regist, user)
}


function sendEmailForResetPassword(email) {
    return api('post', userUrls.resetEmail, email)
}

function checkResetToken({userId, token}) {
    return api('get', `${userUrls.checkToken}/${userId}/${token}`)
}

function changeUserPassword({userId, token, newPassword}) {
    return api('post', `${userUrls.resetPassword}/${userId}/${token}`, newPassword)
}

function resendConfirmEmail() {
    return api('post', userUrls.resendEmail)
}

function confirmEmail({token}) {
    return api('post', `${userUrls.confirmEmail}/${token}`, {token})
}

function getUserInfo() {
    return api('get', userUrls.allInfo)
}

function setMWS(data) {
    return api('post', userUrls.mws, data)
}

function unsetMWS(id) {
    return api('post', userUrls.deleteMws, id)
}

function unsetPPC(id) {
    return api('post', userUrls.deleteLwa, id)
}

function updateInformation({name, last_name, email, private_label_seller}) {
    return api('post', userUrls.personalInformation, {
        name,
        last_name,
        private_label_seller: private_label_seller ? 1 : 0
    })
}

function updatePhoto(data) {
    return api('post', userUrls.updatePhoto, data)
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
    return api('get', userUrls.companyInformation(cardId))
}

function updateCompanyInformation(cardId, company) {
    const data = company
    Object.keys(data).forEach((key) => (data[key] == null || data[key] === "") && delete data[key])
    return api('post', userUrls.companyInformation(cardId), data)
}

//-------------------------------------

//-------------------------------------
//-------------payment-----------------
function fetchBillingInformation() {
    return api('get', userUrls.paymentMethodList)
}

function addPaymentMethod(data) {
    return api('post', userUrls.addPaymentMethod, data)
}

function updatePaymentMethod(card) {
    const data = card
    Object.keys(data).forEach((key) => (data[key] == null || data[key] === "") && delete data[key])
    return api('post', userUrls.updatePaymentMethod(data.id), data)
}

function setDefaultPaymentMethod(id, cancelToken) {
    return api('post', userUrls.setDefaultPaymentMethod(id), undefined, undefined, cancelToken)
}

function deletePaymentMethod(id) {
    return api('post', userUrls.deletePaymentMethod(id))
}

function fetchBillingHistory({page, pageSize}) {
    return api('get', `${userUrls.paymentHistoryList}?page=${page}&size=${pageSize}`)
}

function confirmPayment(data) {
    return api('post', userUrls.confirm, data)
}

//-------------------------------
function startFreeTrial() {
    return api('post', `${userUrls.freeTrial}`)
}

//-------------------------------------
//-------------subscription---------
function getSubscription() {
    return api('get', userUrls.subscriptionList)
}

function subscribe(data) {
    return api('post', userUrls.subscribe(data.subscription_id), data)
}

function reactivateSubscription(data) {
    return api('post', userUrls.reactivate(data.subscription_id), data)
}



function updateSubscriptionStatus() {
    return api('post', userUrls.updateStatus)
}

function applyCoupon(id, planId, coupon) {
    return api('post', `${userUrls.coupon(id)}?coupon_code=${coupon}&subscription_plan_id=${planId}`)
}

function getCouponStatus(coupon) {
    return api('post', `${userUrls.couponStatus}?coupon_code=${coupon}`)
}

function getSubscriptionsState(scope) {
    return api('get', `${userUrls.subscriptionState}?scopes[]=${scope}`)
}

function activateSubscription(data) {
    return api('post', userUrls.activateSubscription, data)
}
function cancelSubscription(data) {
    return api('post', userUrls.cancelSubscription, data)
}

function getActivateInfo(scope) {
    return api('get', `${userUrls.activateInfo}?scopes[]=${scope}`)
}

function getCouponInfo(coupon) {
    return api('get', `${userUrls.couponInfo}?coupon=${coupon}`)
}

function activateCoupon({coupon, scope}) {
    return api('get', `${userUrls.couponActivate}?coupon=${coupon}&scope=${scope}`)
}

function toggleMarketplace(id) {
    return api('post', `${userUrls.toggleMarketplace(id)}`)
}

//-------------------------------------
function ebookOnSubscribe(email) {
    return api('post', `${userUrls.ebookSubscribe}`, email)
}

function onSubscribe(email) {
    return api('post', `${userUrls.userSubscribe}`, email)
}

function sendContacts(data) {
    return api('post', `${userUrls.contacts}`, data)
}

function sendContactForm(data) {
    return api('post', `${userUrls.contactForm}`, {...data, page_url: window.location.href})
}

function sendShortContactForm(data) {
    return api('post', `${userUrls.shortContactForm}`, {...data, page_url: window.location.href})
}

function sendFormToPartnerSupport(data) {
    return api('post', `${userUrls.partnerContactForm}`, {...data, page_url: window.location.href})
}

function sendCustomerSatisfactionSurveyForm(data) {
    return api('post', `${userUrls.customerSatisfactionSurveyForm}`, data)
}

function sendGrowthAccelerationForm(data) {
    return api('post', `${userUrls.growthAccelerationForm}`, data)
}

function getRegistrationTokens() {
    return api('get', `${userUrls.registrationTokens}`)
}

function checkImportStatus() {
    return api('get', `${userUrls.importStatus}`)
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


