import React from "react";
import {SVG} from "../../../../utils/icons";
import {amazonDefaultImageUrls} from "../../../../components/ProductList/ProductItem"
import noImage from "../../../../assets/img/no-image-available.svg"

const ProductItem = ({
                         type,
                         product,
                         onSelect,
                         onSelectVariation,
                         isSelected,
                         isDisabled,
                         isOpened,
                         onOpenVariations,
                         onRemove,
                         showChildCount,
                         selectedProducts,
                         addedProducts
                     }) => {

    return (
        <>
            <div className={`product-item ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                 onClick={() => !isDisabled && onSelect && onSelect(product, isSelected)}>
                <div className="photo">
                    <img src={amazonDefaultImageUrls.includes(product.image_url) ? noImage : product.image_url} alt=""/>
                </div>

                <div className="col">
                    <div className="row">
                        <div className="product-name" title={product.name}>
                            {product.name}
                        </div>
                    </div>

                    {!product.variations ?
                        <div className="row">
                            {(product.item_price !== null && product.item_price !== 0) && <div className="price">
                                ${product.item_price}
                            </div>}

                            <div className="stock">
                                {product.status_on_amazon === 'Active' ?
                                    <span className={'in'}>In Stock</span>
                                    :
                                    <span className={'out'}>Stock Out</span>
                                }
                            </div>
                        </div>
                        :
                        <div className="row">
                            {(product.item_price !== null && product.item_price !== 0) && <div className="price">
                                ${product.item_price}
                            </div>}

                            <div className="stock">
                                {product.variations.every(item => item.status_on_amazon === 'Active') &&
                                <span className={'in'}>All in Stock</span>}
                                {(product.variations.some(item => item.status_on_amazon === 'Active') && product.variations.some(item => item.status_on_amazon !== 'Active')) &&
                                <span className={'some'}>Some Stock Out</span>}
                                {product.variations.every(item => item.status_on_amazon !== 'Active') &&
                                <span className={'out'}>All Stock Out</span>}
                            </div>
                        </div>
                    }

                    <div className="row asin-sku">
                        <div className="asin"><b>ASIN:</b> {product.asin}</div>
                        <div className="sku"><b>SKU:</b> {product.sku}</div>

                        {isDisabled && <div className="added">Added</div>}
                        {onRemove && <button className="remove" onClick={onRemove}>Remove</button>}
                        {showChildCount && product.variations &&
                        <div className="variations-count">
                            This Product has <b>{product.variations.length}</b> child ASIN(s)
                        </div>}
                    </div>
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

            {product.variations && isOpened &&
            <div className={`variations-list`}>
                {product.variations.map(variationProduct => {
                    if (type === 'all_products') {
                        const variationIsSelected = !!selectedProducts.find(item => item.id === variationProduct.id) || isSelected
                            // variationIsAdded = !!addedProducts.find(item => item.id === variationProduct.id);

                        return (
                            <div
                                className={`variation-item ${(isSelected || variationIsSelected) ? 'selected' : ''} ${(isDisabled) ? 'disabled' : ''}`}
                                onClick={() => !isDisabled && onSelect && onSelectVariation({
                                    ...variationProduct,
                                    parent_id: product.id
                                }, variationIsSelected, isSelected)}
                            >
                                <div className="variation-indicator"/>
                                <ProductItem
                                    product={variationProduct}
                                    isDisabled={false}
                                    // isDisabled={!isDisabled}
                                />
                            </div>
                        )
                    } else {
                        return (
                            <div
                                className={`variation-item ${(isSelected) ? 'selected' : ''} ${(isDisabled) ? 'disabled' : ''}`}
                            >
                                <div className="variation-indicator"/>
                                <ProductItem
                                    product={variationProduct}
                                />
                            </div>
                        )
                    }
                })}
            </div>}
        </>
    )
};

export default React.memo(ProductItem);
