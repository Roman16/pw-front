import React from 'react';
import {func, bool, string} from 'prop-types';
import {Icon} from 'antd';
import InformationTooltip from "../Tooltip/Tooltip";

const maxText = (text, length = 60) => {
    if (text && text.length > length) {
        return `${text.slice(0, length)}...`;
    }

    return text;
};

const ProductItem = ({
                         product: {id, asin, name, sku, image_url, under_optimization, has_optimization_results, variations},
                         onClick,
                         product,
                         isActive,
                         onOpenChild,
                         openedProduct,
                         pathname
                     }) => {

    const switchList = (e) => {
        e.stopPropagation();
        onOpenChild(id)
    };

    return (
        <div
            className={`product-item ${isActive ? 'active' : ''}`}
            onClick={() => onClick(product)}
        >
            <div className='product-information'>
                <div className="image-block">
                    <div className="image">
                        <img src={image_url} alt=""/>
                    </div>

                    {variations && <div className={`open-children-list-button ${openedProduct === id && 'opened'}`}
                                        onClick={switchList}>
                        {variations && variations.length}
                        <Icon type="caret-down"/>
                    </div>}
                </div>


                <div className="product-item-content">
                    <div className="caption">
                        <span>{name}</span>
                        {product.has_new_changes && pathname === '/ppc/report' &&
                        <div className='has-new-reports'>New</div>}

                        <div className='full-name'>
                            {name}
                        </div>
                    </div>


                    <div className='detail'>
                        <div className="asin">
                            <span> ASIN: </span>
                            <span>{asin}</span>
                        </div>

                        <div className="sku">
                            <span> SKU: </span>
                            <span>{sku}</span>
                        </div>
                    </div>
                </div>

                <div className='optimization-status'>
                    {/*{true && <InformationTooltip*/}
                    {/*    arrowPointAtCenter={true}*/}
                    {/*    type={'custom'}*/}
                    {/*    description={'Product has new changes'}*/}
                    {/*    position={'topRight'}*/}
                    {/*>*/}
                    {/*    <div className='has-changes'/>*/}
                    {/*</InformationTooltip>}*/}

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
                        description={'Optimization in progress ...'}
                        position={'topRight'}
                    >
                        <div className='optimization-processing'/>
                    </InformationTooltip>}

                </div>
            </div>

            {(variations) && (openedProduct === id) && <div className='product-children-list'>
                {variations.map(childrenProduct => (
                    <div key={childrenProduct.id} className='children-information'>
                        <img src={childrenProduct.image_url} alt=""/>

                        <div className="product-item-content">
                            <div className="caption">{maxText(childrenProduct.name, 70)}</div>

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
                ))}
            </div>}
        </div>
    );
};

ProductItem.propTypes = {
    isActive: bool,
    onClick: func,
    asin: string,
    captions: string,
    sku: string,
    imageUrl: string,
    underOptimization: bool
};

ProductItem.defaultProps = {
    isActive: false,
    onClick: () => {
    },
    asin: null,
    captions: null,
    sku: null,
    imageUrl: null,
    underOptimization: false
};

export default ProductItem;
