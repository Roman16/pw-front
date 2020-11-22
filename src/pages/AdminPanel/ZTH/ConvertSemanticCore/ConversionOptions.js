import React, {useEffect, useState} from "react"
import {Checkbox, Select} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import CustomTable from "../../../../components/Table/CustomTable"
import {Radio} from 'antd'
import _ from 'lodash'
import {CampaignType} from "./constans"

const Option = Select.Option

const data = Object.keys(CampaignType).map(key => ({
    campaignType: key,
    generateBulkUpload: true
}))

const ConversionOptions = ({semanticData, onConvert, onChange}) => {
    const [actionType, setActionType] = useState('convert'),
        [bulkUploadOptions, setBulkUploadOptions] = useState([...data])

    const columns = [
        {
            title: 'Campaign type',
            dataIndex: 'campaignType',
            key: 'campaignType',
            width: '300px',
        },
        {
            title: 'Generate',
            dataIndex: 'generateBulkUpload',
            key: 'generateBulkUpload',
            width: '150px',
            render: (checked) => <Checkbox
                checked={checked}
            />
        },
    ]

    useEffect(() => {
        onChange({
            ...semanticData,
            conversionOptions: {
                ...semanticData.conversionOptions,
                converter: {
                    ...semanticData.conversionOptions.converter,
                    generateBulkUploadForCampaignTypes: _.filter(bulkUploadOptions, {generateBulkUpload: true}).map(item => item.campaignType)
                }
            }
        })
    }, [bulkUploadOptions])

    return (
        <div className={'conversion-options'}>
            <Radio.Group onChange={({target: {value}}) => setActionType(value)} value={actionType}>
                <Radio value={'convert'}>Convert to Bulk Upload File</Radio>
                <Radio value={'upload'}>Upload to AmazonAccount</Radio>
            </Radio.Group>

            <h2>Conversion options</h2>
            <h3>Select advertising types to convert</h3>

            <Checkbox
                checked={semanticData.conversionOptions.zeroToHero.createSponsoredProductsSemanticCore}
            >
                Convert Sponsored Products Semantic core
            </Checkbox>
            <br/>
            <br/>
            <Checkbox
                checked={semanticData.conversionOptions.zeroToHero.createSponsoredDisplaySemanticCore}
            >
                Convert Sponsored Display Semantic Core (not available for Amazon Bulk Upload files)
            </Checkbox>
            <br/>
            <br/>

            <h3>Generate bulk upload for campaign types:</h3>

            {actionType === 'convert' && <CustomTable
                columns={columns}
                dataSource={data}
            />}

            <div className="form-group  w-25">
                <label htmlFor="">Campaigns status in Bulk Upload</label>
                <CustomSelect
                    value={semanticData.conversionOptions.converter.campaignsStatus}
                >
                    <Option value={'Enabled'}>Enabled</Option>
                    <Option value={'Paused'}>Paused</Option>
                </CustomSelect>
            </div>

            {actionType === 'convert' && <>
                <div className="form-group  w-25">
                    <label htmlFor="">Output type</label>
                    <CustomSelect
                        value={semanticData.conversionOptions.saver.saveBulkUploadAs}
                    >
                        <Option value={'xls'}>xls</Option>
                        <Option value={'xlsx'}>xlsx</Option>
                        <Option value={'csv'}>csv</Option>
                    </CustomSelect>
                </div>

                <div className="form-group w-25">
                    <label htmlFor="">Convert for marketplace</label>
                    <CustomSelect
                        value={semanticData.conversionOptions.converter.convertForMarketplace}
                    >
                        <Option value={'USA'}>USA</Option>
                        <Option value={'Europe'}>Europe</Option>
                    </CustomSelect>
                </div>

                <div className="form-group w-25">
                    <Checkbox
                        checked={semanticData.convertToAmazonBulkUpload}
                    >
                        Save as Amazon Bulk Upload
                    </Checkbox>
                </div>
            </>}

            {actionType === 'upload' && <div className="form-group  w-25">
                <label htmlFor="">Select a user</label>

                <CustomSelect
                    showSearch
                    optionFilterProp={false}
                    // onSearch={searchHandler}
                    filterOption={false}
                    // onChange={e => onChange('id', e)}
                    // value={selectedUserId}
                >
                    {/*{userList.map(user => (*/}
                    {/*    <Option value={user.id}>*/}
                    {/*        <b>{`${user.name} ${user.last_name}`}</b>*/}
                    {/*        <br/>*/}
                    {/*        {user.email}*/}
                    {/*    </Option>*/}
                    {/*))}*/}
                </CustomSelect>
            </div>}

            {actionType === 'convert' ?
                <button className={'btn default submit'} onClick={onConvert}>
                    Convert semantics
                </button>
                :
                <button className={'btn default submit'}>
                    Upload semantics
                </button>
            }
        </div>
    )
}

export default React.memo(ConversionOptions)
