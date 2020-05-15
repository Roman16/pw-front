import React, {useEffect} from 'react';
import {func, bool, string} from 'prop-types';
import {Icon, Popover} from 'antd';
import InformationTooltip from "../Tooltip/Tooltip";
import {productsActions} from "../../actions/products.actions";
import {useDispatch} from "react-redux";
import {SVG} from "../../utils/icons";

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
                     }) => {

    const switchList = (e) => {
        e.stopPropagation();
        onOpenChild(id)
    };

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(productsActions.fetchProductDetails({id: null}));
    // }, []);

    return (
        <div
            className={`product-item ${isActive ? 'active' : ''}`}
            onClick={() => onClick(product)}
            title={name}
        >
            <div className={`product-information ${openedProduct === id && 'opened-child-list'}`}>
                <div className="image-block">
                    <div className="image">
                        <img src={image_url} alt=""/>
                    </div>
                </div>


                <div className="product-item-content">
                    <div className="caption">
                        <span className={'short-name'}>{name}</span>
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

                <div
                    className={`open-children-list-button ${openedProduct === id ? 'opened' : ''}`}
                    onClick={switchList}
                >
                    {variations && <SVG id='select-icon'/>}
                </div>

                {/*<div className='optimization-status'>*/}
                {/*    /!*{true && <InformationTooltip*!/*/}
                {/*    /!*    arrowPointAtCenter={true}*!/*/}
                {/*    /!*    type={'custom'}*!/*/}
                {/*    /!*    description={'Product has new changes'}*!/*/}
                {/*    /!*    position={'topRight'}*!/*/}
                {/*    /!*>*!/*/}
                {/*    /!*    <div className='has-changes'/>*!/*/}
                {/*    /!*</InformationTooltip>}*!/*/}

                {/*    {under_optimization && has_optimization_results && <InformationTooltip*/}
                {/*        arrowPointAtCenter={true}*/}
                {/*        type={'custom'}*/}
                {/*        description={'Product on optimization'}*/}
                {/*        position={'topRight'}*/}
                {/*    >*/}
                {/*        <div className='on-optimization'/>*/}
                {/*    </InformationTooltip>}*/}

                {/*    {under_optimization && !has_optimization_results && <InformationTooltip*/}
                {/*        arrowPointAtCenter={true}*/}
                {/*        type={'custom'}*/}
                {/*        description={'Optimization in progress ...'}*/}
                {/*        position={'topRight'}*/}
                {/*    >*/}
                {/*        <div className='optimization-processing'/>*/}
                {/*    </InformationTooltip>}*/}

                {/*</div>*/}
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
