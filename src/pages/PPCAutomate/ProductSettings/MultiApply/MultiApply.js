import React, {useState} from "react";
import {Select} from "antd";
import CustomSelect from "../../../../components/Select/Select";
import InputCurrency from "../../../../components/Inputs/InputCurrency";

const Option = Select.Option;

const MultiApply = ({selectedRows, totalSize, onSelectAll, selectedAll, onSubmit}) => {
    const [fieldType, setFieldType] = useState('item_price_from_user'),
        [settingValue, setSettingValue] = useState('');

    const submitHandler = e => {
        e.preventDefault();

        onSubmit({
            field: fieldType,
            [fieldType]: settingValue
        })
    }

    return (
        <div className={'multi-apply-setting'}>
            <p>
                <b>{selectedAll ? totalSize : selectedRows.length}</b> products {selectedAll ? '' : <>on
                this <b>page</b></>} are
                selected.

                {!selectedAll && <a onClick={onSelectAll}>Select all {totalSize} products.</a>}
            </p>

            <form action="" onSubmit={submitHandler}>
                <label htmlFor="">Apply to all:</label>
                <div className="form-group">
                    <CustomSelect value={fieldType} onChange={e => setFieldType(e)}>
                        <Option value={'item_price_from_user'}>Overwrite Product Price</Option>
                        <Option value={'product_margin_value'}>Net Margin</Option>
                        <Option value={'min_bid_manual_campaign'}>Min Bid (Manual Campaign)</Option>
                        <Option value={'max_bid_manual_campaign'}>Max Bid (Manual Campaign)</Option>
                        <Option value={'min_bid_auto_campaign'}>Min Bid (Auto Campaign)</Option>
                        <Option value={'max_bid_auto_campaign'}>Max Bid (Auto Campaign)</Option>
                    </CustomSelect>
                </div>

                <div className="form-group">
                    <InputCurrency
                        required
                        typeIcon={fieldType === 'net_margin' ? 'percent' : 'currency'}
                        value={settingValue}
                        onChange={value => setSettingValue(value)}
                        min={0}
                        step={0.01}
                    />
                </div>

                <button className={'btn default p15'}>
                    Apply
                </button>
            </form>
        </div>
    )
};

export default MultiApply;