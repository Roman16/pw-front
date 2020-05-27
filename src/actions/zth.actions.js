import {zthConstants} from '../constans/actions.type';

export const zthActions = {
    setCampaign,
    setProductAmount,
    addProducts,
    removeProduct
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
