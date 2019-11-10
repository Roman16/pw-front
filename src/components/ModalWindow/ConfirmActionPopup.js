import React from "react";
import {Modal} from 'antd';

const ConfirmActionPopup = ({title, description, visible, handleOk, handleCancel}) => {
    return (
        <Modal
            title={title}
            className='confirm-action-modal'
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText='Yes'
            cancelText='No'
        >
            {description}
        </Modal>
    )
};

export default ConfirmActionPopup;