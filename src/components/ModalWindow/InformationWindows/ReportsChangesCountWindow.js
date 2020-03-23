import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import ModalWindow from "../ModalWindow";
import {history} from "../../../utils/history";
import {userActions} from "../../../actions/user.actions";
import unicornEmoji from '../../../assets/img/unicorn-emoji.png';

const ReportsChangesCountWindow = () => {
    const [visibleWindow, switchWindow] = useState(false);
    const [changesCount, setCount] = useState(0);
    const [changesDate, setDate] = useState(0);
    const dispatch = useDispatch();
    const {ppcNotification, subscribedProduct} = useSelector(state => ({
        ppcNotification: state.user.notifications ? state.user.notifications.ppc_optimization : {},
        subscribedProduct: state.user.subscriptions ? state.user.subscriptions[Object.keys(state.user.subscriptions)[0]] : null,
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
        if (ppcNotification.count_from_last_login > 0 && subscribedProduct.has_access) {
            switchWindow(true);
            setCount(ppcNotification.count_from_last_login);
            setDate(ppcNotification.last_notice_date);
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
            <h3>Yay <img src={unicornEmoji} alt=""/></h3>
            While you were away <br/> the software performed <b>{changesCount}</b> <span>changes</span>
             {/*{moment.duration(changesDate, "days").humanize()}*/}
        </ModalWindow>
    )
};

export default ReportsChangesCountWindow;
