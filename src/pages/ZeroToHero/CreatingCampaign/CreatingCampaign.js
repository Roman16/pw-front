import React, {memo} from "react";
import '../ZeroToHero.less';
import './CreatingCampaign.less';
import ProductAmountSlider from "../components/ProductAmountSlider/ProductAmountSlider";
import ProductSettings from "./ProductSettings/ProductSettings";
import AllProducts from "./SelectProduct/AllProducts";
import SelectedProduct from "./SelectProduct/SelectedProduct";
import HasIncompleteBatch from "../components/HasIncompleteBatch/HasIncompleteBatch";
import {useSelector} from "react-redux";


const CreatingCampaign = () => {
    const {availableTokens} = useSelector(state => ({
        availableTokens: state.zth.paidBatch.available_tokens
    }));

    return (
        <div className='zero-to-hero-page creating-campaign-page'>
            {/*{!availableTokens && <ProductAmountSlider description/>}*/}

            <AllProducts/>

            <SelectedProduct/>

            <ProductSettings/>

            <HasIncompleteBatch/>
        </div>
    )
};

export default memo(CreatingCampaign);