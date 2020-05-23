import React, {useState} from "react";

import './Marketing.less';
import '../ZeroToHero.less';
// import ppcStructureImage from '../../../assets/img/zero-to-hero/ppc-structure.svg';
// import arrowRight from "../../../assets/img/icons/arrow-right-white.svg";
import {zthActions} from "../../../actions/zth.actions";
import {history} from "../../../utils/history";
import ProductAmountSlider from "../components/ProductAmountSlider/ProductAmountSlider";

const benefitsList = [
    'You are starting with a lot of relevant keywords, so you don’t need to spend a lot of money to gather these keywords from search-term reports in the future.',
    'No need to know how to research for keywords and set up Amazon PPC campaigns, we automate this process for you.',
    'This PPC Structure is like the live organism that improves over time with the improvement of your sales.',
    'With a lot of mid and long-tail keywords, your conversion rate will be high, so you’ll get more keyword ranking juice from Amazon.',
    'This structure gives you a precise statistic on every keyword that you have in your campaign.',
    'We are using keywords that your competitors are getting sales for and keywords that you need to steel the market share to grow brand awareness.'
];

const Marketing = () => {
    function handleContinue() {
        history.push('/zero-to-hero/creating');
    }

    return (
        <div className='zero-to-hero-page'>
            <h2>Create and Upload PPC Campaign Structure from Scratch</h2>

            <section className="marketing-block">
                <ProductAmountSlider/>

                <div className="block-annotation"><span>*</span> All variations counts as one Semantic Core</div>

                <div className="row">
                    <div className="col">
                        <h2>Here is the PPC structure you’ll receive:</h2>
                        <div className="image">
                            {/*<img src={ppcStructureImage} alt=""/>*/}
                        </div>
                    </div>

                    <div className="col">
                        <h2>Benefits of this structure:</h2>

                        <div className="list">
                            {benefitsList.map((item, index) => (
                                <div>
                                    <span className="index">{index + 1}</span>
                                    <span className="text">{item}</span>
                                </div>
                            ))}
                        </div>

                        <button className='btn default' onClick={handleContinue}>
                            Start Creating
                            {/*<img src={arrowRight} alt=""/>*/}
                        </button>
                    </div>
                </div>

            </section>
        </div>
    )
};

export default Marketing