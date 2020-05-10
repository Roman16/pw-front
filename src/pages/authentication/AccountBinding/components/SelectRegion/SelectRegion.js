import React, {Fragment} from "react";
import {SVG} from "../../../../../utils/icons";
import {Link} from "react-router-dom";
import './SelectRegion.less';

import americaImage from '../../../../../assets/img/north-america-bg.svg';
import europeImage from '../../../../../assets/img/europe-bg.svg';
import asiaImage from '../../../../../assets/img/asia-pacific-bg.svg';

const SelectRegion = ({onGoNextStep, onGoBackStep}) => {

    return (
        <Fragment>
            <section className={'select-region-section'}>
                <h2>What region is this account in?</h2>

                <div className="regions">
                    <div>
                        <div className="image">
                            <img src={americaImage} alt=""/>
                        </div>
                        <h4>North America</h4>
                    </div>

                    <div className='soon'>
                        <div className="image">
                            <img src={europeImage} alt=""/>
                        </div>
                        <h4>Europe <span>soon</span></h4>
                    </div>

                    <div className='soon'>
                        <div className="image">
                            <img src={asiaImage} alt=""/>
                        </div>
                        <h4>Asia-Pacific <span>soon</span></h4>
                    </div>
                </div>

                <div className="actions">
                    <button type={'button'} className="btn white" onClick={onGoBackStep}>
                        <SVG id={'left-grey-arrow'}/>
                        Back
                    </button>

                    <button className="btn default" onClick={onGoNextStep}>
                        Next
                        <SVG id={'right-white-arrow'}/>
                    </button>
                </div>
            </section>

            <div className="section-description">
                <p>Not sure?</p>
                <p><Link to={'/'}>Chat with us</Link></p>
            </div>
        </Fragment>
    )
};

export default SelectRegion;