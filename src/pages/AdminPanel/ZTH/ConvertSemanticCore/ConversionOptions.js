import React from "react"
import {Checkbox, Select} from "antd"
import {HotColumn, HotTable} from "@handsontable/react"
import CustomSelect from "../../../../components/Select/Select"

const Option = Select.Option

const ConversionOptions = () => {

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
    return (
        <div className={'conversion-options'}>
            <h2>Conversion options</h2>
            <h3>Select advertising types to convert</h3>

            <Checkbox>Convert Sponsored Products Semantic core</Checkbox>
            <br/>
            <br/>
            <Checkbox>Convert Sponsored Display Semantic Core (not available for Amazon Bulk Upload files)</Checkbox>
            <br/>
            <br/>

            <h3>Generate bulk upload for campaign types:</h3>

            <HotTable
                data={data}
                stretchH={'all'}
                licenseKey={'non-commercial-and-evaluation'}
                colWidths={[5, 1]}
                height="450"
            >
                <HotColumn
                    data={"campaignType"}
                    title="Campaign type"
                    readOnly={true}
                />

                <HotColumn
                    data={"generateBulkUpload"}
                    type={"checkbox"}
                    title="Generate"
                    className="htCenter"
                />
            </HotTable>

            <div className="form-group  w-25">
                <label htmlFor="">Campaigns status in Bulk Upload</label>
                <CustomSelect>
                    <Option value={1}>Enabled</Option>
                </CustomSelect>
            </div>

            <div className="form-group  w-25">
                <label htmlFor="">Output type</label>
                <CustomSelect>
                    <Option value={1}>xlsx</Option>
                </CustomSelect>
            </div>

            <div className="form-group w-25">
                <label htmlFor="">Convert for marketplace</label>
                <CustomSelect>
                    <Option value={1}>USA</Option>
                </CustomSelect>
            </div>

            <div className="form-group w-25">
                <Checkbox>Save as Amazon Bulk Upload</Checkbox>
            </div>
        </div>
    )
}

export default ConversionOptions
