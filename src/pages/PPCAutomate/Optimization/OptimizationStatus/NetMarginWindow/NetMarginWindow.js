import React, { useState } from 'react';
import { func, bool } from 'prop-types';
import { Modal, Button, Input } from 'antd';

import Warning from '../../../../../assets/img/icons/warning.svg';

import './NetMarginWindow.less';

const errorText = 'net margin should be more than 0';

const Dollar = () => (
    <span className="dollar">$</span>
);

const NetMarginWindow = ({ isShowModal = true, onStart, handleCancel }) => {
    const [value, setValue] = useState(0);
    const [isError, setError] = useState(false);

    const onChange = ({ target: { value } }) => {
        setValue(+value);
        setError(+value === 0);
    };

    const submit = () => {
        if (value > 0) {
            onStart(value);
        } else {
            setError(true);
        }
    };

    return (
        <Modal
            visible={isShowModal}
            onCancel={handleCancel}

            footer={null}
        >
            <div className="net-margin">
                <div className="net-margin-content">
                    <div className="net-margin-header">
                        <img src={Warning} alt="warning" />
                        <h2>Attention!</h2>
                        <p>We need your Product Net Margin to start the optimization.</p>
                    </div>
                    <div className="product-net-margin">
                        <span>Product Net Margin</span>

                        <Input
                            prefix={<Dollar />}
                            value={value}
                            type="number"
                            onChange={onChange}
                        />
                    </div>
                    <Button className="start" onClick={submit}> Start </Button>

                </div>
                <div className="net-margin-footer">
                    If you want to set Product Net Margin for all your products go to
                    Products Settings
                </div>
            </div>
        </Modal>

    );
};

NetMarginWindow.propTypes = {
    onStart: func,
    handleCancel: func,
    isShowModal: bool,
};

NetMarginWindow.defaultProps = {
    onStart: () => {
    },
    handleCancel: () => {
    },
    isShowModal: false,


};

export default NetMarginWindow;
