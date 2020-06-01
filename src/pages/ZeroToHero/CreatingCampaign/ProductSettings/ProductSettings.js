import React, {useState} from "react";
import './ProductSettings.less';
import ProductSlider from "./ProductSlider/ProductSlider";
import SetupSetting from "./SetupSetting/SetupSetting";
import BiddingStrategies from "./BiddingStrategies/BiddingStrategies";
import RelevantKeywords from "./RelevantKeywords/RelevantKeywords";
import NegativeKeywords from "./NegativeKeywords/NegativeKeywords";
import {useDispatch, useSelector} from "react-redux";
import {zthActions} from "../../../../actions/zth.actions";
import {history} from "../../../../utils/history";


const ProductSettings = () => {
    const {addedProducts, activeProductIndex} = useSelector(state => ({
        addedProducts: state.zth.selectedProducts,
        activeProductIndex: state.zth.activeProductIndex,
    }));

    const dispatch = useDispatch();


    const nextProductHandler = () => {
        dispatch(zthActions.setActiveProduct(activeProductIndex === addedProducts.length - 1 ? 0 : activeProductIndex + 1));
    };

    const prevProductHandler = () => {
        dispatch(zthActions.setActiveProduct(activeProductIndex === 0 ? addedProducts.length - 1 : activeProductIndex - 1));
    };

    const updateProductHandler = (params) => {
        dispatch(zthActions.updateActiveProduct(params))
    };

    const goPaymentStep = () => {
        history.push('/zero-to-hero/payment')
    };

    if (addedProducts.length > 0) {
        return (
            <section className='product-settings'>
                <ProductSlider
                    product={addedProducts[activeProductIndex]}
                    productsCount={addedProducts.length}
                    onNext={nextProductHandler}
                    onPrev={prevProductHandler}
                />

                <SetupSetting
                    product={addedProducts[activeProductIndex]}
                    onUpdate={updateProductHandler}
                />

                <BiddingStrategies/>

                <RelevantKeywords/>

                <NegativeKeywords/>

                <div className="next-step">
                    <p> Campaign type: <b>Sponsored Products</b></p>

                    <button className={'btn green-btn'} onClick={goPaymentStep}>Proceed to payment</button>
                </div>
            </section>
        )
    } else {
        return '';
    }
};

export default ProductSettings;
