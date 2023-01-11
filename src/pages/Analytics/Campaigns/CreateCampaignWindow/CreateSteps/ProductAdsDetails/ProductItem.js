import React from "react"
import {amazonDefaultImageUrls} from "../../../../../../components/ProductList/ProductItem"
import noImage from "../../../../../../assets/img/no-image-available.svg"
import {SVG} from "../../../../../../utils/icons"

const ProductItem = ({
                         product,
                         onRemove,
                         onAdd,
                         isAdded,
                         disabledBlock
                     }) => {

    return (
        <>
            <div className={`product-item ${isAdded ? 'added' : ''}`}>
                <div className="photo">
                    <img src={amazonDefaultImageUrls.includes(product.image_url) ? noImage : product.image_url} alt=""/>
                </div>

                <div className="col">
                    <div className="row">
                        <div className="product-name" title={product.name}>
                            {product.name}
                        </div>

                        {onRemove && !disabledBlock && <button className="btn icon remove" onClick={onRemove}><SVG id={'close-window-icon'}/></button>}
                    </div>

                    <div className="row asin-sku">
                        <div className="asin"><b>ASIN:</b> {product.asin}</div>
                        <div className="sku"><b>SKU:</b> {product.sku}</div>

                        {isAdded && <div className="added">Added</div>}
                        {product.eligibility_status !== 'ELIGIBLE' && <div className="ineligible">Ineligible</div>}
                        {!onRemove && !isAdded && !onRemove && !disabledBlock && product.eligibility_status === 'ELIGIBLE' && <button className="btn default add" onClick={onAdd}>Add</button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(ProductItem)
