import React from "react"
import {Checkbox, Select} from "antd"
import _ from "lodash"
import CustomTable from "../../../../components/Table/CustomTable"
import CustomSelect from "../../../../components/Select/Select"

const Option = Select.Option

const CreateOptions = () => {

    const columns = [
        {
            title: 'Category name',
            dataIndex: 'campaignType',
            key: 'campaignType',
            width: '300px',
        },
        {
            title: 'Use in search',
            dataIndex: 'generateBulkUpload',
            key: 'generateBulkUpload',
            width: '150px',
            render: (checked, item) => <Checkbox
                checked={!!checked}
                // onChange={({target: {checked}}) => changeBulkUploadOptionsHandler(item.campaignType, checked)}
            />
        },
    ]


    return (<div className={'conversion-options'}>
            <div className="row cols-4">
                <div className="form-group ">
                    <label htmlFor="">Choose PPC plan:</label>
                    <CustomSelect
                        getPopupContainer={trigger => trigger}
                        disabled={true}
                        // value={semanticData.conversionOptions.converter.campaignsStatus}
                        // onChange={value => changeConversionOptionsHandler('converter', 'campaignsStatus', value)}
                    >
                    </CustomSelect>
                </div>
                <div className="form-group ">
                    <label htmlFor="">Choose campaign compression strategy:</label>
                    <CustomSelect
                        getPopupContainer={trigger => trigger}
                        // value={semanticData.conversionOptions.converter.campaignsStatus}
                        // onChange={value => changeConversionOptionsHandler('converter', 'campaignsStatus', value)}
                    >
                        <Option value={'wide'}>Wide</Option>
                        <Option value={'simple'}>Simple</Option>
                    </CustomSelect>
                </div>

            </div>


            <h2>Merchant Words categories:</h2>

            <CustomTable
                columns={columns}
                // dataSource={bulkUploadOptions}
            />

            <br/>
            <br/>

            <div className="row actions">
                <button
                    // disabled={convertProcessing}
                    className={'btn default submit'}
                    // onClick={onConvert}
                >
                    Get input parameters file
                </button>
                <button
                    // disabled={!selectedUserId}
                    className={'btn default submit'}
                    // onClick={() => setVisibleConfirm(true)}
                >
                    Schedule Zero to Hero job
                </button>
            </div>
        </div>
    )
}

export default CreateOptions