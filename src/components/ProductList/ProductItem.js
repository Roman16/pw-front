import React from 'react'
import {func, bool, string} from 'prop-types'
import {SVG} from "../../utils/icons"
import InformationTooltip from "../Tooltip/Tooltip"
import noImage from '../../assets/img/no-image-available.svg'

// default product image urls
export const amazonDefaultImageUrls = ['https://images-na.ssl-images-amazon.com/images/I/01RmK+J4pJL._SL75_.gif', '/img/products/product-1.png']

const ProductItem = ({
                         product: {id, asin, name, sku, image_url, under_optimization, has_optimization_results, variations},
                         onClick,
                         product,
                         isActive,
                         onOpenChild,
                         openedProduct,
                         openedProductOnSetting
                     }) => {

    const switchList = (e) => {
        e.stopPropagation()
        onOpenChild(id)
    }

    return (
        <div
            className={`product-item ${isActive ? 'active' : ''}`}
            onClick={() => onClick(product)}
        >
            <div className={`product-information ${openedProduct === id && 'opened-child-list'}`}>
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
                            <span>{asin}</span>
                        </div>

                        <div className="sku" title={sku}>
                            <span> SKU: </span>
                            <span>{sku}</span>
                        </div>
                    </div>
                </div>

                <div
                    className={`open-children-list-button ${variations ? 'has-variations' : ''} ${(openedProduct === id || openedProductOnSetting === id) ? 'opened' : ''}`}
                    onClick={variations && switchList}
                >
                    {variations && <SVG id='select-icon'/>}
                </div>

                <div className='optimization-status'>
                    {/*<InformationTooltip*/}
                    {/*    arrowPointAtCenter={true}*/}
                    {/*    type={'custom'}*/}
                    {/*    description={'Product has new changes'}*/}
                    {/*    position={'topRight'}*/}
                    {/*>*/}
                    {/*    <div className='has-changes'/>*/}
                    {/*</InformationTooltip>*/}

                    {under_optimization && has_optimization_results && <InformationTooltip
                        arrowPointAtCenter={true}
                        type={'custom'}
                        description={'Product on optimization'}
                        position={'topRight'}
                    >
                        <div className='on-optimization'/>
                    </InformationTooltip>}

                    {under_optimization && !has_optimization_results && <InformationTooltip
                        arrowPointAtCenter={true}
                        type={'custom'}
                        description={'Waiting for data'}
                        position={'topRight'}
                    >
                        <div className='optimization-processing'/>
                    </InformationTooltip>}

                </div>
            </div>

            {(variations) && (openedProduct === id) && <div className='product-children-list'>
                {variations.map(childrenProduct => (
                    <div className={'children-product-item'}>
                        <div className="children-indicator"/>

                        <div key={childrenProduct.id} className='children-information'>

                            <img src={childrenProduct.image_url} alt=""/>

                            <div className="product-item-content">
                                <div className="caption">{childrenProduct.name}</div>

                                <div className='detail'>
                                    <div className="asin">
                                        <span> ASIN: </span>
                                        <span>{childrenProduct.asin}</span>
                                    </div>

                                    <div className="sku">
                                        <span> SKU: </span>
                                        <span>{childrenProduct.sku}</span>
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

ProductItem.propTypes = {
    isActive: bool,
    onClick: func,
    asin: string,
    captions: string,
    sku: string,
    imageUrl: string,
    underOptimization: bool
}

ProductItem.defaultProps = {
    isActive: false,
    onClick: () => {
    },
    asin: null,
    captions: null,
    sku: null,
    imageUrl: null,
    underOptimization: false
}

export default ProductItem
