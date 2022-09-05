import React, {useState} from "react"
import {Select, Spin} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import {
    MAX_BID_AUTO_CAMPING,
    MAX_BID_MANUAL_CAMPING,
    MIN_BID_AUTO_CAMPING,
    MIN_BID_MANUAL_CAMPING
} from "../../ProductsInfo/ProductList"
import {notification} from "../../../../components/Notification"

const Option = Select.Option

const MultiApply = ({visible, selectedRows, totalSize, onSelectAll, selectedAll, onSubmit}) => {
    const [fieldType, setFieldType] = useState('min_bid_manual_campaign'),
        [settingValue, setSettingValue] = useState(),
        [submitProcessing, setSubmitProcessing] = useState(false)

    const submitHandler = e => {
        e.preventDefault()
        setSubmitProcessing(true)

        if ((fieldType === MIN_BID_MANUAL_CAMPING || fieldType === MAX_BID_MANUAL_CAMPING || fieldType === MIN_BID_AUTO_CAMPING || fieldType === MAX_BID_AUTO_CAMPING) && settingValue < 0.02) {
            notification.warning({title: 'Bids should be greater than or equal to 0.02$'})
            setSubmitProcessing(false)
        } else {
            onSubmit({
                    field: fieldType,
                    [fieldType]: settingValue || null
                },
                () => {
                    setSettingValue('')
                    setSubmitProcessing(false)
                })
        }
    }

    return (
        <div className={`multi-apply-setting ${visible ? 'visible' : ''}`}>
            {(selectedAll || selectedRows.length == totalSize) ?
                <p><b>All {totalSize}</b> selected</p>
                :
                <p><b>{selectedRows.length}</b> selected {totalSize > 1 && <>(
                    <button className={'select-all-btn'} onClick={onSelectAll}>or select
                        all {totalSize}</button>
                    )</>}
                </p>}

            {/*<b>{selectedAll ? totalSize : selectedRows.length}</b> products {selectedAll ? '' : <>on*/}
            {/*this <b>page</b></>} are*/}
            {/*selected.*/}

            {/*{!selectedAll && <a onClick={onSelectAll}>Select all {totalSize} products.</a>}*/}

            <form action="" onSubmit={submitHandler}>
                <label htmlFor="">Apply to all:</label>
                <div className="form-group">
                    <CustomSelect value={fieldType} onChange={e => setFieldType(e)}>
                        {/*<Option value={'item_price_from_user'}>Overwrite Product Price</Option>*/}
                        <Option value={'min_bid_manual_campaign'}>Min Bid (Manual Campaign)</Option>
                        <Option value={'max_bid_manual_campaign'}>Max Bid (Manual Campaign)</Option>
                        <Option value={'min_bid_auto_campaign'}>Min Bid (Auto Campaign)</Option>
                        <Option value={'max_bid_auto_campaign'}>Max Bid (Auto Campaign)</Option>
                        <Option value={'desired_acos'}>Desired ACoS</Option>
                        <Option value={'break_even_acos'}>Break-even ACoS</Option>
                        {/*<Option value={'cogs'}>CoGS</Option>*/}
                    </CustomSelect>
                </div>

                <div className="form-group">
                    <InputCurrency
                        typeIcon={fieldType === 'product_margin_value' || fieldType === 'desired_acos' || fieldType === 'break_even_acos' ? 'percent' : 'currency'}
                        value={settingValue}
                        onChange={value => setSettingValue(value)}
                        min={0}
                        step={0.01}
                    />
                </div>

                <button className={'btn default p15'} disabled={submitProcessing}>
                    Apply

                    {submitProcessing && <Spin size={'small'}/>}
                </button>
            </form>
        </div>
    )
}

export default MultiApply