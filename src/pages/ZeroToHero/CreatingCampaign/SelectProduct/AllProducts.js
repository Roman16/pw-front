import React, {useEffect, useState} from "react";
import {SVG} from "../../../../utils/icons";
import Pagination from "../../../../components/Pagination/Pagination";
import {Input, Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {zthServices} from "../../../../services/zth.services";
import './SelectProduct.less';
import ProductItem from "./ProductItem";
import {debounce} from "throttle-debounce";
import {zthActions} from "../../../../actions/zth.actions";
import ConfirmActionPopup from "../../../../components/ModalWindow/ConfirmActionPopup";

const {Search} = Input;

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]),
        [totalSize, setTotalSize] = useState(0),
        [searchStr, setSearchStr] = useState(''),
        [processing, setProcessing] = useState(false),
        [visibleConfirmWindow, setVisibleConfirmWindow] = useState(false),
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
            setSelectedProducts([...selectedProducts.filter(item => item.parent_id !== product.id), product])
        }
    };

    const selectVariationHandler = (product, variationStatus, parentStatus) => {
        if (parentStatus) {
            if (variationStatus) {
                setSelectedProducts(selectedProducts.filter(item => item.id !== product.parent_id));
            } else if ([...selectedProducts.filter(item => item.parent_id === product.parent_id), ...addedProducts.filter(item => item.parent_id === product.parent_id)].length + 1 === allProducts.find(item => item.id === product.parent_id).variations.length) {
                setSelectedProducts([...selectedProducts.filter(item => item.parent_id !== product.parent_id), allProducts.find(item => item.id === product.parent_id)])
            } else {
                setSelectedProducts([...selectedProducts.filter(item => item.id !== product.parent_id), product])
            }
        } else if (variationStatus) {
            setSelectedProducts(selectedProducts.filter(item => item.id !== product.id))
        } else {
            if ([...selectedProducts.filter(item => item.parent_id === product.parent_id), ...addedProducts.filter(item => item.parent_id === product.parent_id)].length + 1 === allProducts.find(item => item.id === product.parent_id).variations.length) {
                setSelectedProducts([...selectedProducts.filter(item => item.parent_id !== product.parent_id), allProducts.find(item => item.id === product.parent_id)])
            } else {
                setSelectedProducts([...selectedProducts, product])
            }
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
        if (selectedProducts.find(item => item.parent_id)) {
            setVisibleConfirmWindow(true)
        } else {
            addProducts();
        }
    };

    const addProducts = () => {
        dispatch(zthActions.addProducts(selectedProducts));
        setSelectedProducts([]);
        setVisibleConfirmWindow(false)
    };


    const getProductsList = async () => {
        setProcessing(true);

        try {
            const res = await zthServices.getAllProducts({
                ...paginationOptions,
                searchStr: searchStr,
            });

            setAllProducts(res.result || []);
            setTotalSize(res.totalSize);
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
                        isSelected={!!selectedProducts.find(item => item.id === product.id)}
                        isDisabled={!!addedProducts.find(item => item.id === product.id)}
                        selectedProducts={selectedProducts}
                        addedProducts={addedProducts}
                        type={'all_products'}

                        onSelect={selectProductHandler}
                        onSelectVariation={selectVariationHandler}
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

            <ConfirmActionPopup
                className={'confirm-remove-product-window'}
                visible={visibleConfirmWindow}
                title={'NOTE! You are adding the Variation, and we will create separate campaigns for every Variation. Or you can set up campaigns for all Variations if you choose the Parent listing.'}
                handleOk={addProducts}
                handleCancel={() => setVisibleConfirmWindow(false)}
            />
        </div>
    )
};

export default AllProducts;