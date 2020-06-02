import React, {memo} from "react";
import '../ZeroToHero.less';
import './CreatingCampaign.less';
import ProductAmountSlider from "../components/ProductAmountSlider/ProductAmountSlider";
import ProductSettings from "./ProductSettings/ProductSettings";
import AllProducts from "./SelectProduct/AllProducts";
import SelectedProduct from "./SelectProduct/SelectedProduct";


const CreatingCampaign = () => {

    return (
        <div className='zero-to-hero-page creating-campaign-page'>
            <h2>Welcome to Zero to Hero set up page. Let’s do the magic!</h2>

            <ProductAmountSlider/>

            <AllProducts/>

            <SelectedProduct/>

            <ProductSettings/>
        </div>
    )
};

export default memo(CreatingCampaign);