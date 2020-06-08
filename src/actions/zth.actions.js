import {zthConstants} from '../constans/actions.type';

export const zthActions = {
    setCampaign,
    setProductAmount,
    addProducts,
    removeProduct,
    setActiveProduct,
    updateActiveProduct,
    setInvalidField,
    setPaidBatch,
    clearSettings
};

function setCampaign(campaign) {
    return ({
        type: zthConstants.SET_CAMPAIGN,
        payload: campaign
    })
}

function setProductAmount(count) {
    return ({
        type: zthConstants.SET_PRODUCT_AMOUNT,
        payload: count
    })
}

function addProducts(products) {
    return ({
        type: zthConstants.ADD_PRODUCTS,
        payload: products
    })
}

function removeProduct(productIndex) {
    return ({
        type: zthConstants.REMOVE_PRODUCTS,
        payload: productIndex
    })
}

function setActiveProduct(productIndex) {
    return ({
        type: zthConstants.SET_ACTIVE_PRODUCT,
        payload: productIndex
    })
}

function updateActiveProduct(params) {
    return ({
        type: zthConstants.UPDATE_ACTIVE_PRODUCT,
        payload: params
    })
}

function setInvalidField(field) {
    return ({
        type: zthConstants.SET_INVALID_FIELD,
        payload: field
    })
}

function setPaidBatch(batch) {
    return ({
        type: zthConstants.SET_PAID_BATCH,
        payload: batch
    })
}

function clearSettings() {
    return ({
        type: zthConstants.CLEAR_SETTINGS,
    })
}
