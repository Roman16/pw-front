import React from "react"
import './SelectedProduct.less'
import {Link} from "react-router-dom"
import {history} from "../../../../utils/history"
import {amazonDefaultImageUrls} from "../../../../components/ProductList/ProductItem"
import noImage from "../../../../assets/img/no-image-available.svg"

export const SelectedProduct = ({product}) => (
    <div className="selected-product">
        <div className="overview">
            <h3>Product overview</h3>

            <div className="product">
                <div className="img">
                    {(!product.image_url || amazonDefaultImageUrls.includes(product.image_url)) ?
                        <img src={noImage} alt=""/> : <img src={product.image_url} alt=""/>}
                </div>

                {product.id && <div className="col">
                    <div className="product-name" title={product.name}>
                        {product.name}
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
                    </div>
                </div>}
            </div>

            <button className="btn grey" onClick={() => history.push('/zero-to-hero/campaign')}>
                Cancel Zero to Hero Setup
            </button>
        </div>

        <div className="help">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M18.2637 0.5625C13.2009 0.5625 9.09668 4.66673 9.09668 9.72955C9.09668 13.2043 11.0299 16.2275 13.8795 17.7822V18.8966H18.2637V0.5625Z"
                    fill="#DCDFE6"/>
                <path d="M13.8799 18.8984H18.2641V21.2898H13.8799V18.8984Z" fill="#EEEEEE"/>
                <path d="M13.8799 21.2891H18.2641V25.2747H17.8656C15.6643 25.2747 13.8799 23.4903 13.8799 21.2891Z"
                      fill="#535759"/>
                <path
                    d="M18.2646 12.1211V18.8967H17.4674V14.1139H16.471C15.9207 14.1139 15.4746 13.6678 15.4746 13.1175C15.4746 12.5672 15.9207 12.1211 16.471 12.1211H18.2646Z"
                    fill="#EDF0F5"/>
                <path
                    d="M18.2636 0.5625C23.3264 0.5625 27.4307 4.66673 27.4307 9.72955C27.4307 13.2043 25.4974 16.2275 22.6479 17.7822V18.8966H18.2636V0.5625Z"
                    fill="#DCDFE6"/>
                <path d="M22.6484 18.8984H18.2642V21.2898H22.6484V18.8984Z" fill="#D6D6D6"/>
                <path d="M22.6484 21.2891H18.2642V25.2747H18.6628C20.864 25.2747 22.6484 23.4903 22.6484 21.2891Z"
                      fill="#353A3E"/>
                <path
                    d="M18.2628 12.1211V18.8967H19.0599V14.1139H20.0563C20.6066 14.1139 21.0527 13.6678 21.0527 13.1175C21.0527 12.5672 20.6066 12.1211 20.0563 12.1211H18.2628Z"
                    fill="#EDF0F5"/>
                <path
                    d="M2.71875 30.4648V33.696H18.2629V30.6445L16.444 28.9867C16.0757 28.651 15.5952 28.4648 15.0968 28.4648H4.71875C3.61418 28.4648 2.71875 29.3603 2.71875 30.4648Z"
                    fill="#DCDFE6"/>
                <path
                    d="M1.125 34.5672C1.125 34.0857 1.51535 33.6953 1.99686 33.6953H18.2634V35.439H1.99687C1.51535 35.439 1.125 35.0487 1.125 34.5672Z"
                    fill="#535759"/>
                <path
                    d="M33.8086 30.4648V33.696H18.2645V30.6445L20.0833 28.9867C20.4517 28.651 20.9322 28.4648 21.4306 28.4648H31.8086C32.9132 28.4648 33.8086 29.3603 33.8086 30.4648Z"
                    fill="#DCDFE6"/>
                <path
                    d="M35.4023 34.5672C35.4023 34.0857 35.012 33.6953 34.5305 33.6953H18.264V35.439H34.5305C35.012 35.439 35.4023 35.0487 35.4023 34.5672Z"
                    fill="#353A3E"/>
            </svg>

            <div className="col">
                <h3>Need help?</h3>
                <p>
                    Learn at your own pace and get answers to all the question in one single platform.
                    <Link to={'/zero-to-hero/campaign'}>
                        Help Center
                    </Link>
                </p>
            </div>
        </div>
    </div>
)