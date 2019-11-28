import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import ModalWindow from "./ModalWindow";
import {history} from "../../utils/history";
import whales from '../../assets/img/whales.svg';

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

    return (
        <ModalWindow
            className={'reports-changes-window'}
            visible={visibleWindow}
            okText={'Check it now'}
            handleOk={handleOk}
            handleCancel={() => switchWindow(false)}
        >
            {/*<img src={whales} alt=""/>*/}
            <h3>Yay 👋  </h3>
            While you where away the software performed <b>{ppcNotification && ppcNotification.count_from_last_login}</b> changes on your ad campaigns.
        </ModalWindow>
    )
};

export default ReportsChangesCountWindow;