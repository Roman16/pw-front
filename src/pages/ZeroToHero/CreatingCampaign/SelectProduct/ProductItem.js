import React from "react";
import {SVG} from "../../../../utils/icons";

const ProductItem = ({product, onSelect, isSelected, isDisabled, isOpened, onOpenVariations, onRemove}) => {

    return (
        <>
            <div className={`product-item ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                 onClick={() => !isDisabled && onSelect && onSelect(product, isSelected)}>
                <div className="photo">
                    <img src={product.image_url} alt=""/>
                </div>

                <div className="col">
                    <div className="row">
                        <div className="product-name" title={product.name}>
                            {product.name}
                        </div>

                        {product.variations && <button
                            onClick={e => {
                                e.stopPropagation();
                                onOpenVariations(product.id)
                            }}
                            className={`variations-button ${isOpened ? 'opened' : ''}`}
                        >
                            <SVG id='select-icon'/>
                        </button>}
                    </div>

                    <div className="row">
                        <div className="price">$35.99</div>
                        <div className="stock">In Stock</div>
                    </div>

                    <div className="row asin-sku">
                        <div className="asin"><b>ASIN:</b> {product.asin}</div>
                        <div className="sku"><b>SKU:</b> {product.sku}</div>

                        {isDisabled && <div className="added">Added</div>}
                        {onRemove && <button className="remove" onClick={onRemove}>Remove</button>}
                    </div>
                </div>
            </div>

            {product.variations && isOpened &&
            <div className={`variations-list ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}>
                {product.variations.map(variationProduct => (
                    <div className={'variation-item'} onClick={() => !isDisabled && onSelect && onSelect(product, isSelected)}>
                        <div className="variation-indicator"/>
                        <ProductItem
                            product={variationProduct}
                            onSelect={() => {
                            }}
                        />
                    </div>
                ))}
            </div>}
        </>
    )
};

export default ProductItem;