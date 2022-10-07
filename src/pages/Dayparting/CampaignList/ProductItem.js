import React from "react"
import noImage from "../../../assets/img/no-image-available.svg"
import {SVG} from "../../../utils/icons"
import {amazonDefaultImageUrls} from "../../../components/ProductList/ProductItem"

export const ProductItem = ({
                                product: {id, asin, name, sku, image_url, variations},
                                onSelect,
                                product,
                                selectedProduct,
                                openedProduct,
                                onOpenChild,
                                openedProductOnSetting,
                                onChildSelect
                            }) => {
    const switchList = (e) => {
        e.stopPropagation()
        onOpenChild(id)
    }

    return (
        <div className={`product-item ${selectedProduct.id === id ? 'active' : ''}`}>
            <div className={`product-information ${openedProduct === id && 'opened-child-list'}`}
                 onClick={() => onSelect(product)}>
                <div className="image-block">
                    <div className="image">
                        <img src={amazonDefaultImageUrls.includes(image_url) ? noImage : image_url} alt=""/>
                    </div>
                </div>


                <div className="product-item-content">
                    <div className="caption" title={name}>
                        <span className={'short-name'}>{name}</span>
                    </div>


                    <div className='detail'>
                        <div className="asin" title={asin}>
                            <span> ASIN: </span>
                            <span title={asin}>{asin}</span>
                        </div>

                        <div className="sku" title={sku}>
                            <span> SKU: </span>
                            <span title={sku}>{sku}</span>
                        </div>
                    </div>
                </div>

                <div
                    className={`open-children-list-button ${variations?.length > 0 ? 'has-variations' : ''} ${(openedProduct === id || openedProductOnSetting === id) ? 'opened' : ''}`}
                    onClick={variations?.length > 0 && switchList}
                >
                    {variations?.length > 0 && <SVG id='select-icon'/>}
                </div>

            </div>

            {variations?.length > 0 && (openedProduct === id) && <div className='product-children-list'>
                {variations.map(childrenProduct => (
                    <div className={`children-product-item ${selectedProduct.id === childrenProduct.id ? 'active' : ''}`}
                         onClick={() => onChildSelect && onChildSelect(childrenProduct)}>
                        <div className="children-indicator"/>

                        <div key={childrenProduct.id} className='children-information'>

                            <img src={childrenProduct.image_url} alt=""/>

                            <div className="product-item-content">
                                <div className="caption">{childrenProduct.name}</div>

                                <div className='detail'>
                                    <div className="asin">
                                        <span> ASIN: </span>
                                        <span title={childrenProduct.asin}>{childrenProduct.asin}</span>
                                    </div>

                                    <div className="sku">
                                        <span> SKU: </span>
                                        <span title={childrenProduct.sku}>{childrenProduct.sku}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>}
        </div>
    )
}