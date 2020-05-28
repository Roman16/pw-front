import React from "react";
import ProductItem from "../../SelectProduct/ProductItem";
import {SVG} from "../../../../../utils/icons";
import './ProductSlider.less';

const ProductSlider = ({
                           product,
                           productsCount,
                           onNext,
                           onPrev
                       }) => {

    return (
        <section className="products-slider">
            {productsCount > 1 && <button className={'prev'} onClick={onPrev}>
                <SVG id={'slider-arrow'}/>
            </button>}

            <div className="container">
                <ProductItem
                    product={product}
                    showChildCount
                />
            </div>

            {productsCount > 1 && <button className={'next'} onClick={onNext}>
                <SVG id={'slider-arrow'}/>
            </button>}
        </section>
    )
};

export default ProductSlider;