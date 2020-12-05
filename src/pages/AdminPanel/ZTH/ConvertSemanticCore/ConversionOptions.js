import React, {useEffect, useState} from "react"
import {Checkbox, Select, Spin} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import CustomTable from "../../../../components/Table/CustomTable"
import {Radio} from 'antd'
import _ from 'lodash'
import {CampaignType} from "./constans"
import ConfirmUploadWindow from "./ConfirmUploadWindow"
import {adminServices} from "../../../../services/admin.services"

const Option = Select.Option

const data = Object.keys(CampaignType).filter(item => item !== 'SDRemarketing' &&
    item !== 'SDTPA' &&
    item !== 'SDPA' &&
    item !== 'SDRA' &&
    item !== 'SDSA' &&
    item !== 'SDCategories')
    .map(key => ({
        campaignType: key,
        generateBulkUpload: true
    }))

let fullUsersList = []

const ConversionOptions = ({semanticData, onConvert, uploadProcessing, convertProcessing, onUpload, onChange}) => {
    const [actionType, setActionType] = useState('convert'),
        [visibleConfirm, setVisibleConfirm] = useState(false),
        [usersList, setUsersList] = useState([]),
        [selectedUserId, setSelectedUserId] = useState(),
        [bulkUploadOptions, setBulkUploadOptions] = useState([...data])

    const getUsersList = async () => {
        try {
            const res = await adminServices.fetchUsers()

            setUsersList(res.result.slice(0, 10))
            fullUsersList = res.result
        } catch (e) {
            console.log(e)
        }
    }

    const switchAllOptions = () => {
        if (_.some(bulkUploadOptions, {generateBulkUpload: true})) {
            setBulkUploadOptions(bulkUploadOptions.map(item => ({
                ...item,
                generateBulkUpload: false
            })))
        } else {
            setBulkUploadOptions(bulkUploadOptions.map(item => ({
                ...item,
                generateBulkUpload: true
            })))
        }
    }

    const searchHandler = (text) => {
        setSelectedUserId(undefined)

        if (text.length > 2) {
            setUsersList(fullUsersList.filter(user => {
                return `${user.name} ${user.last_name}`.toLowerCase().indexOf(text.toLowerCase()) >= 0 || user.email.toLowerCase().indexOf(text.toLowerCase()) >= 0
            }))
        } else {
            setUsersList(fullUsersList.slice(0, 10))
        }
    }

    const changeBulkUploadOptionsHandler = (campaignType, value) => {
        setBulkUploadOptions(bulkUploadOptions.map(item => {
            if (campaignType === item.campaignType) item.generateBulkUpload = value

            return item
        }))
    }

    const changeConversionOptionsHandler = (object, name, value) => {
        onChange({
            ...semanticData,
            ...object ? {
                    conversionOptions: {
                        ...semanticData.conversionOptions,
                        [object]: {
                            ...semanticData.conversionOptions[object],
                            [name]: value
                        }
                    }
                }
                :
                {[name]: value}
        })
    }

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

    useEffect(() => {
        getUsersList()
    }, [])

    useEffect(() => {
        if (!uploadProcessing) setVisibleConfirm(false)
    }, [uploadProcessing])

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
            render: (checked, item) => <Checkbox
                checked={!!checked}
                onChange={({target: {checked}}) => changeBulkUploadOptionsHandler(item.campaignType, checked)}
            />
        },
    ]

    return (
        <>
            <div className={'conversion-options'}>
                <h2>Select Operation</h2>
                <Radio.Group onChange={({target: {value}}) => setActionType(value)} value={actionType}>
                    <Radio value={'convert'}>Convert to Bulk Upload File</Radio>
                    <Radio value={'upload'}>Upload to Amazon Account</Radio>
                </Radio.Group>

                <h2>{actionType === 'convert' ? 'Conversion' : 'Upload'} options</h2>
                <h3>Select advertising types to convert</h3>

                <Checkbox
                    checked={semanticData.conversionOptions.zeroToHero.createSponsoredProductsSemanticCore}
                    onChange={({target: {checked}}) => changeConversionOptionsHandler('zeroToHero', 'createSponsoredProductsSemanticCore', checked)}
                >
                    {actionType === 'convert' ? 'Convert' : 'Upload'} Sponsored Products Semantic core
                </Checkbox>
                <br/>
                <br/>
                <Checkbox
                    checked={semanticData.conversionOptions.zeroToHero.createSponsoredDisplaySemanticCore}
                    onChange={({target: {checked}}) => changeConversionOptionsHandler('zeroToHero', 'createSponsoredDisplaySemanticCore', checked)}
                >
                    {actionType === 'convert' ? 'Convert' : 'Upload'} Sponsored Display Semantic
                    Core {actionType === 'convert' && '(not available for Amazon Bulk Upload files)'}
                </Checkbox>
                <br/>
                <br/>

                {actionType === 'convert' && <>
                    <h3>Generate bulk upload for campaign types:</h3>

                    <button className="btn default" onClick={switchAllOptions}>
                        {_.some(bulkUploadOptions, {generateBulkUpload: true}) ? 'Disable' : 'Enable'} all
                    </button>

                    <br/>

                    <CustomTable
                        columns={columns}
                        dataSource={bulkUploadOptions}
                    />
                </>}

                <div className="form-group  w-25">
                    <label htmlFor="">
                        Campaigns status {actionType === 'convert' ? 'in Bulk Upload ' : 'after upload'}
                    </label>
                    <CustomSelect
                        getPopupContainer={trigger => trigger}
                        value={semanticData.conversionOptions.converter.campaignsStatus}
                        onChange={value => changeConversionOptionsHandler('converter', 'campaignsStatus', value)}
                    >
                        <Option value={'Enabled'}>Enabled</Option>
                        <Option value={'Paused'}>Paused</Option>
                    </CustomSelect>
                </div>

                {actionType === 'convert' && <>
                    <div className="form-group  w-25">
                        <label htmlFor="">Output type</label>
                        <CustomSelect
                            getPopupContainer={trigger => trigger}
                            value={semanticData.conversionOptions.saver.saveBulkUploadAs}
                            onChange={value => changeConversionOptionsHandler('saver', 'saveBulkUploadAs', value)}
                        >
                            <Option value={'xls'}>xls</Option>
                            <Option value={'xlsx'}>xlsx</Option>
                            <Option value={'csv'}>csv</Option>
                        </CustomSelect>
                    </div>

                    <div className="form-group w-25">
                        <label htmlFor="">Convert for marketplace</label>
                        <CustomSelect
                            getPopupContainer={trigger => trigger}
                            value={semanticData.conversionOptions.converter.convertForMarketplace}
                            onChange={value => changeConversionOptionsHandler('converter', 'convertForMarketplace', value)}
                        >
                            <Option value={'USA'}>USA</Option>
                            <Option value={'Europe'}>Europe</Option>
                        </CustomSelect>
                    </div>

                    {/*<div className="form-group w-25">*/}
                    {/*    <Checkbox*/}
                    {/*        checked={semanticData.convertToAmazonBulkUpload}*/}
                    {/*        onChange={({target: {checked}}) => changeConversionOptionsHandler(undefined, 'convertToAmazonBulkUpload', checked)}*/}
                    {/*    >*/}
                    {/*        Save as Amazon Bulk Upload*/}
                    {/*    </Checkbox>*/}
                    {/*</div>*/}
                </>}

                {actionType === 'upload' && <div className="form-group  w-25 users">
                    <label htmlFor="">Select a user</label>

                    <CustomSelect
                        showSearch
                        optionFilterProp={false}
                        onSearch={searchHandler}
                        filterOption={false}
                        onChange={value => setSelectedUserId(value)}
                        value={selectedUserId}
                        getPopupContainer={trigger => trigger}
                    >
                        {usersList.map(user => (
                            <Option value={user.id}>
                                <b>{`${user.name} ${user.last_name}`}</b>
                                <br/>
                                <span>{user.email}</span>
                            </Option>
                        ))}
                    </CustomSelect>
                </div>}

                {actionType === 'convert' ?
                    <button disabled={convertProcessing} className={'btn default submit'} onClick={onConvert}>
                        Convert semantics

                        {convertProcessing && <Spin size={'small'}/>}
                    </button>
                    :
                    <button
                        disabled={!selectedUserId}
                        className={'btn default submit'} onClick={() => setVisibleConfirm(true)}
                    >
                        Upload semantics
                    </button>
                }
            </div>

            <ConfirmUploadWindow
                visible={visibleConfirm}
                user={_.find(usersList, {id: selectedUserId})}
                semanticName={semanticData.conversionOptions.productInformation.productName}
                uploadProcessing={uploadProcessing}

                onSubmit={() => onUpload(selectedUserId)}
                onCancel={() => setVisibleConfirm(false)}
            />
        </>
    )
}

export default React.memo(ConversionOptions)
