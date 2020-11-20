import React, {useState} from "react"
import {Checkbox, Select} from "antd"
import {HotColumn, HotTable} from "@handsontable/react"
import CustomSelect from "../../../../components/Select/Select"
import CustomTable from "../../../../components/Table/CustomTable"
import {Radio} from 'antd'

const Option = Select.Option

const data = [
    {
        campaignType: 'Auto',
        generateBulkUpload: true
    },
    {
        campaignType: 'ExactPhrase',
        generateBulkUpload: true
    },
    {
        campaignType: 'PAT',
        generateBulkUpload: true
    },
    {
        campaignType: 'AutoCTA',
        generateBulkUpload: true
    },
    {
        campaignType: 'AutoNegative',
        generateBulkUpload: true
    },
    {
        campaignType: 'TPK',
        generateBulkUpload: true
    },
    {
        campaignType: 'DPK',
        generateBulkUpload: true
    },
    {
        campaignType: 'Broad',
        generateBulkUpload: true
    },
    {
        campaignType: 'CloseVariants',
        generateBulkUpload: true
    },
    {
        campaignType: 'Variations',
        generateBulkUpload: true
    },
    {
        campaignType: 'ExactSimple',
        generateBulkUpload: true
    },
    {
        campaignType: 'ExactOther',
        generateBulkUpload: true
    },
    {
        campaignType: 'STESTP',
        generateBulkUpload: true
    },
    {
        campaignType: 'Misspellings',
        generateBulkUpload: true
    },
    {
        campaignType: 'Brands',
        generateBulkUpload: true
    },
    {
        campaignType: 'TPA',
        generateBulkUpload: true
    },
    {
        campaignType: 'ASINs',
        generateBulkUpload: true
    },
    {
        campaignType: 'Categories',
        generateBulkUpload: true
    },
]

const ConversionOptions = () => {
    const [actionType, setActionType] = useState('convert')

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
            render: (checked) => <Checkbox checked={checked}/>
        },
    ]

    return (
        <div className={'conversion-options'}>
            <Radio.Group onChange={({target: {value}}) => setActionType(value)} value={actionType}>
                <Radio value={'convert'}>Convert to Bulk Upload File</Radio>
                <Radio value={'upload'}>Upload to AmazonAccount</Radio>
            </Radio.Group>

            <h2>Conversion options</h2>
            <h3>Select advertising types to convert</h3>

            <Checkbox>Convert Sponsored Products Semantic core</Checkbox>
            <br/>
            <br/>
            <Checkbox>Convert Sponsored Display Semantic Core (not available for Amazon Bulk Upload files)</Checkbox>
            <br/>
            <br/>

            <h3>Generate bulk upload for campaign types:</h3>

            {actionType === 'convert' && <CustomTable
                columns={columns}
                dataSource={data}
            />}

            <div className="form-group  w-25">
                <label htmlFor="">Campaigns status in Bulk Upload</label>
                <CustomSelect>
                    <Option value={'Enabled'}>Enabled</Option>
                    <Option value={'Paused'}>Paused</Option>
                </CustomSelect>
            </div>

            {actionType === 'convert' && <>
                <div className="form-group  w-25">
                    <label htmlFor="">Output type</label>
                    <CustomSelect
                        name={'FileExtension'}
                    >
                        <Option value={'xls'}>xls</Option>
                        <Option value={'xlsx'}>xlsx</Option>
                        <Option value={'csv'}>csv</Option>
                    </CustomSelect>
                </div>

                <div className="form-group w-25">
                    <label htmlFor="">Convert for marketplace</label>
                    <CustomSelect
                        name={'MarketplaceType'}
                    >
                        <Option value={'USA'}>USA</Option>
                        <Option value={'Europe'}>Europe</Option>
                    </CustomSelect>
                </div>

                <div className="form-group w-25">
                    <Checkbox>Save as Amazon Bulk Upload</Checkbox>
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
                <button className={'btn default submit'}>
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

export default ConversionOptions
