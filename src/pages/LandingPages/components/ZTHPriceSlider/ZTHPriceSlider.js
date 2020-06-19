import React from "react";
import './ZTHPriceSlider.less';
import {SVG} from "../../../../utils/icons";
import {Link} from "react-router-dom";

const includesList = [
    'One-minute campaigns setup with our data-driven algorithms and you ready to go.',
    'Professionally structured campaigns that we used in our Agency to grow eight-figure brands.',

    'Keyword Research file with 500-2,500 relevant keywords that you can use for Google Adwords and Bing',
    'Ready-to-use file with keywords for you listing SEO and backend keywords',

    'Save time&money by starting with the most relevant keywords in your niche without getting them from auto campaigns.',
    '11 Campaigns with their mission (Keywords harvesting, Brand protection, keywords indexation, etc.).'
];

const ZTHPriceSlider = () => {

    return (
        <section className={'zth-price-slider'}>
            <div className="container">
                <div className="plan-information">
                    <h3>
                        Get the best Advertising Campaign structure that will last you for years.
                    </h3>

                    <div className="row">
                        <div className="col">
                            <div className="price">
                                <span className={'dollar'}>$</span>
                                500
                                <span>
                                        One time fee <br/> per Product
                                    </span>
                            </div>

                            <ul>
                                <li>* One-time fee per one Product</li>
                                <li>* Variations are included with no additional cost.</li>
                            </ul>

                            <Link to={'registration'} className={'btn default'}>
                                START NOW
                            </Link>
                        </div>

                        <div className="col includes">
                            <h4>Includes:</h4>

                            <ul>
                                {includesList.map((text, index) => (
                                    <li>
                                        <SVG id={`includes-icon-${index + 1}`}/>
                                        {text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
};

export default ZTHPriceSlider;