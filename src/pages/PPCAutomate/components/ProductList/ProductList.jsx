import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ProductSearch from '../ProductSearch';
import ProductItem from '../ProductItem';
import Button from '../../../../components/Buttons';
import Pagination from '../../../../components/Pagination';
import './ProductList.less';
import { DEFAULT_PAGE_SIZE } from '../../const';


const SelectProduct = ({ onSelectAll, selectedSize, isSelectedAll = false }) => (
    <div className={`SelectProduct ${isSelectedAll ? 'selected-all' : ''}`}>

        <Button onClick={onSelectAll}>
            {isSelectedAll ? 'Deselect ' : 'Selected '}
            All Products
        </Button>
        <div className="selected-products">
            <span> Selected Products</span>
            <span className="product">{selectedSize}</span>
        </div>


    </div>
);

class ProductList extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            isSelectedAll: false,
            selectedSize: 1,
        };
        this.filterList = {
            searchText: '',
            pageNumber: 1,
        };
        this.searchTimerId = null;
        this.prevActive = null;
    }

    componentDidMount() {
        const { fetchProductList } = this.props;
        const {
            searchText,
            pageNumber,
        } = this.filterList;

        fetchProductList(searchText, pageNumber);
    }

    selectAll = () => {
        const {
            totalProduct, activeProductId, setActiveProduct, onSelect,
        } = this.props;

        this.setState(({ isSelectedAll }) => ({
            isSelectedAll: !isSelectedAll,
            selectedSize: !isSelectedAll ? totalProduct : 1,
        }), () => {
            const { isSelectedAll } = this.state;

            if (activeProductId !== 'all') {
                this.prevActive = activeProductId;
            }
            const toSelect = isSelectedAll ? 'all' : this.prevActive;

            onSelect(toSelect);
            setActiveProduct(toSelect);
        });
    };

    onSearch = (e) => {
        const { target: { value } } = e;
        const { fetchProductList } = this.props;

        this.filterList = {
            pageNumber: 1,
            searchText: value,
        };

        clearTimeout(this.searchTimerId);
        this.searchTimerId = setTimeout(
            () => {
                fetchProductList(value, 1);
            }, 300,
        );
    };

    toActive = (activeItemId) => {
        const { setActiveProduct, onSelect } = this.props;

        setActiveProduct(activeItemId);
        onSelect(activeItemId);
        this.setState({
            isSelectedAll: false,
            selectedSize: 1,
        });
    };

    changePage = (page) => {
        const { fetchProductList } = this.props;

        const {
            searchText,
        } = this.filterList;

        this.filterList = {
            ...this.filterList,
            pageNumber: page,
        };
        fetchProductList(searchText, page);
    };

    render() {
        const {
            isSelectedAll, selectedSize,
        } = this.state;
        const { productList, totalProduct, activeProductId } = this.props;


        return (
            <div className="ProductList">
                <ProductSearch onChange={this.onSearch} />
                <SelectProduct
                    onSelectAll={this.selectAll}
                    selectedSize={selectedSize}
                    isSelectedAll={isSelectedAll}
                />
                <div className="product-list-wrapper">
                    <div className="product-list">
                        {productList.map((
                            {
                                id, asin, captions, sku,
                                image_url, under_optimization,
                            },
                        ) => (
                            <ProductItem
                                asin={asin}
                                captions={captions}
                                imageUrl={image_url}
                                underOptimization={under_optimization}
                                sku={sku}
                                key={id}
                                isActive={isSelectedAll || id === activeProductId}
                                onClick={() => this.toActive(id)}
                            />
                        ))}
                    </div>
                </div>
                {DEFAULT_PAGE_SIZE < totalProduct && (
                    <Pagination
                        onChange={this.changePage}
                        defaultPageSize={DEFAULT_PAGE_SIZE}
                        className="list-pagination"
                        total={totalProduct}
                    />
                )}
            </div>
        );
    }
}

ProductList.propTypes = {
    productList: PropTypes.arrayOf(PropTypes.object),
    fetchProductList: PropTypes.func,
    setActiveProduct: PropTypes.func,
    onSelect: PropTypes.func,
    totalProduct: PropTypes.number,
    activeProductId: PropTypes.number,
};

ProductList.defaultProps = {
    productList: [],
    fetchProductList: () => {
    },
    setActiveProduct: () => {
    },
    onSelect: () => {
    },
    totalProduct: null,
    activeProductId: null,
};

export default ProductList;
