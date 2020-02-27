import React, {useState} from "react";
import {Icon} from "antd";

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

const strategies = [
    {
        name: 'ACoS Targeting',
        key: 'ACoS_targeting',
        img: acosTargetingImage,
        jeffRemark: `I’m hunting this <span>target ACoS</span> for over <br> decades. Let’s get it!`,
        description: `The algorithm will optimize campaigns to get you the Target ACoS`,
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
        description: `Strategy designed for sellers who wants to launch or relaunch the product. The algorithm will be more aggressive with the bids, so you will get your first sales, reviews, and increase your brand awareness.`,
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
        jeffRemark: `All I care about is <span>organic sales.</span> I want to <br> break-even on PPC so to boost my keywords <br> position.`,
        description: `This strategy designed for sellers who want to keep their organic ranking positions with PPC efforts. So they can make more profit from Organic Sales.`,
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

export function SampleNextArrow({onClick}) {
    return (<div className='next' onClick={onClick}><FontAwesomeIcon icon={faPlay}/></div>)
}

export function SamplePrevArrow({onClick}) {
    return (<div className='prev' onClick={onClick}><FontAwesomeIcon icon={faPlay}/></div>);
}

export function StrategyItem({
                                 strategy: {description, descriptionTitle, value, img, jeffRemark, key},
                                 index,
                                 activeStrategy,
                                 isActivated,
                                 onStart,
                                 onStop
                             }) {
    return (
        <div className={`strategy-item  slide-${index + 1}`}>
            <div className="description-block">
                <div className="col">
                    <div>
                        <h4>{descriptionTitle}</h4>
                        <p>{description}</p>
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
                        <InputCurrency typeIcon={'margin'}/>
                        <button className='btn green-btn'>save</button>
                    </div>}

                    <img src={img} alt=""/>
                </div>
            </div>

            <div className="col">
                <div className="remark" dangerouslySetInnerHTML={{__html: jeffRemark}}/>

                {activeStrategy === key && isActivated ?
                    <button className='btn default stop-btn' onClick={onStop}>
                        <FontAwesomeIcon icon={faStop}/>
                        stop
                    </button>
                    :
                    <button className='btn default' onClick={() => onStart(key)}>
                        <FontAwesomeIcon icon={faPlay}/>
                        start
                    </button>
                }
            </div>
        </div>
    )
}

const OptimizationStrategy = ({product: {optimization_strategy, status}, onShowDrawer, onStart, onStop}) => {
    const [slider, setSlider] = useState(),
        [selectedSlide, setSelectedSlide] = useState(0);

    function goToSlideHandler(index) {
        slider.slickGoTo(index);
        setSelectedSlide(index);
    }

    return (
        <section className="optimize-strategy">
            <h3>
                Our Strategies
                <Icon
                    type="info-circle"
                    theme="filled"
                    onClick={() => onShowDrawer("strategy")}
                />
            </h3>

            <div className="strategies ">
                <div className="all-strategies">
                    {strategies.map((item, index) => (
                        <div
                            key={item.key}
                            className={`strategy-name ${index === selectedSlide && 'selected-strategy'}`}
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
                    slidesToShow={1}
                    slidesToScroll={1}
                    nextArrow={<SampleNextArrow/>}
                    prevArrow={<SamplePrevArrow/>}
                    ref={slider => {
                        setSlider(slider)
                    }}
                >
                    {strategies.map((item, index) => (
                        <StrategyItem
                            key={item.key}
                            strategy={item}
                            index={index}
                            activeStrategy={optimization_strategy}
                            isActivated={status === 'RUNNING'}
                            onStart={onStart}
                            onStop={onStop}
                        />
                    ))}
                </Slider>

            </div>
        </section>
    );
};

export default OptimizationStrategy;
