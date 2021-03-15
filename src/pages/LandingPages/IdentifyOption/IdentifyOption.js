import React from "react"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import './IdentifyOption.less'

const list = [
    {
        title: `Accelerate <span>Profits</span>`,
        values: [
            'Efficient budget allocation to prevent cannibalization',
            'AI bids optimization for ROAS maximization',
            'High focus on Video and Sponsored Display Campaigns to take over the competitors',
            'Deep keywords/targets research to find hidden opportunities',
            'Custom Analytics'
        ]
    },
    {
        title: `Accelerate your <span>Marketplace Potential</span>`,
        values: [
            'High utilization of SP/SBV/SD campaigns',
            'Incremental increase in traffic',
            'Niche monopolization',
            'Focus on getting and defending Best Sellers Tags',
            'Business Analytics'
        ]
    }
]

const IdentifyOption = () => {

    return (
        <div className="identify-option  landing-page">
            <Header/>

            <section className="pre-header">
                <div className="container">
                    <h1>
                        Identify <br/>
                        <span>your option</span>
                    </h1>
                </div>
            </section>

            <section className={'advertising-strategy'}>
                <div className="container">
                    <div className="col">
                        <h2>
                            Custom Amazon advertising strategy <span>to accelerate your performance</span>
                        </h2>

                        <p>
                            We believe that the sustainable and data-driven marketing approach based on the synergy of
                            machine and human decisions that drives superior performance on retail platforms lies in the
                            heart of Profit Whales company, focusing our strategy to be tied to the creation of
                            long-term value for all our stakeholders.
                        </p>

                        <button className={'btn default'}>
                            <span>Get Your</span> Amazon Advertising <br/> Campaigns <span>Review</span>

                            <svg width="84" height="84" viewBox="0 0 84 84" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="42" cy="42" r="40" stroke="#83FED0" stroke-width="4"/>
                                <path d="M30.8379 35.0232L38.7449 43.3953L30.8379 51.7674" stroke="#83FED0"
                                      stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M45.7207 35.0232L53.6277 43.3953L45.7207 51.7674" stroke="#83FED0"
                                      stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <h2>
                        Define <span>the perfect path</span> to accelerate your business
                    </h2>

                    <p>
                        This is a great start to accelerate your brand performance! We are offering the services that
                        achive your goals best. Through the deep analysis of the niche and data, we would generate the
                        most effective approach to achieve your targets. Let's identify your priorities and let the work
                        begin. With our algorithms, big data, AI, unique approach, and team of professionals, you would
                        reach your goals and become a Whale in Your Ocean
                    </p>

                    <div className="row">
                        <div className="col">
                            <h4>choose What do you want to accelerate?</h4>

                        </div>

                        <div className="col">
                            <h4>try it</h4>
                        </div>
                    </div>
                </div>
            </section>

            <Footer/>
        </div>
    )
}

export default IdentifyOption