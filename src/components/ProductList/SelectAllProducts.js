import React from "react";
import {Button} from "antd";

const SelectAllProduct = ({
                              onSelectAll,
                              selectedSize,
                              isSelectedAll = false,
                          }) => (
    <div className={`SelectProduct ${isSelectedAll ? 'selected-all' : ''}`}>
        <Button
            // onClick={onSelectAll}
            type="primary"
        >
            {isSelectedAll ? 'Deselect ' : 'Select '}
            All Products
        </Button>

        {/*<div className="selected-products">*/}
        {/*    <span> Selected All Products</span>*/}
        {/*    <span className="product">{selectedSize}</span>*/}
        {/*</div>*/}
    </div>
);

export default SelectAllProduct;