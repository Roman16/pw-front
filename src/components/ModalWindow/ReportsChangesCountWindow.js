import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import ModalWindow from "./ModalWindow";
import {history} from "../../utils/history";
import whales from '../../assets/img/whales.svg';
import {userActions} from "../../actions/user.actions";

const ReportsChangesCountWindow = () => {
    const [visibleWindow, switchWindow] = useState(false);
    const [changesCount, setCount] = useState(0);
    const dispatch = useDispatch();
    const {ppcNotification} = useSelector(state => ({
        ppcNotification: state.user.notifications ? state.user.notifications.ppc_optimization : {}
    }));

    function handleOk() {
        switchWindow(false);
        setCount(0);
        dispatch(userActions.resetChangesCount('ppc_optimization'));
        history.push('/ppc/report');
    }

    function handleCancel() {
        switchWindow(false);
        setCount(0);
        dispatch(userActions.resetChangesCount('ppc_optimization'))
    }

    useEffect(() => {
        if (ppcNotification.count_from_last_login > 0) {
            switchWindow(true);
            setCount(ppcNotification.count_from_last_login)
        }
    }, [ppcNotification]);

    return (
        <ModalWindow
            className={'reports-changes-window'}
            visible={visibleWindow}
            okText={'Check it now'}
            handleOk={handleOk}
            handleCancel={handleCancel}
        >
            {/*<img src={whales} alt=""/>*/}
            <h3>Yay 👋  </h3>
            While you where away the software performed <b>{changesCount}</b> changes on your ad campaigns.
        </ModalWindow>
    )
};

export default ReportsChangesCountWindow;