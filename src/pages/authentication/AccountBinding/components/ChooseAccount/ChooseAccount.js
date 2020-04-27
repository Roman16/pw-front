import React from "react";
import {SVG} from "../../../../../utils/icons";
import './ChooseAccount.less';

const ChooseAccount = ({onGoNextStep}) => {

    return (
        <section className={'choose-account'}>
            <h2>Let’s connect your Seller Central <br/> Account</h2>

            <div className="accounts-type-list">
                <div className={'account-type active'}>
                    <h3>Seller Account</h3>
                    <p>You sell directly to <br/> Amazon’s customers</p>
                </div>

                <div className={'account-type soon'}>
                    <h3>Vendor Account <span>soon</span></h3>
                    <p>You sell directly to <br/> Amazon</p>
                </div>

                <div className={'account-type soon'}>
                    <h3>KDP Account <span>soon</span></h3>
                    <p>You self-publish books <br/> with Kindle Direct <br/> Publishing</p>
                </div>
            </div>

            <div className="actions">
                <button onClick={onGoNextStep} className={'btn default'}>Next <SVG id={'right-white-arrow'}/></button>
            </div>
        </section>
    )
};

export default ChooseAccount;