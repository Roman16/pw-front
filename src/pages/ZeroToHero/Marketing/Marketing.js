import React, {useState} from "react";

import './Marketing.less';
import '../ZeroToHero.less';
import ppcStructureImage from '../../../assets/img/zth/zth-structure.png';
import {zthActions} from "../../../actions/zth.actions";
import {history} from "../../../utils/history";
import ProductAmountSlider from "../components/ProductAmountSlider/ProductAmountSlider";
import {Link} from "react-router-dom";

const benefitsList = [
    'One-minute campaigns setup with our data-driven algorithms and you ready to go.',
    'Save time&money by starting with the most relevant keywords in your niche without getting them from auto campaigns.',
    'Professionally structured campaigns that we used in our Agency to grow eight-figure brands.',
    'Spend more time on growing your business while we focus on your advertising performance.',
    'No Amazon Advertising knowledge required. Just feel in some data in 3 easy steps.',
    'You’ll get more than 5 Campaigns and 30-200+ Ad Groups that have their own goal(grow your sales and profits).',
];

const Marketing = () => {
    function handleContinue() {
        history.push('/zero-to-hero/creating');
    }

    return (
        <div className='zero-to-hero-page'>
            <h2>Create and Upload PPC Campaign Structure from Scratch</h2>

            <ProductAmountSlider/>

            <section className="marketing-block">
                <div className="row">
                    <div className="col">
                        <h3>Here is the PPC campaigns structure we create:</h3>
                        <p>
                            To learn more about Zero to Hero structure
                            <Link to={''} target={'_blank'}>watch these video</Link>
                        </p>

                        <div className="image">
                            <img src={ppcStructureImage} alt=""/>
                        </div>
                    </div>

                    <div className="col">
                        <h2>Benefits of Zero to Hero:</h2>

                        <div className="list">
                            {benefitsList.map((item, index) => (
                                <div>
                                    <span className="index">{index + 1}</span>
                                    <span className="text">{item}</span>
                                </div>
                            ))}
                        </div>

                        <button className='btn default' onClick={handleContinue}>
                            Start
                        </button>
                    </div>
                </div>

            </section>
        </div>
    )
};

export default Marketing