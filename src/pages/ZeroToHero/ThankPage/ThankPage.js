import React from "react";
import './ThankPageZTH.less';
import {history} from "../../../utils/history";

const ThankPage = () => {
    return (
        <div className={'success-page-zth'}>
            <section>
                <h1>
                    Congratulations! Generation of your campaigns has started!
                </h1>

                <p>
                    Zero to Hero software started generation of your campaigns structure based on inputs you <br/>
                    provided. Due to the complexity of the process and high volume of data required to be processed <br/>
                    to create professionally structured campaigns from scratch, it may take our system up to 6 hours <br/>
                    to generate your campaigns.
                </p>

                <button
                    className={'btn default'}
                    onClick={() => history.push('/zero-to-hero/settings')}
                >
                    View Status
                </button>
            </section>
        </div>
    )
};

export default ThankPage;