import React from "react"
import noImage from "../../../assets/img/no-image-available.svg"
import {SVG} from "../../../utils/icons"
import {amazonDefaultImageUrls} from "../../../components/ProductList/ProductItem"
import {scanningStatusEnums} from "../PPCAudit"
import loaderImg from '../../../assets/img/loader.svg'
import InformationTooltip from "../../../components/Tooltip/Tooltip"

const ProductItem = ({
                         product: {id, asin, name, sku, image_url, variations, ppc_audit_indicator_state},
                         openedProduct,

                         onClick,
                         product,
                         isActive,
                         onOpenChild,
                         openedProductOnSetting
                     }) => {
    const switchList = (e) => {
        e.stopPropagation()
        onOpenChild(id)
    }

    return (<li>
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
                    className={`open-children-list-button ${variations.length > 0 ? 'has-variations' : ''} ${(openedProduct === id || openedProductOnSetting === id) ? 'opened' : ''}`}
                    onClick={variations.length > 0 && switchList}
                >
                    {variations.length > 0 && <SVG id='select-icon'/>}
                </div>

                {ppc_audit_indicator_state && <div className="status-indicator"><ScanningIndicator
                    status={ppc_audit_indicator_state}
                /></div>}
            </div>

            {variations.length > 0 && (openedProduct === id) && <div className='product-children-list'>
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
    </li>)
}

const ScanningIndicator = ({status}) => {
    const state = status.state

    if (state === scanningStatusEnums.PROCESSING || state === scanningStatusEnums.PROGRESS) return <InformationTooltip
        type={'custom'}
        position={'bottomRight'}
        description={'Scanning is in progress'}
    >
        <img src={loaderImg} alt=""/>
    </InformationTooltip>
    else if (state === scanningStatusEnums.FINISHED) return <InformationTooltip
        type={'custom'}
        position={'bottomRight'}
        description={'Scanning complete'}
    >
        <div className="indicator finished"/>
    </InformationTooltip>
    else if (state === scanningStatusEnums.FAILED) return <InformationTooltip
        type={'custom'}
        position={'bottomRight'}
        description={'Scanning failed'}
    >
        <div className="indicator failed"/>
    </InformationTooltip>
    else if (state === scanningStatusEnums.EXPIRED) return <InformationTooltip
        type={'custom'}
        position={'bottomRight'}
        description={'Scanning has expired'}
    >
        <div className="indicator complete"/>
    </InformationTooltip>
    else if (state === scanningStatusEnums.STOPPED) return <InformationTooltip
        type={'custom'}
        position={'bottomRight'}
        description={'Scanning canceled by user'}
    >
        <div className="indicator expired"/>
    </InformationTooltip>
    else return ''
}

export default ProductItem