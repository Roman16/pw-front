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
                    Our algorithm has started to create your campaigns. Because of the high volume and complexity of
                    this process of creating professionally structured campaigns from scratch, it takes our system
                    up to
                    6 hours to create the campaigns. This time will be reduced in the upcoming time.
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