import React from "react";
import ModalWindow from "../ModalWindow";
import {history} from "../../../utils/history";

const ReportsChangesCountWindow = ({visible, onClose, changesCount}) => {
    function handleOk() {
        onClose();

        if (window.location.pathname === '/ppc/report') {
            window.location.reload()
        } else {
            history.push('/ppc/report');
        }
    }

    return (
        <ModalWindow
            className={'reports-changes-window'}
            visible={visible}
            okText={'Check it now'}
            handleOk={handleOk}
            handleCancel={onClose}
        >
            <h3>Yay!</h3>
            While you were away the software <br/> performed: <b>{changesCount}</b> <span>changes</span>
        </ModalWindow>
    )
};

export default ReportsChangesCountWindow;
