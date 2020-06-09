import React from "react";
import {Modal, Checkbox} from 'antd';

const ConfirmActionPopup = ({title, description, visible, handleOk, handleCancel, checkboxText, handleChangeCheckbox, className, okText='Yes', cancelText='No'}) => {
    return (
        <Modal
            title={title}
            className='confirm-action-modal'
            wrapClassName={`over-modal-wrap ${className}`}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={okText}
            cancelText={cancelText}
            okButtonProps={{
                'data-intercom-target': 'confirm-action-button'
            }}
        >
            <p>{description}</p>
            {checkboxText && visible && <div>
                <Checkbox onChange={handleChangeCheckbox}>{checkboxText}</Checkbox>
            </div>}
        </Modal>
    )
};

export default ConfirmActionPopup;
