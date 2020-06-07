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
import {notification} from "../../../../components/Notification";


const ProductSettings = () => {
    const [createProcessing, setProcessing] = useState(false),
        [portfolioList, setPortfolioList] = useState([]);

    const {addedProducts, activeProductIndex, productAmount, productsWithSettings, invalidField} = useSelector(state => ({
        addedProducts: state.zth.selectedProducts,
        activeProductIndex: state.zth.activeProductIndex,
        productAmount: state.zth.productAmount,
        productsWithSettings: state.zth.selectedProductsWithSettingsParams,
        invalidField: state.zth.invalidField.field,
    }));

    const dispatch = useDispatch();


    const nextProductHandler = () => {
        dispatch(zthActions.setActiveProduct(activeProductIndex === addedProducts.length - 1 ? 0 : activeProductIndex + 1));
    };

    const prevProductHandler = () => {
        dispatch(zthActions.setActiveProduct(activeProductIndex === 0 ? addedProducts.length - 1 : activeProductIndex - 1));
    };

    const updateProductHandler = (params, isInvalid) => {
        dispatch(zthActions.updateActiveProduct(params));

        if (isInvalid) {
            dispatch(zthActions.setInvalidField({
                productIndex: null,
                field: ''
            }));
        }
    };

    const saveBatchHandler = async () => {
        setProcessing(true);

        const submit = async () => {
            try {
                const createdBatch = await zthServices.saveSettings({
                    zth_tokens_count: productAmount,
                    setup_settings: productsWithSettings.map(product => ({
                        ...product,
                        portfolio: {
                            no_portfolio: product.portfolio.portfolioType === 'no-portfolio',
                            ...product.portfolio.portfolioType === 'create' ? {name: product.portfolio.name} : {id: product.portfolio.id}
                        }
                    }))
                });

                history.push(`/zero-to-hero/payment/${createdBatch.result.batch_id}`);
            } catch (e) {
                console.log(e)
            }
        };

        let BreakException = {};

        try {
            productsWithSettings.forEach((product, index) => {
                const setField = (field) => {
                    dispatch(zthActions.setInvalidField({
                        productIndex: index,
                        field: field
                    }));

                    field === invalidField && document.querySelector('.error-field').scrollIntoView({
                        block: "center",
                        behavior: "smooth"
                    });
                    throw BreakException;
                };

                if (product.portfolio.portfolioType === 'create' && (!product.portfolio.name || product.portfolio.name === '')) {
                    notification.error({title: 'Please enter the portfolio name'});
                    setField('portfolioName');
                } else if (product.portfolio.portfolioType === 'select' && (!product.portfolio.id)) {
                    notification.error({title: 'Please select the existing portfolio'});
                    setField('portfolioId');
                } else if (!product.campaigns.daily_budget) {
                    notification.error({title: 'Please enter your daily budged'});
                    setField('dailyBudget');
                } else if (!product.campaigns.default_bid) {
                    notification.error({title: 'Please enter your default bid'});
                    setField('defaultBid');
                } else if (product.campaigns.main_keywords.length < 3) {
                    notification.error({title: 'Please enter at least 3 main keywords'});
                    setField('mainKeywords');
                } else if (!product.brand.name) {
                    notification.error({title: 'Please enter your Brand Name'});
                    setField('brandName');
                } else if (product.brand.competitor_brand_names.length === 0) {
                    notification.error({title: 'Please enter your competitors names'});
                    setField('brandCompetitorsNames');
                } else {
                    submit()
                }
            });
        } catch (e) {
            if (e !== BreakException) throw e;
        }

        setProcessing(false);
    };

    useEffect(() => {
        zthServices.getUserPortfolio()
            .then(res => {
                setPortfolioList(res.result)
            })
    }, []);

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
                    invalidField={invalidField}

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
                    goPaymentStep={saveBatchHandler}
                />
            </section>
        )
    } else {
        return '';
    }
};

export default React.memo(ProductSettings);
