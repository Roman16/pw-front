import React, {useEffect} from "react";
import {Input, Select, Switch} from "antd";
import {SVG} from "../../utils/icons";

const {Search} = Input;


const ProductFilters = ({
                            selectedAll,
                            selectedProduct,
                            onlyOptimization,
                            totalSize,
                            onSelectAll,
                            onSelectLastProduct
                        }) => {

    return (
        <div className="products-filters">
            <div className="form-group">
                <Search
                    className="search-field"
                    placeholder={'Search by product name, ASIN or SKU'}
                    // onChange={e => onSearch(e.target.value)}
                    data-intercom-target='search-field'
                    suffix={<SVG id={'search'}/>}
                />
            </div>

            <div className="row">
                <div className="product-selected">
                    <div className="select-switch">
                        <button
                            className={selectedAll && 'active'}
                            onClick={() => onSelectAll(true)}
                        >
                            <SVG id={'all-selected-icon'}/>
                        </button>

                        <button
                            className={!selectedAll && selectedProduct.id !== null && 'active'}
                            onClick={onSelectLastProduct}
                        >
                            <SVG id={'one-selected-icon'}/>
                        </button>
                    </div>

                    <span>
                        <b>{selectedAll ? totalSize : selectedProduct.id !== null ? '1' : '0'}</b> selected
                    </span>
                </div>

                <div className="active-only">
                    <label htmlFor="">On optimization only</label>
                    <Switch
                        checked={onlyOptimization}
                        onChange={e => this.handleChangeSwitch(e, 'onlyOptimization')}
                    />
                </div>
            </div>
        </div>
    )
};

export default ProductFilters;