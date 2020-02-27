import React, {useState, Fragment} from 'react';
import {func, bool} from 'prop-types';
import {Modal, Button, Input} from 'antd';
import {Link} from 'react-router-dom';
import Warning from '../../../../assets/img/icons/warning.svg';

import './NetMarginWindow.less';
import {useDispatch, useSelector} from "react-redux";
import {productsActions} from "../../../../actions/products.actions";
import {productsServices} from "../../../../services/products.services";
import ModalWindow from "../../../../components/ModalWindow/ModalWindow";
import InputCurrency from "../../../../components/Inputs/InputCurrency";

const errorText = 'net margin should be more than 0';

const Dollar = () => (
    <span className="dollar">%</span>
);

const NetMarginWindow = ({isShowModal = false, handleCancel, selectedAll, handleOk}) => {
    const [value, setValue] = useState(0);
    const [isError, setError] = useState(false);

    const dispatch = useDispatch();
    const {product, options} = useSelector(state => ({
        product: state.products.selectedProduct,
        options: state.products.defaultOptimizationOptions
    }));

    const onChange = (value) => {
        if(value > 100) {
            setValue(100);
        } else {
            setValue(+value);
        }
    };

    const submit = async () => {
        if (value > 0) {
            await productsServices.updateProductSettings({
                product_id: product.id,
                product_margin_value: value
            });

            dispatch(productsActions.updateProduct({
                ...product,
                ...options,
                product_id: product.id,
                product_margin: true,
                product_margin_value: value,
                status: 'RUNNING'
            }));

            handleCancel();
        } else {
            setError(true);
        }
    };

    return (
        <ModalWindow
            visible={isShowModal}
            handleCancel={handleCancel}
            className={'net-margin-window'}
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

                                <InputCurrency
                                    value={value}
                                    max={100}
                                    min={0}
                                    typeIcon='margin'
                                    onChange={onChange}
                                />
                            </div>

                            <button className="btn default start" onClick={submit}> Start </button>
                        </Fragment>
                    }
                </div>

                <div className="net-margin-footer">
                    If you want to set Product Net Margin for all your products go to
                    Products Settings
                </div>
                <br/>
            </div>
        </ModalWindow>

    );
};

NetMarginWindow.propTypes = {
    handleCancel: func,
    isShowModal: bool,
};

export default NetMarginWindow;
