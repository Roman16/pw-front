import React, {useState} from 'react';
import {func, bool, string} from 'prop-types';
import {Spin, Icon} from 'antd';
import optimizationLabel from '../../assets/img/optimization-label.svg';
import loaderBg from '../../assets/img/icons/loader-background.svg';

const maxText = text => {
    if (text && text.length > 40) {
        return `${text.slice(0, 40)}...`;
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
                         products,
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
                        {maxText(name)}
                        {product.has_new_changes && pathname === '/ppc/report' && <div className='has-new-reports'>New</div>}
                    </div>

                    <div>
                        <div className="detail">
                            <span> ASIN: </span>
                            <span>{asin}</span>
                        </div>

                        <div className="detail">
                            <span> SKU: </span>
                            <span>{sku}</span>
                        </div>
                    </div>
                </div>

                {under_optimization && has_optimization_results && <div className='on-optimization'>
                    <img src={optimizationLabel} alt=""/>
                </div>}

                {under_optimization && !has_optimization_results && <div className='optimization-waiting'>
                    <img src={loaderBg} alt=""/>

                    <Spin/>
                </div>}
            </div>

            {(variations) && (openedProduct === id) && <div className='product-children-list'>
                {variations.map(childrenProduct => (
                    <div key={childrenProduct.id} className='children-information'>
                        <img src={childrenProduct.image_url} alt=""/>

                        <div className="product-item-content">
                            <div className="caption">{maxText(childrenProduct.name)}</div>

                            <div>
                                <div className="detail">
                                    <span> ASIN: </span>
                                    <span>{childrenProduct.asin}</span>
                                </div>

                                <div className="detail">
                                    <span> SKU: </span>
                                    <span>{childrenProduct.sku}</span>
                                </div>
                            </div>
                        </div>

                        {under_optimization && has_optimization_results && <div className='on-optimization'>
                            <img src={optimizationLabel} alt=""/>
                        </div>}

                        {under_optimization && !has_optimization_results && <div className='optimization-waiting'>
                            <img src={loaderBg} alt=""/>
                            <Spin/>
                        </div>}
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
