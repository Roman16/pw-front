import React from "react";
import {useSelector} from "react-redux";

const SelectedProduct = () => {
    const {productAmount} = useSelector(state => ({
        productAmount: state.zth.productAmount
    }));

    return (
        <div className="col selected-products">
            <div className="header-block">
                <h3>
                    Available Products to Setup
                    <span className="count">{productAmount}</span>
                </h3>

                <div className='selected-products-count'>
                    {/*<div className={'added-count'}><b>{allProducts.length}</b> products added</div>*/}
                    <div className={'added-count'}><b>{0}</b> products added</div>

                    <button className="remove-all-btn">Remove all</button>
                </div>
            </div>


            <div className="products-list">
                {/*{allProducts.map((product, index) => (*/}
                {/*    <div className="product-item" key={product.id}>*/}
                {/*        <div className="photo">*/}
                {/*            <img src={product.image_url} alt=""/>*/}
                {/*        </div>*/}

                {/*        <div className="col">*/}
                {/*            <div className="row">*/}
                {/*                <div className="product-name">{product.name}</div>*/}
                {/*            </div>*/}

                {/*            <div className="row">*/}
                {/*                <div className="price">$35.99</div>*/}
                {/*                <div className="stock">In Stock</div>*/}
                {/*            </div>*/}

                {/*            <div className="row">*/}
                {/*                <div className='asin-sku'>*/}
                {/*                    <span className="asin">ASIN: {product.asin}</span>*/}
                {/*                    <span className="sku">SKU: {product.sku}</span>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*))}*/}
            </div>
        </div>

    )
};

export default SelectedProduct;