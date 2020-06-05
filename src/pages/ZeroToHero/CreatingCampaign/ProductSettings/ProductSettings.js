import React, {useEffect, useState} from "react";
import './ProductSettings.less';
import ProductSlider from "./ProductSlider/ProductSlider";
import SetupSetting from "./SetupSetting/SetupSetting";
import BiddingStrategies from "./BiddingStrategies/BiddingStrategies";
import RelevantKeywords from "./RelevantKeywords/RelevantKeywords";
import NegativeKeywords from "./NegativeKeywords/NegativeKeywords";
import {useDispatch, useSelector} from "react-redux";
import {zthActions} from "../../../../actions/zth.actions";
import {history} from "../../../../utils/history";
import ToPaymentBar from "./ToPaymentBar/ToPaymentBar";
import {zthServices} from "../../../../services/zth.services";


const ProductSettings = () => {
    const [createProcessing, setProcessing] = useState(false),
        [portfolioList, setPortfolioList] = useState([]);

    const {addedProducts, activeProductIndex, productAmount, productsWithSettings} = useSelector(state => ({
        addedProducts: state.zth.selectedProducts,
        activeProductIndex: state.zth.activeProductIndex,
        productAmount: state.zth.productAmount,
        productsWithSettings: state.zth.selectedProductsWithSettingsParams,
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

    const goPaymentStep = async () => {
        setProcessing(true);

        try {
            const createdBatch = await zthServices.saveSettings({
                zth_tokens_count: productAmount,
                setup_settings: productsWithSettings
            });

            history.push(`/zero-to-hero/payment/${createdBatch.batch_id}`);
        } catch (e) {
            console.log(e)
        }
        setProcessing(false);
    };

    useEffect(() => {
        zthServices.getUserPortfolio()
            .then(res => {
                setPortfolioList(res.result)
            })
    }, [])

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
                    product={productsWithSettings[activeProductIndex]}
                    portfolioList={portfolioList}

                    onUpdate={updateProductHandler}
                />

                <BiddingStrategies
                    campaigns={productsWithSettings[activeProductIndex].campaigns}
                    onUpdate={updateProductHandler}
                />

                <RelevantKeywords
                    keywords={productsWithSettings[activeProductIndex].relevant_keywords}
                    onUpdate={updateProductHandler}
                />

                <NegativeKeywords
                    keywords={productsWithSettings[activeProductIndex].negative_keywords}
                    onUpdate={updateProductHandler}
                />

                <ToPaymentBar
                    processing={createProcessing}
                    productsCount={addedProducts.length}
                    productAmount={productAmount}
                    goPaymentStep={goPaymentStep}
                />
            </section>
        )
    } else {
        return '';
    }
};

export default React.memo(ProductSettings);
