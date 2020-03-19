import React from "react";
import {Modal, Checkbox} from 'antd';

const ConfirmActionPopup = ({title, description, visible, handleOk, handleCancel, checkboxText, handleChangeCheckbox}) => {
    return (
        <Modal
            title={title}
            className='confirm-action-modal'
            wrapClassName={'over-modal-wrap'}
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText='Yes'
            cancelText='No'
            okButtonProps={{
                'data-intercom-target': 'confirm-action-button'
            }}
        >
            {description}
            {checkboxText && visible && <div>
                <Checkbox onChange={handleChangeCheckbox}>{checkboxText}</Checkbox>
            </div>}
        </Modal>
    )
};

export default ConfirmActionPopup;
