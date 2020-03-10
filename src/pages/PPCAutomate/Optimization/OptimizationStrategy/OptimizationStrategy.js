import React, {useState, Fragment} from "react";
import {Spin, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";

import "./OptimizationStrategy.less";
import Slider from "react-slick";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faStop} from "@fortawesome/free-solid-svg-icons";

import acosTargetingImage from '../../../../assets/img/optimization/acos-targeting.svg';
import productLaunchImage from '../../../../assets/img/optimization/product-launch.png';
import organicSalesGrowthImage from '../../../../assets/img/optimization/organic-sales-growth.png';
import revenueGrowthImage from '../../../../assets/img/optimization/revenue-growth.png';
import profitablePpcImage from '../../../../assets/img/optimization/profitable-ppc.png';
import InputCurrency from "../../../../components/Inputs/InputCurrency";
import NetMarginWindow from "../NetMarginWindow/NetMarginWindow";
import ConfirmActionPopup from "../../../../components/ModalWindow/ConfirmActionPopup";
import {productsActions} from "../../../../actions/products.actions";
import CustomSelect from "../../../../components/Select/Select";

const Option = Select.Option;

const strategies = [
    {
        name: 'ACoS Targeting',
        key: 'ACoS_targeting',
        img: acosTargetingImage,
        jeffRemark: `I’m hunting this <span>target ACoS</span> for over <br> decades. Let’s get it!`,
        description: `This strategy designed for sellers who know what ACoS they are targeting.
Make sure you've correctly calculated your Target ACoS. <br/>
Press start and see how the algorithm is making changes to get the results you want.`,
        descriptionTitle: 'Get the desired ACoS!',
        value: {
            Spend: "Mid",
            Profit: "Low",
            ACOS: "Mid",
            Traffic: "Mid"
        }
    },
    {
        name: 'Product Launch',
        key: 'LaunchProduct',
        img: productLaunchImage,
        jeffRemark: `I’m just starting up. Please help me launch my <br> brand <span>new product.</span>`,
        description: `Strategy designed for sellers who wants to launch or relaunch the product. The algorithm will be more aggressive with the bids, so you will get your first sales, reviews, and increase your brand awareness. It works fantastic with other launch activities like giveaways and promotions.`,
        descriptionTitle: 'Launch my product!',
        value: {
            Spend: "High",
            Profit: "Low",
            ACOS: "High",
            Traffic: "High"
        }
    },
    {
        name: 'Organic Sales Growth',
        key: 'BoostPPCProfit',
        img: organicSalesGrowthImage,
        jeffRemark: `All I care about is <span>organic sales.</span> I want to break-even  <br> on PPC so to boost my keywords position.`,
        description: `This strategy designed for sellers who want to keep their organic ranking positions with PPC efforts. So they can make more profit from Organic Sales. It will achieve your break-even ACoS to keep higher sales from ads that will lead to growing your organic sales.`,
        descriptionTitle: 'Leverage organic sales!',
        value: {
            Spend: "Mid",
            Profit: "High",
            ACOS: "Mid",
            Traffic: "High"
        }
    },
    {
        name: 'Revenue Growth',
        key: 'GrowOverallSales',
        img: revenueGrowthImage,
        jeffRemark: `<span>ACoS?</span> Meh.. I want that Lambo <br> Let's grow my revenue!`,
        description: `This strategy designed for sellers who want to boost their overall sales, so to rank for more keywords. It requires increasing your advertising budget and keeping the ACoS higher than your break-even ACoS.`,
        descriptionTitle: 'Let’s grow your numbers!',
        value: {
            Spend: "High",
            Profit: "Mid",
            ACOS: "High",
            Traffic: "High"
        }
    },
    {
        name: 'Profitable PPC',
        key: 'BoostOverallProfit',
        img: profitablePpcImage,
        jeffRemark: `I don't care about all these metrics. I just want <span>low <br> ACoS</span> so I can share it on my Facebook page.`,
        description: `This strategy designed for sellers who want to increase their PPC profit. The Software will optimize all the bleeding and unprofitable keywords with proper bid management to get the best converting ad position possible.`,
        descriptionTitle: 'Maximize my PPC Profit!',
        value: {
            Spend: "Low",
            Profit: "High",
            ACOS: "Low",
            Traffic: "Mid"
        }
    },
];

const RUNNING = 'RUNNING';

// const STOPPED = 'STOPPED';


function StrategyItem({
                          strategy: {description, descriptionTitle, value, img, jeffRemark, key},
                          index,
                          activeStrategy,
                          isActivated,
                          onStart,
                          onStop,
                          processing,
                          visible,
                          productId,
                          onSaveTargetAcos
                      }) {
    const [targetAcos, setTargetAcos] = useState(undefined);

    return (
        <div className={`strategy-item  slide-${index + 1} ${visible && 'visible'}`}>
            <div className="description-block">
                <div className="col">
                    <div>
                        <h4>{descriptionTitle}</h4>
                        <p dangerouslySetInnerHTML={{__html: description}}/>
                    </div>

                    <div className="value-list">
                        {Object.keys(value).map(key => (
                            <div key={key}>
                                <span className='metric-name'>{key}</span>
                                <span className={`metric-value ${value[key]}`}>{value[key]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="image">
                    {index === 0 && <div className="target-acos">
                        <span>Enter yor target ACoS</span>
                        <InputCurrency typeIcon={'margin'} value={targetAcos} onChange={value => setTargetAcos(value)}/>
                        <button className='btn green-btn' onClick={() => onSaveTargetAcos(targetAcos)}>save</button>
                    </div>}

                    <img src={img} alt=""/>
                </div>
            </div>

            <div className="col">
                <div className="remark" dangerouslySetInnerHTML={{__html: jeffRemark}}/>

                <div className="actions">
                    {isActivated ? (
                            activeStrategy === key ?
                                <button disabled={processing || productId == null} className='btn default stop-btn' onClick={onStop}>
                                    {processing ? <Spin/> : <FontAwesomeIcon icon={faStop}/>}
                                    stop
                                </button>
                                :
                                <>
                                    <button disabled={processing || productId == null} className='btn default'
                                            onClick={() => onStart(targetAcos)}>
                                        {processing ? <Spin/> : <FontAwesomeIcon icon={faPlay}/>}
                                        update
                                    </button>

                                    <button disabled={processing || productId == null} className='btn default stop-btn' onClick={onStop}>
                                        {processing ? <Spin/> : <FontAwesomeIcon icon={faStop}/>}
                                        stop
                                    </button>
                                </>
                        )
                        :
                        <button disabled={processing || productId == null} className='btn default' onClick={() => onStart(targetAcos)}>
                            {processing ? <Spin/> : <FontAwesomeIcon icon={faPlay}/>}
                            start
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}

let sliding = false;

const OptimizationStrategy = ({product: {optimization_strategy, status, product_margin}, onShowDrawer, onStart, onStop, selectedAll, processing, productId, onSaveTargetAcos}) => {
    const dispatch = useDispatch();
    let targetAcosValue;

    const {dontShowStartWindowAgain, dontShowStopWindowAgain} = useSelector(state => ({
        dontShowStartWindowAgain: state.products.dontShowStartNotificationAgain,
        dontShowStopWindowAgain: state.products.dontShowStopNotificationAgain,
    }));

    const [slider, setSlider] = useState(),
        [selectedSlide, setSelectedSlide] = useState(0),
        [visibleNetMarginWindow, setNetMarginWindow] = useState(false),
        [visibleConfirmWindows, setConfirmWindows] = useState({
            confirmStartAllProducts: false,
            confirmStartProduct: false,
            confirmStopProduct: false
        }),
        [showAgainConfirmWindow, setShowAgainWindow] = useState({
            startWindow: dontShowStartWindowAgain,
            stopWindow: dontShowStopWindowAgain
        });

    function startOptimizationHandler(targetAcos) {
        targetAcosValue = targetAcos;

        if (dontShowStartWindowAgain && !selectedAll) {
            onStartProductOptimization();
        } else {
            setConfirmWindows({
                ...visibleConfirmWindows,
                [selectedAll ? 'confirmStartAllProducts' : 'confirmStartProduct']: true
            })
        }
    }

    function stopOptimizationHandler() {
        if (dontShowStopWindowAgain && !selectedAll) {
            onStopProductOptimization();
        } else {
            setConfirmWindows({
                ...visibleConfirmWindows,
                confirmStopProduct: true
            })
        }
    }

    function onStartProductOptimization() {
        setConfirmWindows({...visibleConfirmWindows, confirmStartAllProducts: false, confirmStartProduct: false});

        if (!product_margin) {
            setNetMarginWindow(true)
        } else {
            onStart(strategies[selectedSlide].key, targetAcosValue);

            dispatch(productsActions.dontShowWindowAgain({
                windowName: 'START',
                status: showAgainConfirmWindow.startWindow
            }))
        }
    }

    function onStopProductOptimization() {
        onStop(strategies[selectedSlide].key);
        setConfirmWindows({...visibleConfirmWindows, confirmStopProduct: false});

        dispatch(productsActions.dontShowWindowAgain({
            windowName: 'STOP',
            status: showAgainConfirmWindow.stopWindow
        }))
    }

    function setNetMarginHandler(netMargin) {
        onStart(strategies[selectedSlide].key, targetAcosValue, netMargin);

        dispatch(productsActions.dontShowWindowAgain({
            windowName: 'START',
            status: showAgainConfirmWindow.startWindow
        }));

        setNetMarginWindow(false);
    }

    function checkboxChangeHandler(name, value) {
        setShowAgainWindow({
            ...showAgainConfirmWindow,
            [name]: value
        });
    }

    function onCloseWindow(window) {
        setConfirmWindows({
            ...visibleConfirmWindows,
            [window]: false
        });
    }

    function goToSlideHandler(index) {
        if (!sliding) {
            sliding = true;
            slider.slickGoTo(index);
            setSelectedSlide(index);

            setTimeout(() => {
                sliding = false;
            }, 600)
        }
    }

    return (
        <Fragment>
            <section className="optimize-strategy">
                <h3>
                    Our Strategies
                    {/*<Icon*/}
                    {/*    type="info-circle"*/}
                    {/*    theme="filled"*/}
                    {/*    onClick={() => onShowDrawer("strategy")}*/}
                    {/*/>*/}
                </h3>

                <div className="strategies desc">
                    <div className="all-strategies">
                        {strategies.map((item, index) => (
                            <div
                                key={item.key}
                                className={`strategy-name ${index === selectedSlide && 'selected-strategy'} ${optimization_strategy === item.key && status === RUNNING && 'running-strategy'}`}
                                onClick={() => goToSlideHandler(index)}>
                                {item.name}
                            </div>
                        ))}
                    </div>

                    <Slider
                        dots={false}
                        infinite={true}
                        swipe={false}
                        speed={500}
                        initialSlide={selectedSlide}
                        slidesToShow={1}
                        slidesToScroll={1}
                        ref={slider => {
                            setSlider(slider)
                        }}
                    >
                        {strategies.map((item, index) => (
                            <StrategyItem
                                productId={productId}
                                key={item.key}
                                strategy={item}
                                index={index}
                                processing={processing}
                                activeStrategy={optimization_strategy}
                                isActivated={status === 'RUNNING'}
                                onStart={startOptimizationHandler}
                                onStop={stopOptimizationHandler}
                                onSaveTargetAcos={onSaveTargetAcos}
                            />
                        ))}
                    </Slider>
                </div>

                <div className="strategies mob">
                    <div className="all-strategies">
                        <CustomSelect onChange={goToSlideHandler} value={selectedSlide}>
                            {strategies.map((item, index) => (
                                <Option key={item.key} value={index}>{item.name}</Option>
                            ))}
                        </CustomSelect>
                    </div>

                    {strategies.map((item, index) => (
                        <StrategyItem
                            productId={productId}
                            key={item.key}
                            strategy={item}
                            index={index}
                            processing={processing}
                            activeStrategy={optimization_strategy}
                            isActivated={status === 'RUNNING'}
                            onStart={startOptimizationHandler}
                            onStop={stopOptimizationHandler}

                            visible={selectedSlide === index}
                        />
                    ))}
                </div>
            </section>


            <NetMarginWindow
                isShowModal={visibleNetMarginWindow}
                selectedAll={selectedAll}
                handleCancel={() => setNetMarginWindow(false)}
                handleOk={setNetMarginHandler}
            />

            <ConfirmActionPopup
                visible={visibleConfirmWindows.confirmStartAllProducts}
                handleOk={onStartProductOptimization}
                handleCancel={() => onCloseWindow('confirmStartAllProducts')}
                title={'Are you ready to start?'}
                description={'Are you sure you want to start the same optimization strategy for All Products?'}
            />

            <ConfirmActionPopup
                visible={visibleConfirmWindows.confirmStartProduct}
                handleOk={onStartProductOptimization}
                handleCancel={() => onCloseWindow('confirmStartProduct')}
                handleChangeCheckbox={(e) => checkboxChangeHandler('startWindow', e.target.checked)}
                title={'Are you ready to start?'}
                description={'This action will result in the automatic management of your campaigns by our algorithm.'}
                checkboxText={`Don't show this message again`}
            />

            <ConfirmActionPopup
                visible={visibleConfirmWindows.confirmStopProduct}
                handleOk={onStopProductOptimization}
                handleCancel={() => onCloseWindow('confirmStopProduct')}
                handleChangeCheckbox={e => checkboxChangeHandler('stopWindow', e.target.checked)}
                title={' Are you sure you want to stop?'}
                description={'We will stop the optimization of your active Amazon PPC campaigns. You can restart it anytime.'}
                checkboxText={selectedAll ? null : `Don't show this message again`}
            />
        </Fragment>
    );
};

export default OptimizationStrategy;
