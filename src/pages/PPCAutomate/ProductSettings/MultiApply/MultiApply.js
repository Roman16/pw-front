import React, {useState} from "react";
import {Select} from "antd";
import CustomSelect from "../../../../components/Select/Select";
import InputCurrency from "../../../../components/Inputs/InputCurrency";

const Option = Select.Option;

const MultiApply = ({selectedRows, totalSize, onSelectAll, selectedAll, onSubmit}) => {
    const [fieldType, setFieldType] = useState('price'),
        [settingValue, setSettingValue] = useState('');

    const submitHandler = e => {
        e.preventDefault();

        onSubmit({
            field: fieldType,
            value: settingValue
        })
    }

    return (
        <div className={'multi-apply-setting'}>
            <p>
                <b>{selectedAll ? totalSize : selectedRows.length}</b> products {selectedAll ? '' : <>on
                this <b>page</b></>} are
                selected.
                <a onClick={onSelectAll}>Select all {totalSize} products.</a>
            </p>

            <form action="" onSubmit={submitHandler}>
                <label htmlFor="">Apply to all:</label>

                <div className="form-group">
                    <CustomSelect value={fieldType} onChange={e => setFieldType(e)}>
                        <Option value={'price'}>Overwrite Product Price</Option>
                        <Option value={'net_margin'}>Net Margin</Option>
                        <Option value={'min_bid_manual'}>Min Bid (Manual Campaign)</Option>
                        <Option value={'max_bid_manual'}>Max Bid (Manual Campaign)</Option>
                        <Option value={'min_bid_auto'}>Min Bid (Auto Campaign)</Option>
                        <Option value={'max_bid_auto'}>Max Bid (Auto Campaign)</Option>
                    </CustomSelect>
                </div>

                <div className="form-group">
                    <InputCurrency
                        required
                        typeIcon={fieldType === 'net_margin' ? 'percent' : 'currency'}
                        value={settingValue}
                        onChange={value => setSettingValue(value)}
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