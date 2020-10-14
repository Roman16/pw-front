import React from "react"
import {HotTable, HotColumn} from '@handsontable/react'

const GenerateBulk = () => {

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
        <div className={'generate-bulk'}>
            <h2>Generate bulk upload for campaign types:</h2>

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
        </div>
    )
}

export default GenerateBulk
