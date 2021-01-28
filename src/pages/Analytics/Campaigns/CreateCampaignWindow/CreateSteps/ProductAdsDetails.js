import React from "react"
import {Radio} from "antd"
import SelectedProduct from "../../../../ZeroToHero/CreatingCampaign/SelectProduct/SelectedProduct"
import AllProducts from "../../../../ZeroToHero/CreatingCampaign/SelectProduct/AllProducts"

const ProductAdsDetails = () => {

    return (<div className={'step step-3 product-ads-details-step'}>
        <Radio.Group>
            <h4>Product Ads</h4>

            <Radio value={'create'}>
                Create Product Ads
            </Radio>

            <Radio value={'not'}>
                Do not create Product Ads
            </Radio>
        </Radio.Group>

        <h3>Products</h3>
        <div className="row">
            <AllProducts/>

            <SelectedProduct/>
        </div>
    </div>)
}

export default ProductAdsDetails
