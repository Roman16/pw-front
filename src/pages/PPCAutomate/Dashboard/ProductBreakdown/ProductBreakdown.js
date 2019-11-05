import React from "react";
import './ProductBreakdown.less';
import ProductsList from "./ProductsList";

const ProductBreakdown = () => {

    return(
        <div className='product-breakdown'>
            <div className="title">
                Product Breakdown

                <button className='btn default'>
                    Show All Products Under Optimization
                </button>
            </div>

            <ProductsList />
        </div>
    )
};

export default ProductBreakdown;