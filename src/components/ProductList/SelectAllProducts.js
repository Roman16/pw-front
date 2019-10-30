import React from 'react';
import { Button } from 'antd';

const SelectAllProduct = ({ onSelectAll, isSelectedAll = false }) => (
    <div className={`${isSelectedAll ? 'selected-all' : ''}`}>
        <Button onClick={onSelectAll} type="primary">
            {isSelectedAll ? 'Deselect ' : 'Select '}
            All Products
        </Button>
    </div>
);

export default SelectAllProduct;
