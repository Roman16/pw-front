import React from "react"
import {Checkbox, Input} from "antd"
import CustomTable from "../../../../components/Table/CustomTable"
import ExcelTable from "../../../../components/ExcelTable/ExcelTable"
import {columns} from "./Keywords/allColumns"
import {keyColumn, textColumn} from "react-datasheet-grid"

const ProductInformation = ({semanticData, onChange}) => {

    const changeDataHandler = (obg, name, value) => {
        onChange({
            ...semanticData,
            [obg]: {
                ...semanticData[obg],
                [name]: value
            }
        })
    }

    const changeTableHandler = (name, value, index, object = 'zeroToHero') => {
        const newData = [...semanticData[object][name]]


        newData[index] = value

        onChange({
            ...semanticData,
            [object]: {
                ...semanticData[object],
                [name]: [...newData]
            }
        })
    }

    const TCAColumns = [
        {...keyColumn('text', textColumn), title: 'Competitor ASIN', width: 1},

        // {
        //     title: 'Competitor ASIN',
        //     dataIndex: 'text',
        //     key: 'text',
        //     render: (text, item, index) => <Input
        //         value={item}
        //         onChange={({target: {value}}) => changeTableHandler('additionalTopCompetitorASINs', value, index)}
        //     />
        // },
    ]
    const TPKPColumns = [
        {...keyColumn('text', textColumn), title: 'Keyword text', width: 1},
        //
        // {
        //     title: 'Keyword text',
        //     dataIndex: 'text',
        //     key: 'text',
        //     render: (text, item, index) => <Input
        //         value={item}
        //         onChange={({target: {value}}) => changeTableHandler('keywordsForTPKPCampaign', value, index)}
        //     />
        // },
    ]

    const defenseColumns = [
        {...keyColumn('text', textColumn), title: 'ASIN', width: 1},

        // {
        //     title: 'ASIN',
        //     dataIndex: 'text',
        //     key: 'text',
        //     render: (text, item, index) => <Input
        //         value={item}
        //         onChange={({target: {value}}) => changeTableHandler('asinsForDefenseCampaign', value, index)}
        //     />
        // },
    ]
    const keywordsToSearchForSuggestedASINsColumns = [
        {...keyColumn('text', textColumn), title: 'Keyword text', width: 1},

        // {
        //     title: 'Keyword text',
        //     dataIndex: 'text',
        //     key: 'text',
        //     render: (text, item, index) => <Input
        //         value={item}
        //         onChange={({target: {value}}) => changeTableHandler('keywordsToSearchForSuggestedASINs', value, index)}
        //     />
        // },
    ]
    const categoryLinksToParseASINsFromColumns = [
        {...keyColumn('text', textColumn), title: 'BSR category link', width: 1},

        // {
        //     title: 'BSR category link',
        //     dataIndex: 'text',
        //     key: 'text',
        //     render: (text, item, index) => <Input
        //         value={item}
        //         onChange={({target: {value}}) => changeTableHandler('categoryLinksToParseASINsFrom', value, index)}
        //     />
        // },
    ]
    const brandNamesColumns = [
        {...keyColumn('text', textColumn), title: 'Brand name', width: 1},
        //
        // {
        //     title: '',
        //     dataIndex: 'text',
        //     key: 'text',
        //     render: (text, item, index) => <Input
        //         value={item}
        //         onChange={({target: {value}}) => changeTableHandler('brandNames', value, index, 'productInformation')}
        //     />
        // },
    ]

    return (
        <div className={'product-information col'}>
            <h2>Product information:</h2>

            <div className="row cols-4">
                <div className="form-group">
                    <label htmlFor="">Product name:</label>
                    <Input
                        type="text"
                        value={semanticData.productInformation.productName}
                        onChange={({target: {value}}) => changeDataHandler('productInformation', 'productName', value)}
                    />
                </div>
                <div className="form-group padding-0">
                    <label htmlFor="">Brand name and alises:</label>
                    {/*<CustomTable*/}
                    {/*    columns={brandNamesColumns}*/}
                    {/*    dataSource={[...semanticData.productInformation.brandNames, '']}*/}
                    {/*/>*/}

                    <ExcelTable
                        data={semanticData.productInformation.brandNames.length > 0 ? semanticData.productInformation.brandNames : [{text: ''}]}
                        columns={brandNamesColumns}
                        onChange={(data) => changeDataHandler(data, 'brandNames')}
                    />
                </div>
            </div>

            <h2>Limits:</h2>
            <div className="row cols-4">
                <div className="form-group">
                    <label htmlFor="">Max new keywords count:</label>
                    <Input
                        type="number"
                        value={semanticData.keywordsProvider.maxNewKeywords}
                        onChange={({target: {value}}) => changeDataHandler('keywordsProvider', 'maxNewKeywords', value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">TPK keywords count:</label>
                    <Input
                        type="number"
                        value={semanticData.keywordsProvider.tpkKeywordsCount}
                        onChange={({target: {value}}) => changeDataHandler('keywordsProvider', 'tpkKeywordsCount', value)}
                    />
                </div>
            </div>

            <h2>Flags:</h2>
            <Checkbox
                checked={semanticData.zeroToHero.createSponsoredProductsSemanticCore}
                onChange={({target: {checked}}) => changeDataHandler('zeroToHero', 'createSponsoredProductsSemanticCore', checked)}
            >
                Create Sponsored Products Semantic Core
            </Checkbox>
            <Checkbox
                checked={semanticData.zeroToHero.createSponsoredDisplaySemanticCore}
                onChange={({target: {checked}}) => changeDataHandler('zeroToHero', 'createSponsoredDisplaySemanticCore', checked)}
            >
                Create Sponsored Display Semantic Core
            </Checkbox>
            <Checkbox
                checked={semanticData.zeroToHero.gatherAllVariationsForASINs}
                onChange={({target: {checked}}) => changeDataHandler('zeroToHero', 'gatherAllVariationsForASINs', checked)}
            >
                Gather variations for found ASINs
            </Checkbox>
            <Checkbox
                checked={semanticData.zeroToHero.createTCACampaign}
                onChange={({target: {checked}}) => changeDataHandler('zeroToHero', 'createTCACampaign', checked)}
            >
                Create "TCA" campaign (will use top 10 ASINs from subcategories for products)
            </Checkbox>

            {semanticData.zeroToHero.createTCACampaign && <div className="form-group w-25">
                <label htmlFor="">Add additional Top Competitors ASINs:</label>
                {/*<CustomTable*/}
                {/*    columns={TCAColumns}*/}
                {/*    dataSource={[...semanticData.zeroToHero.additionalTopCompetitorASINs, '']}*/}
                {/*/>*/}

                <ExcelTable
                    data={semanticData.zeroToHero.additionalTopCompetitorASINs.length > 0 ? semanticData.zeroToHero.additionalTopCompetitorASINs : [{text: ''}]}
                    columns={TCAColumns}
                    onChange={(data) => changeDataHandler(data, 'additionalTopCompetitorASINs')}
                />
            </div>}

            <Checkbox
                checked={semanticData.zeroToHero.createTPKPCampaign}
                onChange={({target: {checked}}) => changeDataHandler('zeroToHero', 'createTPKPCampaign', checked)}
            >
                Create "TPKP" campaign
            </Checkbox>

            {semanticData.zeroToHero.createTPKPCampaign && <div className="form-group w-25">
                <label htmlFor="">Keywords for TPKP campaign:</label>
                {/*<CustomTable*/}
                {/*    columns={TPKPColumns}*/}
                {/*    dataSource={[...semanticData.zeroToHero.keywordsForTPKPCampaign, '']}*/}
                {/*/>*/}

                <ExcelTable
                    data={semanticData.zeroToHero.keywordsForTPKPCampaign.length > 0 ? semanticData.zeroToHero.keywordsForTPKPCampaign : [{text: ''}]}
                    columns={TPKPColumns}
                    onChange={(data) => changeDataHandler(data, 'keywordsForTPKPCampaign')}
                />

            </div>}

            <Checkbox
                checked={semanticData.zeroToHero.createDefenseCampaign}
                onChange={({target: {checked}}) => changeDataHandler('zeroToHero', 'createDefenseCampaign', checked)}
            >
                Create "Defense ASINs" campaign
            </Checkbox>

            {semanticData.zeroToHero.createDefenseCampaign && <div className="form-group w-25">
                <label htmlFor="">ASINs to Defend (create PATs in Defense ASINs campaign):</label>
                {/*<CustomTable*/}
                {/*    columns={defenseColumns}*/}
                {/*    dataSource={[...semanticData.zeroToHero.asinsForDefenseCampaign, '']}*/}
                {/*/>*/}

                <ExcelTable
                    data={semanticData.zeroToHero.asinsForDefenseCampaign.length > 0 ? semanticData.zeroToHero.asinsForDefenseCampaign : [{text: ''}]}
                    columns={defenseColumns}
                    onChange={(data) => changeDataHandler(data, 'asinsForDefenseCampaign')}
                />
            </div>}


            <Checkbox
                checked={semanticData.zeroToHero.filterKeywordsBasedOnListingWords}
                onChange={({target: {checked}}) => changeDataHandler('zeroToHero', 'filterKeywordsBasedOnListingWords', checked)}
            >
                Filter Semantic Core keywords using words from listings for provided products
            </Checkbox>

            <Checkbox
                checked={semanticData.zeroToHero.smartFilterSuggestedASINs}
                onChange={({target: {checked}}) => changeDataHandler('zeroToHero', 'smartFilterSuggestedASINs', checked)}
            >
                Filter Suggested ASINs (based on price, reviews count, rating)
            </Checkbox>

            <div className="form-group w-50">
                <label htmlFor="">Keywords to search on Amazon for Suggested ASINs (SA campaigns):</label>
                {/*<CustomTable*/}
                {/*    columns={keywordsToSearchForSuggestedASINsColumns}*/}
                {/*    dataSource={[...semanticData.zeroToHero.keywordsToSearchForSuggestedASINs, '']}*/}
                {/*/>*/}

                <ExcelTable
                    data={semanticData.zeroToHero.keywordsToSearchForSuggestedASINs.length > 0 ? semanticData.zeroToHero.keywordsToSearchForSuggestedASINs : [{text: ''}]}
                    columns={keywordsToSearchForSuggestedASINsColumns}
                    onChange={(data) => changeDataHandler(data, 'keywordsToSearchForSuggestedASINs')}
                />
            </div>

            <div className="form-group w-50">
                <label htmlFor="">BSR Subcategory links to fetch Category ASINs from (CA campaigns) <br/> (e.g.: <a
                    _ngcontent-dqt-c36=""
                    href="https://www.amazon.com/gp/bestsellers/lawn-garden/553966/ref=pd_zg_hrsr_lawn-garden"
                    target="_blank">https://www.amazon.com/gp/bestsellers/lawn-garden/553966/ref=pd_zg_hrsr_lawn-garden</a>):</label>
                {/*<CustomTable*/}
                {/*    columns={categoryLinksToParseASINsFromColumns}*/}
                {/*    dataSource={[...semanticData.zeroToHero.categoryLinksToParseASINsFrom, '']}*/}
                {/*/>*/}

                <ExcelTable
                    data={semanticData.zeroToHero.categoryLinksToParseASINsFrom.length > 0 ? semanticData.zeroToHero.categoryLinksToParseASINsFrom : [{text: ''}]}
                    columns={categoryLinksToParseASINsFromColumns}
                    onChange={(data) => changeDataHandler(data, 'categoryLinksToParseASINsFrom')}
                />

            </div>
        </div>
    )
}

export default ProductInformation