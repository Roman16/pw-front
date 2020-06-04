import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import './ChooseCampaign.less';
import '../ZeroToHero.less';
import sponsoredProductsImage from '../../../assets/img/zth/sponsored-products-image.svg';
import sponsoredBrandsImage from '../../../assets/img/zth/sponsored-brands-image.svg';
import sponsoredDisplayImage from '../../../assets/img/zth/sponsored-display-image.svg';
import {zthActions} from "../../../actions/zth.actions";
import {history} from "../../../utils/history";
import {zthServices} from "../../../services/zth.services";
import HasIncompleteBatch from "../HasIncompleteBatch/HasIncompleteBatch";

const ChooseCampaign = () => {
    const [hasIncompleteBatch, setIncompleteBatch] = useState(false),
        [visibleWindow, setVisibleWindow] = useState(false);

    const dispatch = useDispatch();

    function handleContinue(campaign) {
        if (hasIncompleteBatch) {
            setVisibleWindow(true)
        } else {
            dispatch(zthActions.setCampaign(campaign));
            history.push('/zero-to-hero/ppc-structure');
        }
    }

    useEffect(() => {
        zthServices.checkIncompleteBatch()
            .then(res => {
                if (res.result !== null) {
                    setIncompleteBatch(true)
                }
            })
    }, []);

    return (
        <div>

            <section className='choose-campaign'>
                <h2>Choose Your Campaign Type</h2>

                <div className="campaign-types">
                    <div>
                        <img src={sponsoredProductsImage} alt=""/>

                        <h3>Sponsored Products</h3>

                        <p>
                            Create a semantic core for your Sponsored Products campaigns. It will include keywords
                            and product targetings (ASIN’s. categories).
                        </p>

                        <button
                            className='btn default'
                            onClick={() => handleContinue('sponsored_products')}
                        >
                            Continue
                        </button>
                    </div>

                    <div>
                        <img src={sponsoredBrandsImage} alt=""/>
                        <h3>Sponsored Brands</h3>

                        <p>
                            Showcase a collection of products to shoppers actively searching with related keywords
                            on Amazon.
                        </p>

                        <button
                            className='btn default'
                            onClick={() => handleContinue('sponsored_brands')}
                            disabled
                        >
                            Coming soon
                        </button>
                    </div>

                    <div>
                        <img src={sponsoredDisplayImage} alt=""/>
                        <h3>Sponsored Display</h3>

                        <p>
                            Re-engage shoppers off Amazon who viewed your products or similar products, and drive
                            them to your detail pages.
                        </p>

                        <button
                            className='btn default'
                            onClick={() => handleContinue('sponsored_display')}
                            disabled
                        >
                            Coming soon
                        </button>
                    </div>
                </div>
            </section>

            {visibleWindow && <HasIncompleteBatch visible/>}
        </div>
    )
};

export default ChooseCampaign;