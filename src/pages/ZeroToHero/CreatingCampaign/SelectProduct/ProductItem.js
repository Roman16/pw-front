import React from "react"
import {SVG} from "../../../../utils/icons"
import {amazonDefaultImageUrls} from "../../../../components/ProductList/ProductItem"
import noImage from "../../../../assets/img/no-image-available.svg"
import InformationTooltip from "../../../../components/Tooltip/Tooltip"
import {Spin} from "antd"

const ProductItem = ({
                         product,
                         onSelect,
                         onSelectVariation,
                         onSelectParent,
                         isSelected,
                         isOpened,
                         onOpenVariations,
                         showChildCount,
                         selectedProducts,
                         fetchVariationsProcessing
                     }) => {

    const isIneligible = product.eligibility_status !== undefined && product.variations ? (product.variations.every(i => i.eligibility_status === 'INELIGIBLE') || product.variations.length === 0) : product.eligibility_status === 'INELIGIBLE'

    return (
        <>
            <div className={`product-item ${isSelected ? 'selected' : ''} ${isIneligible ? 'disabled' : ''}`}
                 onClick={() => !isIneligible && onSelect && product.variations ? onSelectParent(product, isSelected) : onSelect(product, isSelected)}>
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

                        {showChildCount && product.variations &&
                        <div className="variations-count">
                            This Product has <b>{product.variations.length}</b> child ASIN(s)
                        </div>}
                    </div>
                </div>

                {product.variations && <button
                    onClick={e => {
                        e.stopPropagation()
                        e.preventDefault()
                        onOpenVariations(product.id)
                    }}
                    className={`variations-button ${isOpened ? 'opened' : ''}`}
                >
                    <SVG id='select-icon'/>
                </button>}


                {isIneligible &&
                <div className="eligibility-status">
                    Ineligible
                    <InformationTooltip
                        overlayClassName={'ineligible-description'}
                        description={product.variations ?
                            product.variations.length === 0 ? 'You have already created ZTH campaigns for each variation of this parent product. ZTH campaigns can\'t be created for the empty parent product.' :
                                'All variations of the parent product are ineligible for advertising. Please add an eligible variation.' :
                            <div>This product in not eligible for advertising on Amazon Marketplace, thus we
                                cannot create ZTH campaigns for it. Ineligibility reasons:
                                <ul>
                                    {product.eligibility_status_reasons.map(i => <li>{i.message}</li>)}
                                </ul>
                            </div>}
                    />
                </div>}
            </div>

            {product.variations && isOpened &&
            <div className={`variations-list`}>
                {fetchVariationsProcessing ? <Spin size={'large'}/> : product.variations.map(variationProduct => {
                    const variationIsSelected = !!selectedProducts.find(item => item.id === variationProduct.id) || isSelected,
                        variationIsDisabled = variationProduct.eligibility_status === 'INELIGIBLE'

                    return (
                        <div
                            className={`variation-item ${(isSelected || variationIsSelected) ? 'selected' : ''} ${(isIneligible || variationIsDisabled) ? 'disabled' : ''}`}
                            onClick={() => !variationIsDisabled && !isIneligible && onSelectVariation({
                                ...variationProduct,
                                parent_id: product.id
                            }, variationIsSelected)}
                        >
                            <div className="variation-indicator"/>
                            <ProductItem
                                product={variationProduct}
                                onSelect={() => {
                                }}
                            />
                        </div>
                    )
                })}
            </div>}
        </>
    )
}

export default React.memo(ProductItem)
