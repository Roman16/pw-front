import React, { useState } from 'react';
import { func, bool } from 'prop-types';
import { Modal } from 'antd';
import Button from '../../../../../components/Buttons';
import { InputCurrency } from '../../../../../components/Inputs';
import Warning from '../../../../../assets/img/icons/warning.svg';
import './NetMargin.less';

const errorText = 'net margin should be more than 0';

const NetMargin = ({ isShowModal = true, onStart, handleCancel }) => {
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
            <div className="NetMargin">

                <div className="net-margin-content">
                    <div className="net-margin-header">
                        <img src={Warning} alt="warning" />
                        <h2>Attention!</h2>
                        <p>We need your Product Net Margin to start the optimization.</p>
                    </div>
                    <div className="product-net-margin">
                        <span>Product Net Margin</span>
                        <InputCurrency
                            value={value}
                            onChange={onChange}
                            isError={isError}
                            errorText={errorText}
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

NetMargin.propTypes = {
    onStart: func,
    handleCancel: func,
    isShowModal: bool,
};

NetMargin.defaultProps = {
    onStart: () => {
    },
    handleCancel: () => {
    },
    isShowModal: true,


};

export default NetMargin;
