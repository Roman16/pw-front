import React, {useEffect, useState} from "react";
import {SVG} from "../../../../utils/icons";
import Pagination from "../../../../components/Pagination/Pagination";
import {Input, Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {zthServices} from "../../../../services/zth.services";
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

    const {addedProducts, productAmount, availableTokens} = useSelector(state => ({
        addedProducts: state.zth.selectedProducts,
        productAmount: state.zth.productAmount,
        availableTokens: state.zth.paidBatch.available_tokens
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
            setSelectedProducts([...selectedProducts.filter(item => (item.id !== product.parent_id || (item.parent_id && item.parent_id !== product.parent_id))), product]);
        } else if (variationStatus) {
            setSelectedProducts(selectedProducts.filter(item => item.id !== product.id));
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

            setAllProducts(res.result || [{
                id: 3,
                title: 'ewfw'
            }]);
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
                <h3>
                    Select Products

                    {availableTokens > 0 && <span className="free-tokens">
                        Free tokens: {availableTokens}
                    </span>}
                </h3>

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
                            disabled={selectedProducts.length === 0 || (availableTokens && [...addedProducts, ...selectedProducts].length > availableTokens)}
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
                title={'NOTE!'}
                description={'You are adding the Variation. We highly recommend you to create campaigns for the Parent listing. Proceed with Variation?'}
                handleOk={addProducts}
                handleCancel={() => setVisibleConfirmWindow(false)}
            />
        </div>
    )
};

export default AllProducts;