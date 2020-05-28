import React from "react";
import ProductItem from "../../SelectProduct/ProductItem";
import {SVG} from "../../../../../utils/icons";
import './ProductSlider.less';

const ProductSlider = ({product}) => {

    return (
        <section className="products-slider">
            <button className={'prev'}>
                <SVG id={'slider-arrow'}/>
            </button>

            <div className="container">
                <ProductItem
                    product={product}
                />
            </div>

            <button className={'next'}>
                <SVG id={'slider-arrow'}/>
            </button>
        </section>
    )
};

export default ProductSlider;