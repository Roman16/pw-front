import React, {useState, Fragment} from 'react';
import {func, bool} from 'prop-types';
import {Modal, Button, Input} from 'antd';
import {Link} from 'react-router-dom';

import Warning from '../../../../../assets/img/icons/warning.svg';

import './NetMarginWindow.less';
import {useDispatch, useSelector} from "react-redux";
import {productsActions} from "../../../../../actions/products.actions";

const errorText = 'net margin should be more than 0';

const Dollar = () => (
    <span className="dollar">$</span>
);

const NetMarginWindow = ({isShowModal = false, handleCancel, selectedAll}) => {
    const [value, setValue] = useState(0);
    const [isError, setError] = useState(false);

    const dispatch = useDispatch();
    const {product, options} = useSelector(state => ({
        product: state.products.selectedProduct,
        options: state.products.defaultOptimizationOptions
    }));

    const onChange = ({target: {value}}) => {
        setValue(+value);
        setError(+value === 0);
    };

    const submit = () => {
        if (value > 0) {
            dispatch(productsActions.updateProduct({
                ...product,
                ...options,
                product_id: product.id,
                product_margin: value,
                status: 'RUNNING'
            }));
            handleCancel()
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
                        <img src={Warning} alt="warning"/>
                        <h2>Attention!</h2>
                        <p>We need your Product Net Margin to start the optimization.</p>
                    </div>
                    {selectedAll ?
                        <Button className="start" onClick={handleCancel}>
                            <Link to='/ppc/product-settings'>Go to Product Settings</Link>
                        </Button>
                        :
                        <Fragment>
                            <div className="product-net-margin">
                                <span>Product Net Margin</span>

                                <Input
                                    prefix={<Dollar/>}
                                    value={value}
                                    type="number"
                                    onChange={onChange}
                                />
                            </div>

                            <Button className="start" onClick={submit}> Start </Button>
                        </Fragment>
                    }
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
    handleCancel: func,
    isShowModal: bool,
};

export default NetMarginWindow;
