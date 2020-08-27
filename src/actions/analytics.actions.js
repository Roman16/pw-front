import {dashboardConstants} from '../constans/actions.type';

export const analyticsActions = {
    setProductsMarginStatus,
};

function setProductsMarginStatus(status) {
    return dispatch => {
        dispatch({
            type: dashboardConstants.SET_PRODUCTS_MARGIN_STATUS,
            payload: status
        });
    };
}