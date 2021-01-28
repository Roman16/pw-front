import React from "react"
import sponsoredProductsImage from "../../../../../assets/img/zth/sponsored-products-image.svg"
import sponsoredBrandsImage from "../../../../../assets/img/zth/sponsored-brands-image.svg"
import sponsoredDisplayImage from "../../../../../assets/img/zth/sponsored-display-image.svg"
import {Radio} from "antd"

const AdvertisingType = () => {

    return (<div className={'step step-0 advertising-type-step'}>
        <h4>Choose your campaign type</h4>

        <ul>
            <Radio.Group defaultValue={1}>
                <li>
                    <img src={sponsoredProductsImage} alt=""/>

                    <Radio value={'sponsored_products'}>
                        Dynamic bids - up and down
                    </Radio>

                    <div className="description">
                        Promote products to shoppers actively searching with related keywords or viewing similar
                        products on Amazon.
                    </div>
                </li>

                <li>
                    <img src={sponsoredBrandsImage} alt=""/>

                    <Radio value={'sponsored_brands'}>
                        Dynamic bids - up and down
                    </Radio>
                    <div className="description">
                        Showcase a collection of products to shoppers actively searching with related keywords on
                        Amazon.
                    </div>
                </li>

                <li>
                    <img src={sponsoredDisplayImage} alt=""/>

                    <Radio value={'sponsored_display'}>
                        Dynamic bids - up and down
                    </Radio>

                    <div className="description">
                        Re-engage shoppers off Amazon who viewed your products or similar products, and drive them
                        to your detail pages.
                    </div>
                </li>
            </Radio.Group>
        </ul>
    </div>)
}

export default AdvertisingType
