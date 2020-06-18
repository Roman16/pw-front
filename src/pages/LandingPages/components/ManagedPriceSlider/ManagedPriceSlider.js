import React from "react";
import {Link} from "react-router-dom";
import './ManagedPriceSlider.less';
import {SVG} from "../../../../utils/icons";
import presentation from '../../../../assets/files/Presentation vol2 .pdf';

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


    const onOpenChat = () => {
        window.Intercom('show')
    };

    return (
        <section className={'manage-price-slider'}>
            <h3>What’s your monthly Amazon Advertising Spend?</h3>

            <div className="row">
                <div className="col">
                    <div className="price">
                        <label>Starts <br/> from</label>

                        $ flat fee + <br/>% ad spend

                        <label>/ month</label>
                    </div>

                    <button className={'btn default'} onClick={onOpenChat}>
                        LET'S TALK
                    </button>
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

                    <a href={presentation} download className={'btn white'}>
                        download the presentation
                    </a>
                </div>

            </div>
        </section>
    )
};

export default ManagedPriceSlider;