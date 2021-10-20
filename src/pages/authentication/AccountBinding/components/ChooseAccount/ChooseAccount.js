import React from "react";
import {SVG} from "../../../../../utils/icons";
import './ChooseAccount.less';
import {Radio} from "antd"

const ChooseAccount = ({onGoNextStep}) => {

    return (
        <section className={'choose-account'}>
            <h2>Choose Account type you want to connect</h2>

            <ul className="accounts-type-list">
                <li className={'active'}>
                    <Radio checked/>

                    <div className="col">
                        <h3>Seller Account</h3>
                        <p>You sell directly to Amazon’s customers</p>
                    </div>
                </li>
                <li>
                    <Radio disabled/>

                    <div className="col">
                        <h3>Vendor Account <span>soon</span></h3>
                        <p>You sell directly to Amazon</p>
                    </div>
                </li>
                <li>
                    <Radio disabled/>

                    <div className="col">
                        <h3>KDP Account <span>soon</span></h3>
                        <p>You self-publish books with Kindle Direct Publishing</p>
                    </div>
                </li>
            </ul>


            <div className="actions">
                <button onClick={onGoNextStep} className={'btn default next'}>Next <SVG id={'right-white-arrow'}/></button>
            </div>
        </section>
    )
};

export default ChooseAccount;