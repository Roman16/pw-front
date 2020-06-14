import React, {useState} from "react";

import './Marketing.less';
import '../ZeroToHero.less';
import ppcStructureImage from '../../../assets/img/zth/zth-structure.png';
import {history} from "../../../utils/history";
import ProductAmountSlider from "../components/ProductAmountSlider/ProductAmountSlider";
import {Link} from "react-router-dom";
import HasIncompleteBatch from "../components/HasIncompleteBatch/HasIncompleteBatch";
import {useSelector} from "react-redux";

const benefitsList = [
    'You are starting with campaigns already packed with lots of relevant keywords. Save your time and money on doing additional future research, and get straight to business!',
    'No prior knowledge of how to perform keyword research is needed. We automate the whole process for you.',
    'Zero to Hero PPC Structure is like a live organism. It improves itself over time, learning from your sales data and adjusting to your ASIN’s unique performance.',
    'With a lot of mid- and long-tail keywords, your average conversion rate will be higher, so you’ll get more keyword ranking juice from Amazon.',
    'Zero to Hero campaign structure gives you precise control and performance data on every keyword that you use (8 unique campaigns with 30-120 ad groups and 300+ relevant keywords)',
    'We actively research your competitors to evaluate relevant keywords they are getting sales form. We then level the playfield by incorporating the best of them into your campaigns.',
];

const Marketing = () => {
    function handleContinue() {
        history.push('/zero-to-hero/creating');
    }

    const {availableTokens} = useSelector(state => ({
        availableTokens: state.zth.paidBatch.available_tokens
    }));

    return (
        <div className='zero-to-hero-page'>
            {!availableTokens && <ProductAmountSlider onNextStep={handleContinue}/>}

            <section className="marketing-block">
                <div className="row">
                    <div className="col">
                        <h3>Here is the PPC campaigns structure we create:</h3>
                        {/*<p>*/}
                        {/*    To learn more about Zero to Hero structure*/}
                        {/*    <Link to={''} target={'_blank'}>watch these video</Link>*/}
                        {/*</p>*/}

                        <div className="image">
                            <img src={ppcStructureImage} alt=""/>
                        </div>
                    </div>

                    <div className="col">
                        <h2>Why Zero to Hero Campaigns Creator?</h2>

                        <div className="list">
                            {benefitsList.map((item, index) => (
                                <div>
                                    <span className="index">{index + 1}</span>
                                    <span className="text">{item}</span>
                                </div>
                            ))}
                        </div>

                        <button className='btn default p70' onClick={handleContinue}>
                            Start
                        </button>
                    </div>
                </div>

            </section>

            <HasIncompleteBatch/>
        </div>
    )
};

export default Marketing