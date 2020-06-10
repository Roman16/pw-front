import React from "react";
import image from '../../../assets/img/zth/success-image.png';
import './ThankPageZTH.less';
import {history} from "../../../utils/history";

const ThankPage = () => {
    return (
        <div className={'success-page-zth'}>
            <section>
                <h1>
                    Congratulations! <br/> Your campaigns are in progress!
                </h1>

                <p>
                    It takes up to 15 minutes for our algorithm to create and upload professionally structured campaigns
                    to your Seller Central account.
                </p>

                <p>
                    Make sure you paused the SKU's with Zero to Hero campaigns in other ad campaigns that weren't
                    created by our software to prevent the competition.
                </p>

                <button
                    className={'btn default'}
                    onClick={() => history.push('/zero-to-hero/settings')}
                >
                    View Status
                </button>

                <div className="image">
                    <img src={image} alt=""/>
                </div>
            </section>
        </div>
    )
};

export default ThankPage;