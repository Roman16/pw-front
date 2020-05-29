import React, {useState} from "react";
import './ProductSettings.less';
import ProductSlider from "./ProductSlider/ProductSlider";
import SetupSetting from "./SetupSetting/SetupSetting";
import BiddingStrategies from "./BiddingStrategies";
import RelevantKeywords from "./RelevantKeywords";
import NegativeKeywords from "./NegativeKeywords";
import {useSelector} from "react-redux";


const ProductSettings = () => {
    const [selectedProduct, setSelectedProduct] = useState(0);

    const {addedProducts} = useSelector(state => ({
        addedProducts: state.zth.selectedProducts
    }));

    const nextProductHandler = () => setSelectedProduct(prevState => prevState === addedProducts.length - 1 ? 0 : prevState + 1);

    const prevProductHandler = () => setSelectedProduct(prevState => prevState === 0 ? addedProducts.length - 1 : prevState - 1);

    if (addedProducts.length > 0) {
        return (
            <section className='product-settings'>
                <ProductSlider
                    product={addedProducts[selectedProduct]}
                    productsCount={addedProducts.length}
                    onNext={nextProductHandler}
                    onPrev={prevProductHandler}
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
