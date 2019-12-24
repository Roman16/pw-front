import React from "react";
import {Modal, Checkbox} from 'antd';

const ConfirmActionPopup = ({title, description, visible, handleOk, handleCancel, checkboxText, handleChangeCheckbox}) => {
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
            {checkboxText && <div>
                <Checkbox onChange={handleChangeCheckbox}>{checkboxText}</Checkbox>
            </div>}
        </Modal>
    )
};

export default ConfirmActionPopup;