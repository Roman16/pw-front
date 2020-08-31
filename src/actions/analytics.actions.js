import {analyticsConstants} from '../constans/actions.type';

export const analyticsActions = {
    setMainState,
};

function setMainState(state) {
    return dispatch => {
        dispatch({
            type: analyticsConstants.SET_MAIN_STATE,
            payload: state
        });
    };
}