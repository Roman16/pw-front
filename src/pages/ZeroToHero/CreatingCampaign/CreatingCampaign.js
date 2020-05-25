import React, {memo} from "react";
import '../ZeroToHero.less';
import './CreatingCampaign.less';
import ProductAmountSlider from "../components/ProductAmountSlider/ProductAmountSlider";
import SelectProduct from "./SelectProduct/SelectProduct";
import ProductSettings from "./ProductSettings/ProductSettings";
import KeywordList from "./KeywordList/KeywordList";
import Payment from "./Payment/Payment";


const CreatingCampaign = () => {

    return (
        <div className='zero-to-hero-page creating-campaign-page'>
            <h2>Welcome to Zero to Hero set up page. Let’s do the magic!</h2>

            <ProductAmountSlider/>

            <SelectProduct />

            <ProductSettings/>

            <KeywordList/>

            <Payment/>
        </div>
    )
};

export default memo(CreatingCampaign);