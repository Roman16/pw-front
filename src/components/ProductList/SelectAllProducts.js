import React from 'react';
import { Button } from 'antd';

const SelectAllProduct = ({ onSelectAll, isSelectedAll = false, disabled }) => (
    <div className={`${isSelectedAll ? 'selected-all' : ''}`}>
        <Button
            onClick={onSelectAll}
            type="primary"
            disabled={disabled}
        >
            {isSelectedAll ? 'Deselect ' : 'Select All Products'}

        </Button>
    </div>
);

export default SelectAllProduct;
