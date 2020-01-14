import React from 'react';
import { Button } from 'antd';

const SelectAllProduct = ({ onSelectAll, isSelectedAll = false, disabled }) => (
    <div className={`${isSelectedAll ? 'selected-all' : ''}`}>
        <button
            onClick={onSelectAll}
            type="primary"
            disabled={disabled}
            className='btn default'
        >
            {isSelectedAll ? 'Deselect ' : 'Select All Products'}

        </button>
    </div>
);

export default SelectAllProduct;
