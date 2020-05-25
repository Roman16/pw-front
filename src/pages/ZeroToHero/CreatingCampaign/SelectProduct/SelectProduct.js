import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {Input} from "antd";
import {productsServices} from "../../../../services/products.services";
import closeIcon from '../../../../assets/img/icons/close-icon.svg';
import './SelectProduct.less';
import {useSelector} from "react-redux";

const {Search} = Input;

const SelectProduct = () => {
    const {productAmount} = useSelector(state => ({
        productAmount: state.zth.productAmount
    }));

    const [allProducts, setAllProducts] = useState([]),
        [hideSection, switchSection] = useState(false);

    useEffect(() => {
        productsServices.getProducts({
            size: 10,
            page: 1,
            searchStr: '',
            ungroupVariations: 0
        })
            .then(res => {
                setAllProducts(res.result)
            })
    }, []);

    return (
        <section className={`select-product-section ${hideSection ? 'hide' : 'visible'}`}>
            <div className="col all-products">

                <div className="header-block">
                    <h3>Select Products</h3>
                    <div className='annotation'><span>*</span> You can set up multiple products per one time</div>
                </div>

                <div className="search-block">
                    <Search
                        className="search-field"
                        placeholder="Search by product name, ASIN, or SKU"
                        // onChange={e => onSearch(e.target.value)}
                    />
                </div>

                <div className="products-list">
                    {allProducts.map((product, index) => (
                        <div className="product-item" key={product.id}>
                            <div className="photo">
                                <img src={product.image_url} alt=""/>
                            </div>

                            <div className="col">
                                <div className="row">
                                    <div className="product-name">{product.name}</div>

                                    <button className="btn default added-btn">add</button>
                                </div>

                                <div className="row">
                                    <div className="price">$35.99</div>
                                    <div className="stock">In Stock</div>
                                </div>

                                <div className="row">
                                    <div className='asin-sku'>
                                        <span className="asin">ASIN: {product.asin}</span>
                                        <span className="sku">SKU: {product.sku}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="hide-section">
                <FontAwesomeIcon icon={faChevronUp} onClick={() => switchSection(!hideSection)}/>
            </div>

            <div className="col selected-products">
                <div className="header-block">
                    <span>You can set up</span>
                    <div className="count">{productAmount}</div>
                    <span>products</span>
                </div>

                <div className='selected-products-count'>
                    <h3>{allProducts.length} Products</h3>
                    <button className="remove-all-btn">remove all</button>
                </div>

                <div className="products-list">
                    {allProducts.map((product, index) => (
                        <div className="product-item" key={product.id}>
                            <div className="photo">
                                <img src={product.image_url} alt=""/>
                            </div>

                            <div className="col">
                                <div className="row">
                                    <div className="product-name">{product.name}</div>

                                    <button className="btn remove-item">
                                        <img src={closeIcon} alt=""/>
                                    </button>
                                </div>

                                <div className="row">
                                    <div className="price">$35.99</div>
                                    <div className="stock">In Stock</div>
                                </div>

                                <div className="row">
                                    <div className='asin-sku'>
                                        <span className="asin">ASIN: {product.asin}</span>
                                        <span className="sku">SKU: {product.sku}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
};

export default SelectProduct;