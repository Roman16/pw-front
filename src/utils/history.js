import {createBrowserHistory} from 'history';
import React from "react";
import ReactDOM from "react-dom";
import ConfirmActionPopup from "../components/ModalWindow/ConfirmActionPopup";

const getUserConfirmation = (message, callback) => {
    const modal = document.createElement("div");
    document.body.appendChild(modal);

    const withCleanup = answer => {
        ReactDOM.unmountComponentAtNode(modal);
        document.body.removeChild(modal);
        callback(answer)
    };

    ReactDOM.render(
        <ConfirmActionPopup
            className={'confirm-remove-product-window'}
            visible={true}
            title={message === 'campaign-settings' ? 'Leave page?' : 'Are you sure you want to leave this page?'}
            description={message === 'campaign-settings' ? 'Changes you made are not saved and will be lost.' : 'You have made changes. They will be lost if you continue'}
            handleOk={() => withCleanup(true)}
            handleCancel={() => withCleanup(false)}
        />,
        modal
    )
};

export const history = createBrowserHistory({getUserConfirmation});

let prevLocation = {};
history.listen(location => {
    const pathChanged = prevLocation.pathname !== location.pathname;
    const hashChanged = prevLocation.hash !== location.hash;
    const userId = localStorage.getItem('userId');

    if (pathChanged || hashChanged) {
        window.scrollTo(0, 0);
        prevLocation = location;

        if (userId) {
            window.dataLayer.push({
                'uid': userId
            });
        }
    }
});