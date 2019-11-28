import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import ModalWindow from "./ModalWindow";
import {history} from "../../utils/history";

const ReportsChangesCountWindow = () => {
    const [visibleWindow, switchWindow] = useState(false);
    const {ppcNotification} = useSelector(state => ({
        ppcNotification: state.user.notifications ? state.user.notifications.ppc_optimization : {}
    }));

    function handleOk() {
        history.push('/ppc/report');
        switchWindow(false);
    }

    useEffect(() => {
        if (ppcNotification.count_from_last_login > 0) {
            switchWindow(true)
        }
    }, [ppcNotification]);

    console.log(ppcNotification);

    return (
        <ModalWindow
            className={'reports-changes-window'}
            visible={visibleWindow}
            okText={'Check it now'}
            handleOk={handleOk}
            handleCancel={() => switchWindow(false)}
        >
            Yay! While you where away the software performed <b>{ppcNotification && ppcNotification.count_from_last_login}</b> changes on your ad campaigns.
        </ModalWindow>
    )
};

export default ReportsChangesCountWindow;