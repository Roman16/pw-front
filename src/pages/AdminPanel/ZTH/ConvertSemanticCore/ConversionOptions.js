import React, {useEffect, useState} from "react"
import {Checkbox, Select, Spin} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import CustomTable from "../../../../components/Table/CustomTable"
import {Radio} from 'antd'
import _ from 'lodash'
import {CampaignType} from "./constans"
import ConfirmUploadWindow from "./ConfirmUploadWindow"
import {adminServices} from "../../../../services/admin.services"
import ExcelTable from "../../../../components/ExcelTable/ExcelTable"
import {checkboxColumn, keyColumn, textColumn} from "react-datasheet-grid"

const Option = Select.Option

let fullUsersList = []

const ConversionOptions = ({semanticData, onConvert, uploadProcessing, admin, convertProcessing, zthEnums, onUpload, onChange, onGetParams}) => {
    const [visibleConfirm, setVisibleConfirm] = useState(false),
        [usersList, setUsersList] = useState([]),
        [selectedUserId, setSelectedUserId] = useState()

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
        if (semanticData.conversionOptions.converter.generateBulkUploadForCampaignTypes.length > 0) {
            changeBulkUploadOptionsHandler(zthEnums.aggregates.spCampaignTypesOrdered.map(key => ({
                campaignType: key,
                generateBulkUpload: false
            })))
        } else {
            changeBulkUploadOptionsHandler(zthEnums.aggregates.spCampaignTypesOrdered.map(key => ({
                campaignType: key,
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

    const changeBulkUploadOptionsHandler = (data) => {
        onChange({
            ...semanticData,
            conversionOptions: {
                ...semanticData.conversionOptions,
                converter: {
                    ...semanticData.conversionOptions.converter,
                    generateBulkUploadForCampaignTypes: _.filter(data, {generateBulkUpload: true}).map(item => item.campaignType)
                }
            }
        })
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
        admin && getUsersList()
    }, [])

    useEffect(() => {
        if (!uploadProcessing) setVisibleConfirm(false)
    }, [uploadProcessing])

    const columns = [
        {...keyColumn('campaignType', textColumn), disabled: true, title: 'Campaign type', width: 3},
        {...keyColumn('generateBulkUpload', checkboxColumn), title: 'Generate', width: 2},
    ]

    return (
        <>
            <div className={'conversion-options'}>
                <h2>Select Operation</h2>
                <Radio.Group
                    onChange={({target: {value}}) => onChange({
                        ...semanticData,
                        settings: {
                            ...semanticData.settings,
                            actionType: value
                        }
                    })}
                    value={semanticData.settings.actionType}
                >
                    <Radio value={'convert'}>Convert to Bulk Upload File</Radio>
                    {admin && <Radio value={'upload'}>Upload to Amazon Account</Radio>}
                </Radio.Group>

                <h2>{semanticData.settings.actionType === 'convert' ? 'Conversion' : 'Upload'} options</h2>
                <h3>Select advertising types to convert</h3>

                <Checkbox
                    checked={semanticData.conversionOptions.zeroToHero.createSponsoredProductsSemanticCore}
                    onChange={({target: {checked}}) => changeConversionOptionsHandler('zeroToHero', 'createSponsoredProductsSemanticCore', checked)}
                >
                    {semanticData.settings.actionType === 'convert' ? 'Convert' : 'Upload'} Sponsored Products Semantic
                    core
                </Checkbox>
                <br/>
                <br/>
                <Checkbox
                    checked={semanticData.conversionOptions.zeroToHero.createSponsoredDisplaySemanticCore}
                    onChange={({target: {checked}}) => changeConversionOptionsHandler('zeroToHero', 'createSponsoredDisplaySemanticCore', checked)}
                >
                    {semanticData.settings.actionType === 'convert' ? 'Convert' : 'Upload'} Sponsored Display Semantic
                    Core {semanticData.settings.actionType === 'convert' && '(not available for Amazon Bulk Upload files)'}
                </Checkbox>
                <br/>
                <br/>

                {semanticData.settings.actionType === 'convert' && <>
                    <h3>Generate bulk upload for campaign types:</h3>

                    <button className="btn default" onClick={switchAllOptions}>
                        {semanticData.conversionOptions.converter.generateBulkUploadForCampaignTypes.length > 0 ? 'Disable' : 'Enable'} all
                    </button>

                    <br/>

                    <ExcelTable
                        data={[...zthEnums.aggregates.spCampaignTypesOrdered.map(key => ({
                            campaignType: key,
                            generateBulkUpload: semanticData.conversionOptions.converter.generateBulkUploadForCampaignTypes.includes(key)
                        }))]}
                        columns={columns}
                        onChange={changeBulkUploadOptionsHandler}
                    />
                    <br/>
                </>}

                <div className="form-group  w-25">
                    <label htmlFor="">
                        Campaigns
                        status {semanticData.settings.actionType === 'convert' ? 'in Bulk Upload ' : 'after upload'}
                    </label>
                    <CustomSelect
                        getPopupContainer={trigger => trigger}
                        value={semanticData.conversionOptions.converter.campaignsStatus}
                        onChange={value => changeConversionOptionsHandler('converter', 'campaignsStatus', value)}
                    >
                        {zthEnums.enums.Status.map(item => (
                            <Option value={item}>{item}</Option>
                        ))}
                    </CustomSelect>
                </div>

                {semanticData.settings.actionType === 'convert' && <>
                    {/*<div className="form-group  w-25">*/}
                    {/*    <label htmlFor="">Output type</label>*/}
                    {/*    <CustomSelect*/}
                    {/*        getPopupContainer={trigger => trigger}*/}
                    {/*        value={semanticData.conversionOptions.saver.saveBulkUploadAs}*/}
                    {/*        onChange={value => changeConversionOptionsHandler('saver', 'saveBulkUploadAs', value)}*/}
                    {/*    >*/}
                    {/*        <Option value={'xls'}>xls</Option>*/}
                    {/*        <Option value={'xlsx'}>xlsx</Option>*/}
                    {/*        <Option value={'csv'}>csv</Option>*/}
                    {/*    </CustomSelect>*/}
                    {/*</div>*/}

                    <div className="form-group w-25">
                        <label htmlFor="">Convert for Amazon region</label>
                        <CustomSelect
                            getPopupContainer={trigger => trigger}
                            value={semanticData.conversionOptions.converter.convertForAmazonRegion}
                            onChange={value => changeConversionOptionsHandler('converter', 'convertForAmazonRegion', value)}
                        >
                            {zthEnums.enums.AmazonRegion.map(item => (
                                <Option value={item}>{item.replaceAll('_', ' ')}</Option>
                            ))}
                        </CustomSelect>
                    </div>
                </>}

                {semanticData.settings.actionType === 'upload' && <div className="form-group  w-25 users">
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

                {semanticData.settings.actionType === 'convert' && <>
                    <Checkbox
                        checked={semanticData.convertToXLSXWorkBook}
                        onChange={({target: {checked}}) => changeConversionOptionsHandler(undefined, 'convertToXLSXWorkBook', checked)}
                    >
                        Save as google spreadsheet
                    </Checkbox>
                    <br/>
                    <br/>
                    <Checkbox
                        checked={semanticData.convertToAmazonBulkUpload}
                        onChange={({target: {checked}}) => changeConversionOptionsHandler(undefined, 'convertToAmazonBulkUpload', checked)}
                    >
                        Save as Amazon Bulk Upload
                    </Checkbox>
                    <br/>
                    <br/>
                </>}

                <div className="row actions">
                    <button
                        className={'btn default submit'}
                        onClick={onGetParams}
                    >
                        Save conversion settings
                    </button>

                    {semanticData.settings.actionType === 'convert' ?
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
                        </button>}
                </div>
            </div>

            <ConfirmUploadWindow
                visible={visibleConfirm}
                user={_.find(usersList, {id: selectedUserId})}
                semanticName={semanticData.conversionOptions.productInformation.mainProductName}
                uploadProcessing={uploadProcessing}

                onSubmit={() => onUpload(selectedUserId)}
                onCancel={() => setVisibleConfirm(false)}
            />
        </>
    )
}

export default React.memo(ConversionOptions)
