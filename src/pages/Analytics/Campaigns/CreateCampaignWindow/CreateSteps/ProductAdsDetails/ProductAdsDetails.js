import React from "react"
import {Radio} from "antd"
import AllProducts from "./AllProducts"
import './ProductAdsDetails.less'
import SelectedProduct from "./SelectedProduct"


const ProductAdsDetails = ({onChange, campaignData}) => {


    return (<div className={'step step-3 product-ads-details-step'}>
        <Radio.Group
            value={campaignData.create_product_ads}
            onChange={({target: {value}}) => onChange({create_product_ads: value})}
        >
            <h4>Product Ads</h4>

            <Radio value={true}>
                Create Product Ads
            </Radio>

            <Radio value={false}>
                Do not create Product Ads
            </Radio>
        </Radio.Group>


        <h3 className={!campaignData.create_product_ads ? `disabled` : ''}>Products</h3>

        <div className={`row ${!campaignData.create_product_ads ? 'disabled' : ''}`}>
            <AllProducts
                campaignData={campaignData}
                disabledBlock={!campaignData.create_product_ads}

                onChange={onChange}
            />

            <SelectedProduct
                selectedProducts={campaignData.selectedProductAds}

                onChange={onChange}
            />
        </div>
    </div>)
}

export default ProductAdsDetails
