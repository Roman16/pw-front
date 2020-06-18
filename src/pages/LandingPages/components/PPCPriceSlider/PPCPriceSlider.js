import React, {useEffect} from "react";
import './PPCPriceSlider.less';
import {history} from "../../../../utils/history";
import $ from "jquery";
import ionRangeSlider from 'ion-rangeslider';

import {Link} from "react-router-dom";
import {SVG} from "../../../../utils/icons";


const PPCPriceSlider = () => {

    const includes = [
        'Fully Automated Amazon Advertising Optimization in 1 Click',
        'Weekly Reports with Useful Information',
        'Automated Harvesting of Search-Terms and Negative Keywords',
        'The only Amazon Seller Tool you need for your business',
        'Amazon Analytics Tool',
        'Friendly Support 24/7',
    ];

    const numberMask = (value, n, x) => {
        let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
        return (+value).toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,').replace('.00', '');
    };

    useEffect(() => {
        $(".js-range-slider").ionRangeSlider({
            min: 0,
            values: [
                0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500, 2000, 2500, 3000, 3500, 4500, 5000,
                6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000,
                22500, 25000, 27500, 30000, 32500, 35000, 37500, 40000, 42500, 45000, 47500, 50000,
                55000, 60000, 65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000
            ],
            hide_min_max: true,
            from: 10,
            from_min: 10,
            prefix: "< $ ",
            max_postfix: "+",
            postfix: "  / month",
            onStart: function () {
                $('.slider-container .slider .irs .irs-bar').html('$ 69');
                setTimeout(() => {
                    $('.irs-single').html('< $ 1,000 / month');
                    $('.slider .irs-handle').html('<div> $69 </div>');

                }, 1)
            },
            onChange: function (data) {
                let value = data.from_value,
                    result = 0,
                    sumElement = $('#result-sum'),
                    barLabel = $('.slider .irs-handle'),
                    barTooltip = $('.slider .irs .irs-single');


                if (value <= 1000) {
                    sumElement.text('69');
                    barLabel.html('<div> $69 </div>');
                    barTooltip.html('< $ 1,000 / month');
                } else {
                    barTooltip.html(`$ ${numberMask(value, 2)} / month`);

                    if (value >= 50000) {
                        result = ((2 / 100) * value) + 500;
                        barLabel.html('<div>$500 + 2% ad spend</div>');
                    } else if (value >= 20000) {
                        result = ((2.5 / 100) * value) + 200;
                        barLabel.html('<div>$200 + 2,5% ad spend</div>');
                    } else {
                        result = ((3 / 100) * value) + 100;
                        barLabel.html('<div>$100 + 3% ad spend</div>');
                    }

                    sumElement.text(numberMask(result));
                }
            }
        });

    }, []);


    return (
        <div className="ppc-price-slider">
            <div className="title">What’s your monthly Amazon Advertising Spend?</div>

            <div className="slider">
                <input className="js-range-slider" type="text"/>
            </div>

            <div className="row">
                <div className="sum">
                    <div className="result-sum">
                        <span className={'dollar'}>$</span>
                        <span id={'result-sum'}>69</span>
                    </div>

                    <p>Estimated price per month based on your <br/> 30-day Amazon Ad Spend.
                        <a href="#guide">How is this calculated?</a>
                    </p>


                    <Link
                        to={'/registration'}
                        className="btn default"
                    >
                        Free Trial
                    </Link>
                </div>

                <div className="includes">
                    <h4>Includes:</h4>

                    <ul>
                        {includes.map((text, index) => (
                            <li>
                                <SVG id={`ppc-include-icon-${index + 1}`}/>
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
};

export default PPCPriceSlider;