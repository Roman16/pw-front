import React from "react"
import {Checkbox, Select} from "antd"
import CustomTable from "../../../../components/Table/CustomTable"
import CustomSelect from "../../../../components/Select/Select"

const Option = Select.Option

const CreateOptions = ({semanticData, allEnums, onChange, onGetParams, onCreate}) => {
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
        {
            title: 'Category name',
            dataIndex: 'campaignType',
            key: 'campaignType',
            width: '300px',
            render: (text, item) => allEnums.aggregates.merchantWordsCategoriesNamesMap[item]
        },
        {
            title: 'Use in search',
            dataIndex: 'generateBulkUpload',
            key: 'generateBulkUpload',
            width: '150px',
            render: (checked, item) => <Checkbox
                checked={semanticData.keywordsProvider.merchantWordsCategories.find(i => i === item)}
                onChange={({target: {checked}}) => changeDataHandler('keywordsProvider', 'merchantWordsCategories', checked ? [...semanticData.keywordsProvider.merchantWordsCategories, item] : [...semanticData.keywordsProvider.merchantWordsCategories.filter(i => i !== item)])}
            />
        },
    ]


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

            <CustomTable
                columns={columns}
                dataSource={allEnums.enums.MerchantWordsCategory}
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