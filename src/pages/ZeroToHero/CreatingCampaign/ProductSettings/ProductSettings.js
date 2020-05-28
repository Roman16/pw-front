import React, {useState} from "react";
import './ProductSettings.less';
import ProductSlider from "./ProductSlider/ProductSlider";
import SetupSetting from "./SetupSetting";
import BiddingStrategies from "./BiddingStrategies";
import RelevantKeywords from "./RelevantKeywords";
import NegativeKeywords from "./NegativeKeywords";
import {useSelector} from "react-redux";


const ProductSettings = () => {
    const {addedProducts} = useSelector(state => ({
        addedProducts: state.zth.selectedProducts
    }));

    if (addedProducts.length > 0) {
        return (
            <section className='product-settings'>
                <ProductSlider
                    product={addedProducts[0]}
                />

                <SetupSetting/>

                <BiddingStrategies/>

                <RelevantKeywords/>

                <NegativeKeywords/>
            </section>
        )
    } else {
        return '';
    }
};

export default ProductSettings;
