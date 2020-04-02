import {createBrowserHistory} from 'history';
import React from "react";
import ReactDOM from "react-dom";
import ModalWindow from "../components/ModalWindow/ModalWindow";
import RescanWindow from "../pages/PPCAutomate/Scanner/ModalWindows/RescanWindow";

const getUserConfirmation = (message, callback) => {
    const modal = document.createElement("div");
    document.body.appendChild(modal);

    const withCleanup = answer => {
        ReactDOM.unmountComponentAtNode(modal);
        document.body.removeChild(modal);
        callback(answer)
    };

    ReactDOM.render(
        <ModalWindow
            className={'scanner-window'}
            mask={true}
            footer={null}
            visible={true}
            handleCancel={() => withCleanup(false)}
        >
            <RescanWindow
                onClose={() => withCleanup(false)}
                onConfirm={() => withCleanup(true)}
            />
        </ModalWindow>,
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
        if (userId) {
            window.dataLayer.push = ({
                'uid': userId
            });
        }

        window.Intercom("update");
        window.scrollTo(0, 0);
        prevLocation = location;
    }

});