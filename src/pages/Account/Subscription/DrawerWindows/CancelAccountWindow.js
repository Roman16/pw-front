import React from 'react';

import cancel from '../../../../assets/img/cancel.svg';
import safe from '../../../../assets/img/safe.svg';
import bag from '../../../../assets/img/bag.svg';
import restart from '../../../../assets/img/restart.svg';
import square from '../../../../assets/img/icons/green-square.svg';

const CancelAccountWindow = ({onCancel}) => {
    return (
        <div className="cancel">
            <div className="cancel-wrap">
                <h3 className="title">Cancel Your Account</h3>
                <img className="cancel-logo" src={cancel} alt="cancel"/>
                <h2 className="main-title">
                    Did you know that you can pause your ProfitWhales subscription?
                </h2>

                <p className="main-text">
                    <span>Don't lose all of your work!</span> When you pause your
                    ProfitWhales account you will still have access to all your
                    Advertising Data Points
                </p>

                <p className="text">
                    Pause your account for a lowered price to
                    <span>$19.99/month</span>
                </p>

                <ul className="advantages-list">
                    <li className="advantages">
                        <img className="advantages-img" src={safe} alt="safe"/>
                        <p className="advantages-text">
                            Have access to the dashboard and advertising change history
                        </p>
                    </li>
                    <li className="advantages">
                        <img className="advantages-img" src={bag} alt="bag"/>
                        <p className="advantages-text">Don’t lose the valuable data</p>
                    </li>
                    <li className="advantages">
                        <img className="restart-img" src={restart} alt="restart"/>
                        <p className="advantages-text">
                            One click to renuew your subscription
                        </p>
                    </li>
                </ul>
            </div>

            <div className="btn-wrapper">
                <div className="btn-wrap">
                    <button className="keep" type="button">
                        Keep my account
                    </button>

                    <button className="pause-btn" type="button" onClick={onCancel}>
                        <img className="pause-img" src={square} alt="square" />
                        Yes, pause my subscription
                    </button>
                </div>
                <button className="cancel-btn" type="button">
                    I still want to cancel
                </button>
            </div>
        </div>
    );
};

export default CancelAccountWindow;
