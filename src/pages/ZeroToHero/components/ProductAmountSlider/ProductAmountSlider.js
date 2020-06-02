import React from "react";
import {Input, Slider} from "antd";
import './ProductAmountSlider.less';
import {useDispatch, useSelector} from "react-redux";
import {zthActions} from "../../../../actions/zth.actions";
import {numberMask} from "../../../../utils/numberMask";

const priceRender = (count) => {
    if (count > 0 && count <= 5) {
        return (<span>$ 500</span>)
    } else if (count >= 6 && count <= 20) {
        return (<span>$ 400</span>)
    } else if (count >= 21 && count <= 50) {
        return (<span>$ 350</span>)
    } else if (count >= 51 && count <= 100) {
        return (<span>$ 300</span>)
    }
};

const saleRender = (count) => {
    if (count >= 6 && count <= 20) {
        return (<span>$ {numberMask(count * 500 * 0.2, 0)}</span>)
    } else if (count >= 21 && count <= 50) {
        return (<span>$ {numberMask(count * 500 * 0.3, 0)}</span>)
    } else if (count >= 51 && count <= 100) {
        return (<span>$ {numberMask(count * 500 * 0.4, 0)}</span>)
    }
};


const ProductAmountSlider = () => {
    const dispatch = useDispatch();

    const {productAmount, addedProducts} = useSelector(state => ({
        productAmount: state.zth.productAmount,
        addedProducts: state.zth.selectedProducts,
    }));

    function handleChangeSlider(value) {
        if (value < addedProducts.length) {
            dispatch(zthActions.setProductAmount(addedProducts.length));
        } else {
            dispatch(zthActions.setProductAmount(value));
        }
    }

    return (
        <section className='product-slider'>
            <div className="slider-block">
                <div className="col">
                    <div className="amount">
                        Product Amount

                        <div className="value form-group">
                            <Input
                                type={'number'}
                                value={productAmount}
                                onChange={(e) => handleChangeSlider(e.target.value)}
                                max={100}
                                min={addedProducts.length || 1}
                            />
                        </div>
                    </div>

                    <div className="description">
                        See the example of the campaigns <a target={'_blank'}
                                                            href="https://docs.google.com/spreadsheets/d/14FUMQKNV8-oqbd_XeyecVmZtMamY6qhi3GcHEEO0dFM/edit#gid=277769766">you’ll
                        get</a>
                    </div>

                    <p>
                        <span>*</span> All variations counts as one Product
                    </p>
                </div>

                <div className="slider">
                    <Slider
                        tooltipVisible={true}
                        marks={{1: '1', 25: '25', 50: '50', 75: '75', 100: '100'}}
                        value={productAmount}
                        onChange={handleChangeSlider}
                        min={1}
                        max={100}
                        tooltipPlacement={'top'}
                        getTooltipPopupContainer={triggerNode => triggerNode.parentNode}
                    />
                </div>

                <div className="row">
                    <div className="price">
                        <span className="value">{priceRender(productAmount)}</span>
                        Per product
                    </div>

                    <div className="save-label">
                        {productAmount > 5 && <>You save {saleRender(productAmount)}</>}
                    </div>
                </div>
            </div>
        </section>

    )
};

export default ProductAmountSlider;