import React, {useState, Fragment, useEffect} from "react";
import {Spin, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";

import "./OptimizationStrategy.less";
import Slider from "react-slick";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faStop} from "@fortawesome/free-solid-svg-icons";

import acosTargetingImage from '../../../../assets/img/optimization/acos-targeting.png';
import productLaunchImage from '../../../../assets/img/optimization/product-launch.png';
import organicSalesGrowthImage from '../../../../assets/img/optimization/organic-sales-growth.png';
import revenueGrowthImage from '../../../../assets/img/optimization/revenue-growth.png';
import profitablePpcImage from '../../../../assets/img/optimization/profitable-ppc.png';
import InputCurrency from "../../../../components/Inputs/InputCurrency";
import NetMarginWindow from "../NetMarginWindow/NetMarginWindow";
import ConfirmActionPopup from "../../../../components/ModalWindow/ConfirmActionPopup";
import {productsActions} from "../../../../actions/products.actions";
import CustomSelect from "../../../../components/Select/Select";
import {notification} from "../../../../components/Notification";
import {SVG} from "../../../../utils/icons";

const Option = Select.Option;

const strategies = [
    {
        name: 'ACoS Targeting',
        key: 'AchieveTargetACoS',
        img: 'acos-targeting',
        jeffRemark: `I’m hunting this <span>target ACoS</span> for over <br> decades. Let’s get it!`,
        description: `This strategy designed for sellers who know what ACoS they are targeting. Make sure you've correctly calculated your Target ACoS. <br/>Press start and see how the algorithm is making changes to get the results you want.`,
        descriptionTitle: 'Get the desired ACoS!',
        sales: 3,
        acos: 1,
        color: '#EC7F5C',
        value: {
            'Spend/Rev.': "9%",
            'Profit/Rev.': "18%",
            'ACoS': "36%",
            'Daily Traffic': "~ 250 clicks"
        }
    },
    {
        name: 'Product Launch',
        key: 'LaunchProduct',
        img: 'product-launch',
        jeffRemark: `I’m just starting up. Please help me launch my <br> brand <span>new product.</span>`,
        description: `Strategy designed for sellers who wants to launch or relaunch the product. The algorithm will be more aggressive with the bids, so you will get your first sales, reviews, and increase your brand awareness. It works fantastic with other launch activities like giveaways and promotions.`,
        descriptionTitle: 'Launch my product!',
        sales: 3,
        acos: 5,
        color: '#6D6DF6',
        value: {
            'Spend/Rev.': "18%",
            'Profit/Rev.': "< 5%",
            'ACoS': "62%",
            'Daily Traffic': "~ 250 clicks"
        }
    },
    {
        name: 'Organic Sales Growth',
        key: 'BoostOverallProfit',
        img: 'organic-sales-growth',
        jeffRemark: `All I care about is <span>organic sales.</span> I want to break-even  <br> on PPC so to boost my keywords position.`,
        description: `This strategy designed for sellers who want to keep their organic ranking positions with PPC efforts. So they can make more profit from Organic Sales. It will achieve your break-even ACoS to keep higher sales from ads that will lead to growing your organic sales.`,
        descriptionTitle: 'Leverage organic sales!',
        sales: 5,
        acos: 5,
        color: '#83FED0',
        value: {
            'Spend/Rev.': "12%",
            'Profit/Rev.': "26%",
            'ACoS': "32%",
            'Daily Traffic': "~ 240 clicks"
        }
    },
    {
        name: 'Revenue Growth',
        key: 'GrowOverallSales',
        img: 'ppc-profit-growth',
        jeffRemark: `<span>ACoS?</span> Meh.. I want that Lambo <br> Let's grow my revenue!`,
        description: `This strategy designed for sellers who want to boost their overall sales, so to rank for more keywords. It requires increasing your advertising budget and keeping the ACoS higher than your break-even ACoS.`,
        descriptionTitle: 'Let’s grow your numbers!',
        sales: 5,
        acos: 5,
        color: '#F0B849',
        value: {
            'Spend/Rev.': "18%",
            'Profit/Rev.': "14%",
            'ACoS': "38%",
            'Daily Traffic': "~ 390 clicks"
        }
    },
    {
        name: 'Profitable PPC',
        key: 'BoostPPCProfit',
        img: 'overall-profit-growth',
        jeffRemark: `I don't care about all these metrics. I just want <span>low <br> ACoS</span> so I can share it on my Facebook page.`,
        description: `This strategy designed for sellers who want to increase their PPC profit. The Software will optimize all the bleeding and unprofitable keywords with proper bid management to get the best converting ad position possible.`,
        descriptionTitle: 'Maximize my PPC Profit!',
        sales: 4,
        acos: 2,
        color: '#5BEBF3',
        value: {
            'Spend/Rev.': "7%",
            'Profit/Rev.': "22%",
            'ACoS': "24%",
            'Daily Traffic': "~ 100 clicks"
        }
    },
];

const RUNNING = 'RUNNING';

// const STOPPED = 'STOPPED';


function StrategyItem({
                          strategy: {description, img, name, sales, acos, color},
                          onClick,
                          isActivated,
                          selected,
                      }) {
    return (
        <div
            className={`strategy-item ${selected && 'selected'}`}
            style={{borderColor: color}}
            onClick={onClick}
        >
            <div className="row">
                <div className="col">
                    <div className="title">
                        <i style={{fill: color}}>
                            <SVG id={img}/>
                        </i>
                        {name}
                    </div>

                    <div className="row">
                        <div className="sales">
                            Sales:

                            <div className="starts">
                                {[0, 1, 2, 3, 4].map(star => (
                                    <div style={{width: `${4 + star}px`, height: `${4 + star}px`}}
                                         className={star <= sales ? 'active' : ''}/>
                                ))}
                            </div>
                        </div>
                        <div className="acos">
                            ACoS:

                            <div className="starts">
                                {[0, 1, 2, 3, 4].map(star => (
                                    <div style={{width: `${4 + star}px`, height: `${4 + star}px`}}
                                         className={star <= acos ? 'active' : ''}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {isActivated && <i style={{fill: color}} className={'is-activated'}>
                    <SVG id={'activated-strategy-icon'}/>
                </i>}
            </div>

            <div
                className="description"
                dangerouslySetInnerHTML={{__html: description}}
            />
        </div>
    )
}

let sliding = false;
let targetAcosValue;

const OptimizationStrategy = ({product: {desired_target_acos, optimization_strategy, status, product_margin, item_price, item_price_from_user}, onShowDrawer, onStart, onStop, selectedAll, processing, productId, onSaveTargetAcos}) => {
    const dispatch = useDispatch();


    const {dontShowStartWindowAgain, dontShowStopWindowAgain} = useSelector(state => ({
        dontShowStartWindowAgain: state.products.dontShowStartNotificationAgain,
        dontShowStopWindowAgain: state.products.dontShowStopNotificationAgain,
    }));

    const [selectedSlide, setSelectedSlide] = useState(0),
        [targetAcos, setTargetAcos] = useState(desired_target_acos),
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
            setConfirmWindows((prev) => {
                return (
                    {
                        ...prev,
                        confirmStopProduct: true
                    }
                )

            })
        }
    }

    function onStartProductOptimization() {
        setConfirmWindows({...visibleConfirmWindows, confirmStartAllProducts: false, confirmStartProduct: false});

        if (!product_margin || (!item_price && !item_price_from_user)) {
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

    function selectStrategy(index) {
        setSelectedSlide(index);
    }

    return (
        <Fragment>
            <section className={`optimize-strategy slide-${selectedSlide + 1}`}>
                <h3>
                    Our Strategies
                </h3>

                <div className="row">
                    <div className="strategy-list">
                        {strategies.map((item, index) => (
                            <StrategyItem
                                productId={productId}
                                desired_target_acos={desired_target_acos}
                                key={item.key}
                                strategy={item}
                                index={index}
                                status={status}
                                processing={processing}
                                activeStrategy={optimization_strategy}
                                isActivated={status === 'RUNNING' && optimization_strategy === item.key}
                                onClick={() => selectStrategy(index)}

                                selected={selectedSlide === index}
                            />
                        ))}
                    </div>

                    <div className="optimization-action">
                        <i>
                            <SVG id={`strategy-lines-${selectedSlide + 1}`}/>
                        </i>

                        {status === 'RUNNING' && optimization_strategy === strategies[selectedSlide].key ?
                            <button
                                className={'btn stop'}
                                style={{backgroundColor: strategies[selectedSlide].color}}
                                onClick={stopOptimizationHandler}
                            >
                                STOP

                                <SVG id={'stop'}/>
                            </button>
                            :
                            <button
                                className={'btn'}
                                style={{backgroundColor: strategies[selectedSlide].color}}
                                onClick={startOptimizationHandler}
                            >
                                START

                                <SVG id={'start'}/>
                            </button>
                        }


                        {selectedSlide === 0 && <div className={'target-acos-form'}>
                            <div className="row">
                                <SVG id={'pw-logo'}/>

                                <div className="question">
                                    What is your Target ACoS?
                                </div>
                            </div>

                            <div className="row">
                                <div className="field-block">
                                    Target ACoS:
                                    <InputCurrency
                                        value={targetAcos}
                                        typeIcon={'percent'}
                                        onChange={(value) => setTargetAcos(value > 100 ? 100 : value)}
                                    />
                                </div>

                                <button onClick={() => onSaveTargetAcos(targetAcos)}>
                                    <SVG id={'send-icon'}/>
                                </button>
                            </div>
                        </div>}
                    </div>

                    <div className="strategy-statistic">
                        {Object.keys(strategies[selectedSlide].value).map(item => (
                            <div className="statistic-item">
                                <i style={{stroke: strategies[selectedSlide].color}}>
                                    <SVG id={'strategy-statistic-icon'}/>
                                </i>

                                <div>
                                    <div className="name">{item}</div>
                                    <h4>{strategies[selectedSlide].value[item]}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <NetMarginWindow
                isShowModal={visibleNetMarginWindow}
                // isShowModal={true}
                selectedAll={selectedAll}
                itemPrice={item_price}
                itemPriceFromUser={item_price_from_user}
                productMargin={product_margin}
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
