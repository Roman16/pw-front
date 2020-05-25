import React, {useState, Fragment} from 'react';
import {func, bool} from 'prop-types';
import {Button} from 'antd';
import {Link} from 'react-router-dom';

import './NetMarginWindow.less';
import {useSelector} from "react-redux";
import {productsServices} from "../../../../services/products.services";
import ModalWindow from "../../../../components/ModalWindow/ModalWindow";
import InputCurrency from "../../../../components/Inputs/InputCurrency";
import {SVG} from "../../../../utils/icons";


const NetMarginWindow = ({isShowModal = false, handleCancel, selectedAll, handleOk, itemPrice, itemPriceFromUser, productMargin}) => {
    const [netMarginValue, setNetMarginValue] = useState(0),
        [priceValue, setPriceValue] = useState(0);
    const [isError, setError] = useState(false);

    const {product} = useSelector(state => ({
        product: state.products.selectedProduct,
    }));

    const onChange = (value, field) => {
        if (field === 'margin' && value > 100) {
            setNetMarginValue(100);
        } else if (field === 'margin') {
            setNetMarginValue(+value);
        } else if (field === 'price') {
            setPriceValue(+value)
        }
    };

    const submit = async () => {
        if (!productMargin && (!itemPrice || !itemPriceFromUser)) {
            await productsServices.updateProductSettings({
                id: product.id,
                product_margin_value: netMarginValue,
                item_price_from_user: priceValue
            });

            handleOk(netMarginValue);
        } else if (!productMargin) {
            await productsServices.updateProductSettings({
                id: product.id,
                product_margin_value: netMarginValue
            });

            handleOk(netMarginValue);
        } else if (!itemPrice || !itemPriceFromUser) {
            await productsServices.updateProductSettings({
                id: product.id,
                item_price_from_user: priceValue
            });

            handleOk(productMargin);
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
                        <SVG id='warning'/>
                        <h2>Attention!</h2>
                        <p>We need
                            your {!productMargin && 'Product Net Margin '} {!productMargin && (!itemPrice || !itemPriceFromUser) && 'and '} {(!itemPrice || !itemPriceFromUser) && 'Product Price '} to
                            start the optimization.</p>
                    </div>
                    {selectedAll ?
                        <Button className="start" onClick={handleCancel}>
                            <Link to='/ppc/product-settings'>Go to Product Settings</Link>
                        </Button>
                        :
                        <Fragment>
                            {!productMargin && <div className="product-net-margin">
                                <span>Product Net Margin</span>

                                <InputCurrency
                                    value={netMarginValue}
                                    max={100}
                                    min={0}
                                    typeIcon='percent'
                                    onChange={(e) => onChange(e, 'margin')}
                                />
                            </div>}

                            {(!itemPrice || !itemPriceFromUser) && <div className="product-net-margin">
                                <span>Product Price</span>

                                <InputCurrency
                                    value={priceValue}
                                    min={0}
                                    onChange={(e) => onChange(e, 'price')}
                                />
                            </div>}
                            <button className="btn default start" onClick={submit}> Start</button>
                        </Fragment>
                    }
                </div>

                <div className="net-margin-footer">
                    If you want to set Product Net Margin or Product Price for all your products go to
                    <Link to={'/ppc/product-settings'} target={'_blank'}> Products Settings</Link>
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
