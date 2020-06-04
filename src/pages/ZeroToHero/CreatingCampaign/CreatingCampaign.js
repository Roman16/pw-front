import React, {memo, useEffect} from "react";
import '../ZeroToHero.less';
import './CreatingCampaign.less';
import ProductAmountSlider from "../components/ProductAmountSlider/ProductAmountSlider";
import ProductSettings from "./ProductSettings/ProductSettings";
import AllProducts from "./SelectProduct/AllProducts";
import SelectedProduct from "./SelectProduct/SelectedProduct";
import {zthServices} from "../../../services/zth.services";


const CreatingCampaign = () => {
    useEffect(() => {
        zthServices.checkIncompleteBatch()
            .then(res => {
                console.log(res);
            })
    });

    return (
        <div className='zero-to-hero-page creating-campaign-page'>
            <h2>Welcome to Zero to Hero set up page. Let’s do the magic!</h2>

            <ProductAmountSlider description/>

            <AllProducts/>

            <SelectedProduct/>

            <ProductSettings/>
        </div>
    )
};

export default memo(CreatingCampaign);