import React, {useState, useEffect} from "react";
import {Input, Slider} from "antd";
import './ProductAmountSlider.less';
import {useDispatch, useSelector} from "react-redux";
import {zthActions} from "../../../../actions/zth.actions";

let timerId = null;

const ProductAmountSlider = () => {
    const dispatch = useDispatch();

    const {productAmount, addedProducts} = useSelector(state => ({
        productAmount: state.zth.productAmount,
        addedProducts: state.zth.selectedProducts,
    }));

    const [productCount, setCount] = useState(productAmount),
        [sliderValue, setValue] = useState(productAmount);

    function handleChangeSlider(value) {
        if (value < addedProducts.length) {
            setCount(addedProducts.length);
            setValue(addedProducts.length);
        } else {
            setCount(value);
            setValue(value);
        }
    }

    useEffect(() => {
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            dispatch(zthActions.setProductAmount(productCount));
        }, 10)
    }, [productCount]);

    return (
        <section className='product-slider'>
            <div className="slider-block">
                <div className="col">
                    <div className="amount">
                        Product Amount

                        <div className="value form-group">
                            <Input
                                type={'number'}
                                value={productCount}
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
                        value={sliderValue}
                        onChange={handleChangeSlider}
                        min={1}
                        max={100}
                        tooltipPlacement={'top'}
                        getTooltipPopupContainer={triggerNode => triggerNode.parentNode}
                    />
                </div>

                <div className="row">
                    <div className="price">
                        <span className="value">$ 99</span>
                        Per product
                    </div>

                    <div className="save-label">
                        You save <span> $32</span>
                    </div>
                </div>
            </div>
        </section>

    )
};

export default ProductAmountSlider;