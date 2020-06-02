import React, {useEffect, useState} from "react";
import {SVG} from "../../../../utils/icons";
import Pagination from "../../../../components/Pagination/Pagination";
import {Input, Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {productsServices} from "../../../../services/products.services";
import './SelectProduct.less';
import ProductItem from "./ProductItem";
import {debounce} from "throttle-debounce";
import {zthActions} from "../../../../actions/zth.actions";

const {Search} = Input;

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]),
        [totalSize, setTotalSize] = useState(0),
        [searchStr, setSearchStr] = useState(''),
        [processing, setProcessing] = useState(false),
        [openedProduct, setOpenedProduct] = useState(null),
        [selectedProducts, setSelectedProducts] = useState([]),
        [paginationOptions, setPaginationOptions] = useState({
            page: 1,
            pageSize: 10,
        });

    const {addedProducts, productAmount} = useSelector(state => ({
        addedProducts: state.zth.selectedProducts,
        productAmount: state.zth.productAmount,
    }));

    const dispatch = useDispatch();

    const selectProductHandler = (product, status) => {
        if (status) {
            setSelectedProducts(selectedProducts.filter(item => item.id !== product.id))
        } else {
            setSelectedProducts([...selectedProducts, product])
        }
    };

    const openVariationsListHandler = (id) => {
        setOpenedProduct(prevState => prevState === id ? null : id)
    };

    const changePaginationHandler = (options) => {
        setPaginationOptions(options);
    };

    const changeSearchHandler = debounce(500, false, str => {
        setSearchStr(str);
        setPaginationOptions({
            ...paginationOptions,
            page: 1
        })
    });

    const addProductsHandler = () => {
        dispatch(zthActions.addProducts(selectedProducts));
        setSelectedProducts([]);
    };


    const getProductsList = async () => {
        setProcessing(true);

        try {
            const res = await productsServices.getProducts({
                ...paginationOptions,
                searchStr: searchStr,
                ungroupVariations: 0
            });

            setAllProducts(res.result || []);
            // setTotalSize(res.totalSize);
        } catch (e) {
            setAllProducts([])
        }

        setProcessing(false);
    };

    useEffect(() => {
        getProductsList();

        setSelectedProducts([]);
    }, [paginationOptions]);
    return (
        <div className="col all-products">
            <div className="header-block">
                <h3>Select Products</h3>

                <div className="filters">
                    <div className="form-group">
                        <Search
                            className="search-field"
                            placeholder={'Search by product name, ASIN or SKU'}
                            onChange={e => changeSearchHandler(e.target.value)}
                            data-intercom-target='search-field'
                            suffix={<SVG id={'search'}/>}
                        />
                    </div>

                    <div className="products-actions">
                        {selectedProducts.length > 0 && <div className="selected-count">
                            <b>{selectedProducts.length}</b> selected on this page
                        </div>
                        }
                        <button
                            disabled={selectedProducts.length === 0}
                            className={'btn default p15'}
                            onClick={addProductsHandler}
                        >
                            Add To The List
                        </button>
                    </div>
                </div>
            </div>

            <div className="products-list">
                {allProducts.map((product, index) => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        isOpened={product.id === openedProduct}
                        isSelected={selectedProducts.find(item => item.id === product.id)}
                        isDisabled={addedProducts.find(item => item.id === product.id)}

                        onSelect={selectProductHandler}
                        onOpenVariations={openVariationsListHandler}
                    />
                ))}
            </div>

            {processing && <div className="load-data">
                <Spin size={'large'}/>
            </div>}

            <Pagination
                onChange={changePaginationHandler}
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