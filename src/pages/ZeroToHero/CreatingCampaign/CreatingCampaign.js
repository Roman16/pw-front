import React, {memo} from "react";
import '../ZeroToHero.less';
import './CreatingCampaign.less';
import ProductAmountSlider from "../components/ProductAmountSlider/ProductAmountSlider";
import ProductSettings from "./ProductSettings/ProductSettings";
import AllProducts from "./SelectProduct/AllProducts";
import SelectedProduct from "./SelectProduct/SelectedProduct";
import HasIncompleteBatch from "../HasIncompleteBatch/HasIncompleteBatch";


const CreatingCampaign = () => {
    return (
        <div className='zero-to-hero-page creating-campaign-page'>
            <ProductAmountSlider description/>

            <AllProducts/>

            <SelectedProduct/>

            <ProductSettings/>

            <HasIncompleteBatch/>
        </div>
    )
};

export default memo(CreatingCampaign);