import React from "react"
import {Radio} from "antd"
import AllProducts from "./AllProducts"
import './ProductAdsDetails.less'
import SelectedProduct from "./SelectedProduct"


const ProductAdsDetails = ({onChange, createData}) => {
    return (<div className={'step step-3 product-ads-details-step'}>
        <Radio.Group
            value={createData.createProductAds}
            onChange={({target: {value}}) => onChange({createProductAds: value})}
        >
            <h4>Product Ads</h4>

            <Radio value={true}>
                Create Product Ads
            </Radio>

            <Radio value={false}>
                Do not create Product Ads
            </Radio>
        </Radio.Group>

        <h3 className={!createData.createProductAds ? `disabled` : ''}>Products</h3>

        <div className={`row ${!createData.createProductAds ? 'disabled' : ''}`}>
            <AllProducts
                createData={createData}
                disabledBlock={!createData.createProductAds}

                onChange={onChange}
            />

            <SelectedProduct
                selectedProducts={createData.selectedProductAds}
                onChange={onChange}
            />
        </div>
    </div>)
}

export default ProductAdsDetails
