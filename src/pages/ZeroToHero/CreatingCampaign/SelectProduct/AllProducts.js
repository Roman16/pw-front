import React, {useEffect, useState} from "react";
import {SVG} from "../../../../utils/icons";
import Pagination from "../../../../components/Pagination/Pagination";
import {Input} from "antd";
import {useSelector} from "react-redux";
import {productsServices} from "../../../../services/products.services";
import './SelectProduct.less';

const {Search} = Input;

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]),
        [totalSize, setTotalSize] = useState(0),
        [processing, setProcessing] = useState(false),
        [paginationOptions, setPaginationOptions] = useState({
            page: 1,
            pageSize: 10,
        });



    const getProductsList = async () => {
        setProcessing(true);

        try {
            const res = await productsServices.getProducts({
                ...paginationOptions,
                searchStr: '',
                ungroupVariations: 0
            });

            setAllProducts(res.result)


        } catch (e) {
            setAllProducts([])
        }

        setProcessing(false);
    };

    useEffect(() => {
        getProductsList();
    }, []);
    return (
        <div className="col all-products">
            <div className="header-block">
                <h3>Select Products</h3>

                <div className="filters">
                    <div className="form-group">
                        <Search
                            className="search-field"
                            placeholder={'Search by product name, ASIN or SKU'}
                            // onChange={e => onSearch(e.target.value)}
                            data-intercom-target='search-field'
                            suffix={<SVG id={'search'}/>}
                        />
                    </div>

                    <div className="products-actions">
                        <div className="selected-count">
                            <b>3</b> selected on this page
                        </div>

                        <button className={'btn default p15'}>Add To The List</button>
                    </div>
                </div>
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

            <Pagination
                // onChange={}
                page={paginationOptions.page}
                pageSizeOptions={[10, 25, 50]}
                pageSize={paginationOptions.pageSize}
                totalSize={totalSize}
                listLength={allProducts.length}
                processing={processing}
            />
        </div>
    )
};

export default AllProducts;