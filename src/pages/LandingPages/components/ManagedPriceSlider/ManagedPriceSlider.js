import React from "react";
import {Link} from "react-router-dom";
import './ManagedPriceSlider.less';
import {SVG} from "../../../../utils/icons";


const ManagedPriceSlider = () => {

    const includes = [
        'Capturing Marketing Opportunities ',
        'Monthly Keyword Research',
        'Designated Account Success Manager',
        'Weekly&Monthly Performance Email Reports',
        'Weekly Strategy Calls',
        'Quarterly Strategy Review',
        'Daily Keywords&Bids Management',
        'Operational Advertising Management',
        'Designated Amazon Business Strategy Expert',
        'SP, SB, SD Campaigns Creation, and Daily Management',
    ];

    return (
        <section className={'manage-price-slider'}>
            <h3>What’s your monthly Amazon Advertising Spend?</h3>

            <div className="row">
                <div className="col">
                    <div className="price">
                        <label>Starts <br/> from</label>
                        <span className={'dollar'}>$</span>
                        1,500
                        <label>/ month</label>
                    </div>

                    <Link to={'registration'} className={'btn default'}>
                        LET'S TALK
                    </Link>
                </div>

                <div className="includes">
                    <h4>Includes:</h4>

                    <ul>
                        {includes.map((text, index) => (
                            <li>
                                <SVG id={`manage-include-icon-${index + 1}`}/>
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </section>
    )
};

export default ManagedPriceSlider;