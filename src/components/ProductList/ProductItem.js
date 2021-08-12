import React from 'react'
import {func, bool, string} from 'prop-types'
import {SVG} from "../../utils/icons"
import InformationTooltip from "../Tooltip/Tooltip"
import noImage from '../../assets/img/no-image-available.svg'
import CustomSelect from "../Select/Select"

// default product image urls
export const amazonDefaultImageUrls = ['https://images-na.ssl-images-amazon.com/images/I/01RmK+J4pJL._SL75_.gif', '/img/products/product-1.png']

const indicatorStateVariations = {
    'STOPPED_BY_USER': 'Optimization is stopped by user',
    'STOPPED_BY_SYSTEM': 'Optimization is stopped by system',
    'PRODUCT_COGS_MISSING': 'Product doesn’t have CoGS',
    'PRODUCT_FEE_MISSING': 'Couldn’t calculate Amazon Fees for product',
    'RUNNING_WITH_NO_CHANGES_FOR_1D': `Product is on optimization, but no changes for 1 day or more`,
    'OPERATING_OK': 'Product is on optimization'
}

const ProductItem = ({
                         product: {id, asin, name, sku, image_url, under_optimization, has_optimization_results, variations, optimization_indicator_state},
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

                {optimization_indicator_state && <div className='optimization-status'>
                    <OptimizationIndicator
                        indicatorState={optimization_indicator_state}
                    />
                </div>}
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

const OptimizationIndicator = ({indicatorState}) => {
    if (indicatorState !== null) {
        const {state, level} = indicatorState

        return (<InformationTooltip
            arrowPointAtCenter={true}
            type={'custom'}
            description={indicatorStateVariations[state] || state}
            position={'topRight'}
        >
            <>
                {(level === 'INDICATOR_STATUS_EMERGENCY' || level === 'INDICATOR_STATUS_ALERT' || level === 'INDICATOR_STATUS_CRITICAL' || level === 'INDICATOR_STATUS_ERROR') &&
                <div className='optimization-failed'/>}
                {(level === 'INDICATOR_STATUS_WARNING' || level === 'INDICATOR_STATUS_NOTICE' || level === 'INDICATOR_STATUS_INFORMATIONAL') &&
                <div className='optimization-processing'/>}
                {level === 'INDICATOR_STATUS_OK' && <div className='on-optimization'/>}
            </>
        </InformationTooltip>)

    } else return ''
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
