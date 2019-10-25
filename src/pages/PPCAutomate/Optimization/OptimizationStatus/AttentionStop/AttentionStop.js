import React from 'react';
import { func, bool } from 'prop-types';
import { Modal, Button } from 'antd';

import Warning from '../../../../../assets/img/icons/warning.svg';

import './AttentionStop.less';
import { useSelector } from 'react-redux';

const AttentionStop = ({
    isShowModal = false,
    handleCancel,
    selectedAll,
    onSwitchOptimization
}) => {
    const { product } = useSelector(state => ({
        product: state.products.selectedProduct
    }));

    const submit = () => {
        selectedAll
            ? onSwitchOptimization({
                  ...product,
                  product_id: 'all',
                  status: 'STOPPED'
              })
            : onSwitchOptimization({
                  ...product,
                  status: 'STOPPED'
              });
        handleCancel();
    };

    const closeModal = () => {
        handleCancel();
    };

    return (
        <Modal visible={isShowModal} onCancel={handleCancel} footer={null}>
            <div className="net-margin">
                <div className="net-margin-content">
                    <div className="net-margin-header">
                        <img src={Warning} alt="warning" />
                        <h2>Attention!</h2>
                        <p>
                            We need your Product Net Margin to start the
                            optimization.
                        </p>
                    </div>
                    <div className="box-button">
                        <Button onClick={submit}>Stop</Button>

                        <Button onClick={closeModal}>Continue</Button>
                    </div>
                </div>

                <div className="net-margin-footer">
                    If you want to set Product Net Margin for all your products
                    go to Products Settings
                </div>
            </div>
        </Modal>
    );
};

AttentionStop.propTypes = {
    handleCancel: func,
    isShowModal: bool
};

export default AttentionStop;
