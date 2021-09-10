import React, {useEffect, useState} from "react"
import {Select} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import ExcelTable from "../../../../components/ExcelTable/ExcelTable"
import {checkboxColumn, keyColumn, textColumn} from "react-datasheet-grid"

const Option = Select.Option

const CreateOptions = ({semanticData, allEnums, onChange, onGetParams, onCreate}) => {
    const [merchantWordsCategories, setMerchantWordsCategories] = useState([])

    const changeDataHandler = (obg, name, value) => {
        onChange({
            ...semanticData,
            [obg]: {
                ...semanticData[obg],
                [name]: value
            }
        })
    }

    const columns = [
        {...keyColumn('title', textColumn), disabled: true, title: 'Category name', width: 3},
        {...keyColumn('checked', checkboxColumn), title: 'Use in search', width: 2},
    ]

    useEffect(() => {
        setMerchantWordsCategories(allEnums.enums.MerchantWordsCategory.map(key => ({
            key: key,
            title: allEnums.aggregates.merchantWordsCategoriesNamesMap[key],
            checked: semanticData.keywordsProvider.merchantWordsCategories.find(i => i === key)
        })))
    }, [])

    useEffect(() => {
        onChange({
            ...semanticData,
            keywordsProvider: {
                ...semanticData.keywordsProvider,
                merchantWordsCategories: merchantWordsCategories.filter(i => i.checked).map(i => i.key)
            }
        })

    }, [merchantWordsCategories])

    return (<div className={'conversion-options'}>
            <div className="row cols-4">
                <div className="form-group ">
                    <label htmlFor="">Choose campaign compression strategy:</label>
                    <CustomSelect
                        getPopupContainer={trigger => trigger}
                        value={semanticData.zeroToHero.campaignsCompressionStrategy}
                        onChange={value => changeDataHandler('zeroToHero', 'campaignsCompressionStrategy', value)}
                    >
                        {allEnums.enums.CampaignsCompressionStrategy.map(value => value !== 'Compact' ?
                            <Option value={value}>{value}</Option> : '')}
                    </CustomSelect>
                </div>

            </div>


            <h2>Merchant Words categories:</h2>

            <ExcelTable
                data={merchantWordsCategories}
                columns={columns}
                onChange={setMerchantWordsCategories}
            />


            <br/>
            <br/>

            <div className="row actions">
                <button
                    className={'btn default submit'}
                    onClick={onGetParams}
                >
                    Get input parameters file
                </button>
                <button
                    // disabled={!selectedUserId}
                    className={'btn default submit'}
                    onClick={onCreate}
                >
                    Schedule Zero to Hero job
                </button>
            </div>
        </div>
    )
}

export default CreateOptions