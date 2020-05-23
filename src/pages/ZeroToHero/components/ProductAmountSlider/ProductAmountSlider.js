import React, {useState, useEffect} from "react";
import {Slider} from "antd";
import './ProductAmountSlider.less';
import {useDispatch, useSelector} from "react-redux";
import {zthActions} from "../../../../actions/zth.actions";

let timerId = null;

const ProductAmountSlider = () => {
    const dispatch = useDispatch();

    const {productAmount} = useSelector(state => ({
        productAmount: state.zth.productAmount
    }));

    const [productCount, setCount] = useState(productAmount),
        [sliderValue, setValue] = useState(productAmount);

    function handleChangeInput({target: {value}}) {
        if (value > 100) {
            setCount(+value);
            setValue(100);
        } else {
            setCount(+value);
            setValue(+value);
        }
    }

    function handleChangeSlider(value) {
        setCount(value);
        setValue(value);
    }

    useEffect(() => {
        clearTimeout(timerId);

        timerId = setTimeout(() => {
            dispatch(zthActions.setProductAmount(productCount));
        }, 500)
    }, [productCount]);

    return (
        <section className='product-slider'>
            <div className="slider-block">
                <div className="col">
                    <div className="amount">
                        Product Amount
                        <input
                            value={productCount}
                            onChange={handleChangeInput}
                        />
                    </div>

                    <div className="description">
                        See the example of the campaigns <a href="#">you’ll get</a>
                    </div>
                </div>

                <div className="slider">
                    <Slider
                        value={sliderValue}
                        onChange={handleChangeSlider}
                        min={1}
                        max={100}
                        tooltipVisible={false}
                    />
                </div>

                <div className="col">
                    <div className="save-label">
                        You save $32
                    </div>

                    <div className="price">
                        <span className="value">$ 99</span>
                        Per product
                    </div>
                </div>
            </div>

        </section>

    )
};

export default ProductAmountSlider;