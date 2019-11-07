import React from "react";
import './ProductBreakdown.less';
import ProductsList from "./ProductsList";
import {Switch} from "antd";

const ProductBreakdown = () => {

    return (
        <div className='product-breakdown'>
            <div className="title">
               <span> Product Breakdown</span>

                <div className='switch-block'>
                    Show only Active Listings on Amazon

                    <Switch
                        // onChange={this.handleChangeSwitch}
                    />
                </div>
            </div>

            <div>
                <ProductsList/>
            </div>
        </div>
    )
};

export default ProductBreakdown;