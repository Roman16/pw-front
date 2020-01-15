import React, {useState} from "react";
import './LandingAutomation.less';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import JeffInPlane from '../../../assets/img/landing-automation/not-in-ads.svg';
import JeffDaily from '../../../assets/img/landing-automation/jeff-daily.svg';
import amazonApp from '../../../assets/img/landing-automation/amazon-app-store.svg';
import dots from '../../../assets/img/landing-automation/dots.svg';
import step1 from '../../../assets/img/landing-automation/step-1.svg';
import step2 from '../../../assets/img/landing-automation/step-2.svg';
import step3 from '../../../assets/img/landing-automation/step-3.svg';
import step4 from '../../../assets/img/landing-automation/step-4.svg';
import leftIcon from '../../../assets/img/landing-automation/left-icon.svg';
import rightIcon from '../../../assets/img/landing-automation/right-icon.svg';
import dashIcon from '../../../assets/img/landing-automation/dash.svg';

import case1 from '../../../assets/img/landing-automation/case-1.svg';

const stepsSlider = [
    {
        title: `Connect Seller <br/> Central Account`,
        description: 'Profit Whales allows you to instantly connect Amazon Seller Central to automate your Amazon Advertising work and find productivity super powers.',
        img: step1
    },
    {
        title: `Choose <br/> Your Goal`,
        description: 'Inside the software, you\'ll find four business goals. You have to choose one of them and start optimization. Naturally, for each of them, we use a unique algorithm to achieve efficient results.',
        img: step2
    },
    {
        title: `Monitor <br/> The Changes`,
        description: 'You have to make yourself comfortable, sit, and enjoy changes that software would do. You see, for what you pay, it soothes, right?',
        img: step3
    },
    {
        title: `Access <br/> A Lot More Data`,
        description: 'We obsessed with data, so we developed a dashboard and day-parting tool so you can see your business metrics at a glance and make more profitable decisions.',
        img: step4
    },
];

const ourCases = [
    {
        title: 'One year with Profit Whales',
        img: case1,
        before: [
            {
                metric: 'Total Sales',
                value: '$1,786,513'
            },
            {
                metric: 'PPC Sales',
                value: '$68,407'
            },
            {
                metric: 'Profit',
                value: '$469,016'
            },
        ]
    }
];


const LandingAutomation = () => {
    const [currentStep, setStep] = useState(0);

    function prevStep() {
        if (currentStep === 0) {
            setStep(3)
        } else {
            setStep(currentStep - 1)
        }
    }

    function nextStep() {
        if (currentStep === 3) {
            setStep(0)
        } else {
            setStep(currentStep + 1)
        }
    }

    return (
        <div className="landing-automation">
            <Header/>

            <section className='first-section'>
                <div className='container'>
                    <div className='content'>
                        <h1>Engage in Amazon <br/> business <span>not in ads</span></h1>

                        <div className='description'>
                            Imagine the software could save you a ton of time and money while
                            increasing return on your Amazon ad spends. With the help of our data-driven algorithms and
                            PPC automation software, it's more than possible.
                        </div>

                        <div className='advantages'>
                            <span>Cancel anytime</span>
                            <div/>
                            <span>14 Days Free Trial</span>
                            <div/>
                            <span>No credit card required</span>
                        </div>

                        <div className="actions">
                            <button className='btn default'>
                                START FREE
                            </button>

                            <img src={amazonApp} alt=""/>
                        </div>
                    </div>

                    <div className='image-block'>
                        <img src={JeffInPlane} alt=""/>
                    </div>
                </div>
            </section>

            <section className='daily-routine-jeff'>
                <div className='container'>
                    <div className="image-block">
                        <img src={JeffDaily} alt=""/>
                    </div>

                    <div className="content">
                        <div className="title">
                            This is Jeff. He has a successful Amazon FBA business. But,
                        </div>

                        <div className="description">
                            every day, he is dealing with a lot of routine tasks regarding
                            Amazon PPC instead of launching new products and improve existing ones.
                        </div>

                        <div className='list'>
                            <div>
                                He spends up to 40 hours per week on Amazon PPC.
                            </div>

                            <div>
                                He is waisting ton of money on bleeding keywords, and losing money from keywords, he
                                isn’t bidding on.
                            </div>

                            <div>
                                Jeff is always looking in unfriendly Amazon Advertising Reports.
                            </div>

                            <div>
                                He is dealing with industry PPC “experts” and losing a lot of business opportunities
                                while his competitors are stealing the market share.
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section className='steps'>
                <div className='container'>
                    <h2>N steps to Solve It</h2>

                    <div className='all-steps'>
                        <div className={currentStep === 0 ? 'active' : ''}>
                            <div/>
                            <span>Connect Seller Central Account</span>
                        </div>
                        <div className={currentStep === 1 ? 'active' : ''}>
                            <div/>
                            <span>Choose Your Goal</span>
                        </div>
                        <div className={currentStep === 2 ? 'active' : ''}>
                            <div/>
                            <span>Monitor the changes</span>
                        </div>
                        <div className={currentStep === 3 ? 'active' : ''}>
                            <div/>
                            <span>Access a lot more data</span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="content">
                            <div className="title">
                                01
                                <span className='dash'>
                                    <img src={dashIcon} alt=""/>
                                </span>
                                <span dangerouslySetInnerHTML={{__html: stepsSlider[currentStep].title}}/>
                            </div>

                            <div className="description">
                                {stepsSlider[currentStep].description}
                            </div>

                            <button className='btn default'>
                                Get Started
                            </button>
                        </div>

                        <div className="slider">
                            <div className="prev" onClick={prevStep}><img src={leftIcon} alt=""/></div>
                            <div className="image-block">
                                <img src={stepsSlider[currentStep].img} alt=""/>
                            </div>
                            <div className="next" onClick={nextStep}><img src={rightIcon} alt=""/></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='achievements'>
                <div className="container">
                    <div>
                        <div className="value">$2,5M</div>
                        <div className="description">Total Amazon Ad Spend Managed</div>
                    </div>
                    <div>
                        <div className="value">14%</div>
                        <div className="description">Average Decrease in Acos</div>
                    </div>
                    <div>
                        <div className="value">$40M</div>
                        <div className="description">Total Amazon Revenue Optimized</div>
                    </div>
                    <div>
                        <div className="value">19%</div>
                        <div className="description">Average Increase in Revenue</div>
                    </div>
                    <div>
                        <div className="value">25%</div>
                        <div className="description">Higher CTR</div>
                    </div>
                </div>
            </section>

            <section className='our-cases'>
                <div className="container">
                    <h2>Our Cases</h2>

                    <div className='slider'>
                        <div className="image-block">
                            <img src={ourCases[0].img} alt=""/>
                        </div>

                        <div className="prev" onClick={prevStep}><img src={leftIcon} alt=""/></div>
                        <div className="next" onClick={nextStep}><img src={rightIcon} alt=""/></div>

                        <div className='navigation'>

                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    )
};

export default LandingAutomation;