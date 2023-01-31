import React, {useState} from "react"
import ProductItem from "./ProductItem"

const SelectedProduct = ({selectedProducts, onChange}) => {
    const removeProductHandler = (id) => {
        onChange({selectedProductAds: [...selectedProducts.filter(product => product.id !== id)]})
    };

    return (
        <>
            <div className="col selected-products">
                <div className="header-block">
                    <h4>
                        Added Products
                    </h4>

                    <div className='selected-products-count'>
                        <div className={'added-count'}><b>{selectedProducts.length}</b> products added</div>

                        {/*{selectedProducts.length > 0 && <button*/}
                        {/*    className="remove-all-btn"*/}
                        {/*    onClick={() => onChange({selectedProductAds: []})}*/}
                        {/*>*/}
                        {/*    Remove all*/}
                        {/*</button>}*/}
                    </div>
                </div>


                <div className="products-list">
                    {selectedProducts.map((product, index) => (
                        <ProductItem
                            key={product.id}
                            product={product}

                            onRemove={() => removeProductHandler(product.id)}
                        />
                    ))}
                </div>
            </div>
        </>
    )
};

export default SelectedProduct;
