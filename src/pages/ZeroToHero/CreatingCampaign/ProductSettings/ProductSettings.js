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
import {Prompt} from 'react-router-dom';
import ConfirmActionPopup from "../../../../components/ModalWindow/ConfirmActionPopup";


const ProductSettings = () => {
    const [createProcessing, setProcessing] = useState(false),
        [portfolioList, setPortfolioList] = useState([]),
        [promptState, setPromptState] = useState(false),
        [visibleConfirmWindow, setVisibleConfirmWindow] = useState(false);

    const {addedProducts, activeProductIndex, productAmount, productsWithSettings, invalidField, paidBatch} = useSelector(state => ({
        addedProducts: state.zth.selectedProducts,
        activeProductIndex: state.zth.activeProductIndex,
        productAmount: state.zth.productAmount,
        productsWithSettings: state.zth.selectedProductsWithSettingsParams,
        invalidField: state.zth.invalidField.field,
        paidBatch: state.zth.paidBatch
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

        let BreakException = {};

        const submit = async () => {

            const setupSettingsFilter = (arr) => {
                return arr.map(product => ({
                    ...product,
                    portfolio: {
                        type: product.portfolio.type,
                        enum: product.portfolio.type === 'NoPortfolio',
                        ...product.portfolio.type === 'CreateNew' ? {name: product.portfolio.name} : {id: product.portfolio.id}
                    },
                    negative_keywords: {
                        exact: product.negative_keywords.filter(item => item.type === 'exact'),
                        phrase: product.negative_keywords.filter(item => item.type === 'phrase')
                    }
                }))
            };

            try {
                if (paidBatch.available_tokens && paidBatch.status === 'PAID') {
                    await zthServices.createFreeBatch(paidBatch.batch_id, {
                        setup_settings: setupSettingsFilter(productsWithSettings)
                    });

                    setPromptState(false);

                    history.push('/zero-to-hero/success');
                } else {
                    const createdBatch = await zthServices.saveSettings({
                        zth_tokens_count: productAmount,
                        setup_settings: setupSettingsFilter(productsWithSettings)
                    });

                    setPromptState(false);

                    history.push(`/zero-to-hero/payment/${createdBatch.result.batch_id}`);
                }
            } catch (e) {
                console.log(e)
            }

            setProcessing(false);
        };


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

                    setProcessing(false);

                    throw BreakException;
                };

                if (product.campaigns.main_keywords.length < 3) {
                    notification.error({title: 'Please enter at least 3 main keywords'});
                    setField('mainKeywords');
                } else if (product.portfolio.type === 'CreateNew' && (!product.portfolio.name || product.portfolio.name === '')) {
                    notification.error({title: 'Please enter the portfolio name'});
                    setField('portfolioName');
                } else if (product.portfolio.type === 'UseExisting' && (!product.portfolio.id)) {
                    notification.error({title: 'Please select the existing portfolio'});
                    setField('portfolioId');
                } else if (!product.campaigns.daily_budget) {
                    notification.error({title: 'Please enter your daily budged'});
                    setField('dailyBudget');
                } else if (!product.campaigns.default_bid) {
                    notification.error({title: 'Please enter your default bid'});
                    setField('defaultBid');
                } else if (!product.brand.name) {
                    notification.error({title: 'Please enter your Brand Name'});
                    setField('brandName');
                } else {
                    submit()
                }
            });
        } catch (e) {
            if (e !== BreakException) throw e;
        }
    };

    useEffect(() => {
        if (addedProducts.length > 0) {
            setPromptState(true);
        } else {
            setPromptState(false);
        }
    }, [addedProducts]);

    useEffect(() => {
        zthServices.getUserPortfolio()
            .then(res => {
                setPortfolioList(res.result)
            });

        return (() => {
            dispatch(zthActions.clearSettings())
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
                    selectedProductName={addedProducts[activeProductIndex].name}
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
                    availableTokens={paidBatch.available_tokens}
                />

                {/*<ConfirmActionPopup*/}
                {/*    className={'confirm-remove-product-window'}*/}
                {/*    visible={visibleConfirmWindow}*/}
                {/*    title={'Do you want to proceed to payment?'}*/}
                {/*    description={'Please check information before submitting.'}*/}
                {/*    handleOk={submit}*/}
                {/*    okText={'Proceed'}*/}
                {/*    handleCancel={() => setVisibleConfirmWindow(false)}*/}
                {/*    cancelText={'Cancel'}*/}
                {/*/>*/}

                <Prompt
                    when={promptState}
                    message="Are you sure? The current scanning results will be lost"
                />
            </section>
        )
    } else {
        return '';
    }
};

export default React.memo(ProductSettings);
