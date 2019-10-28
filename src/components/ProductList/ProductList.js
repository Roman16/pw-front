import React, {useState, useEffect} from 'react';
import ProductItem from './ProductItem';
import {Input, Pagination} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {productsServices} from '../../services/products.services';
import {productsActions} from '../../actions/products.actions';

import SelectAllProduct from './SelectAllProducts';
import {debounce} from 'throttle-debounce';

import './ProductList.less';

const {Search} = Input;

const defaultPaginationParams = {size: 10, page: 1, searchStr: ''};

const ProductList = ({onSelect}) => {
    const [paginationParams, changePagination] = useState(defaultPaginationParams);
    const [productsList, setProducts] = useState([]);
    const [totalSize, changeTotalSize] = useState(0);
    const [isSelectedAll, switchSelected] = useState(false);

    const dispatch = useDispatch();

    const {selectedProduct} = useSelector(state => ({
        selectedProduct: state.products.selectedProduct,
    }));


    const getProducts = () => {
        productsServices.getProducts(paginationParams).then(res => {
            setProducts(res.result);
            changeTotalSize(res.totalSize);
            onSelect(res.result[0])
        });
    };

    const handleChangePagination = page => {
        changePagination({...paginationParams, page});
    };

    const handleSearch = debounce(500, false, searchStr => {
        changePagination({...paginationParams, searchStr});
    });

    const selectAll = () => {
        switchSelected(!isSelectedAll);
        dispatch(productsActions.selectAllProducts());
    };

    const handleSelectProduct = (item) => {
        if (item.id !== selectedProduct.id) {
            onSelect(item);
            switchSelected(false)
        }
    };


    useEffect(getProducts, [paginationParams]);
    useEffect(() => {
        onSelect(isSelectedAll ? 'all' : selectedProduct);
    }, [isSelectedAll]);


    return (
        <div className="product-list">
            <div className="search-product">
                <Search
                    placeholder="Search by product name, ASIN, or SKU"
                    onChange={e => handleSearch(e.target.value)}
                />

                <div className="select-all-products">
                    <SelectAllProduct
                        onSelectAll={selectAll}
                        isSelectedAll={isSelectedAll}
                    />
                </div>
            </div>

            {productsList &&
            productsList.map(product => (
                <ProductItem
                    key={product.id}
                    product={product}
                    isActive={
                        isSelectedAll ||
                        selectedProduct.id === product.id
                    }
                    onClick={item => handleSelectProduct(item)}
                />
            ))}

            {totalSize > paginationParams.size && (
                <Pagination
                    defaultCurrent={1}
                    pageSize={paginationParams.size}
                    total={totalSize}
                    onChange={handleChangePagination}
                />
            )}
        </div>
    );
};


export default ProductList;
