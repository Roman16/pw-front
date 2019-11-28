import React, {Fragment} from "react";
import {Modal} from "antd";

import './ModalWindow.less';

const ModalWindow = (props) => {
    const {visible, handleOk, handleCancel, className, okText, mask, footer} = props;

    return (
        <Modal
            className={`${className} custom-modal-window`}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={okText}
            mask={mask}
            footer={footer}
        >
            <Fragment>
                {props.children}
            </Fragment>
        </Modal>

    )
};

export default ModalWindow;