import React from "react";
import filterIcon from "../../assets/img/icons/products-filter-icon.svg";
import {Input} from "antd";

const {Search} = Input;

const FilterFields = ({handleSearch}) => {

    return(
        <div className="search-product">
            <Search
                placeholder="Search by product name, ASIN, or SKU"
                onChange={e => handleSearch(e.target.value)}
            />

            <div className='filter-block'>
                <img src={filterIcon} alt=""/>
            </div>

            {/*<div className="select-all-products">*/}
            {/*    <SelectAllProduct*/}
            {/*        onSelectAll={this.selectAll}*/}
            {/*        selectedSize={selectedSize}*/}
            {/*        isSelectedAll={isSelectedAll}*/}
            {/*        disabled={products.length === 0}*/}
            {/*    />*/}

            {/*    <div className="active-only">*/}
            {/*        <label htmlFor="">On optimization only</label>*/}
            {/*        <Switch*/}
            {/*            checked={onlyOptimization}*/}
            {/*            onChange={e => this.handleChangeSwitch(e, 'onlyOptimization')}*/}
            {/*        />*/}
            {/*    </div>*/}

            {/*</div>*/}
        </div>

    )
};

export default FilterFields;