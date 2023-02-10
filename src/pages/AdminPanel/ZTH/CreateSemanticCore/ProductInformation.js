import React from "react"
import {Checkbox, Input} from "antd"
import CustomTable from "../../../../components/Table/CustomTable"
import ExcelTable from "../../../../components/ExcelTable/ExcelTable"
import {columns} from "./Keywords/allColumns"
import {keyColumn, textColumn} from "react-datasheet-grid"

const ProductInformation = ({semanticData, onChange}) => {

    const changeDataHandler = (obg, name, value) => {
        if (obg === 'zeroToHero' && name === 'createTCACampaign' && !value) {
            onChange({
                ...semanticData,
                [obg]: {
                    ...semanticData[obg],
                    [name]: value,
                    'createTCACampaignUsingManuallyProvidedASINsInstead': false
                }
            })
        } else {
            onChange({
                ...semanticData,
                [obg]: {
                    ...semanticData[obg],
                    [name]: value
                }
            })
        }
    }

    const changeTableHandler = (data, name, object = 'zeroToHero') => {
        onChange({
            ...semanticData,
            [object]: {
                ...semanticData[object],
                [name]: [...data.map(i => i.text)]
            }
        })
    }

    const TCAColumns = [
        {...keyColumn('text', textColumn), title: 'Competitor ASIN', width: 1},
    ]
    const TPKPColumns = [
        {...keyColumn('text', textColumn), title: 'Keyword text', width: 1},
    ]
    const defenseColumns = [
        {...keyColumn('text', textColumn), title: 'ASIN', width: 1},
    ]
    const keywordsToSearchForSuggestedASINsColumns = [
        {...keyColumn('text', textColumn), title: 'Keyword text', width: 1},
    ]
    const categoryLinksToParseASINsFromColumns = [
        {...keyColumn('text', textColumn), title: 'BSR category link', width: 1},
    ]
    const brandNamesColumns = [
        {...keyColumn('text', textColumn), title: 'Brand name', width: 1},
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

                    <ExcelTable
                        data={semanticData.productInformation.brandNames?.length > 0 ? semanticData.productInformation.brandNames.map(i => ({text: i})) : [{text: ''}]}
                        columns={brandNamesColumns}
                        onChange={(data) => changeTableHandler(data, 'brandNames', 'productInformation')}
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

            {semanticData.zeroToHero.createTCACampaign && <Checkbox
                checked={semanticData.zeroToHero.createTCACampaignUsingManuallyProvidedASINsInstead}
                onChange={({target: {checked}}) => changeDataHandler('zeroToHero', 'createTCACampaignUsingManuallyProvidedASINsInstead', checked)}
            >
                Create "TCA" campaign using manually provided ASINs instead
            </Checkbox>}

            {semanticData.zeroToHero.createTCACampaignUsingManuallyProvidedASINsInstead &&
            <div className="form-group w-25">
                <label htmlFor="">Manually provided Top Competitors ASINs:</label>
                <ExcelTable
                    data={semanticData.zeroToHero.manuallyProvidedTopCompetitorASINs?.length > 0 ? semanticData.zeroToHero.manuallyProvidedTopCompetitorASINs.map(i => ({text: i})) : [{text: ''}]}
                    columns={TCAColumns}
                    onChange={(data) => changeTableHandler(data, 'manuallyProvidedTopCompetitorASINs')}
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
                <ExcelTable
                    data={semanticData.zeroToHero.keywordsForTPKPCampaign?.length > 0 ? semanticData.zeroToHero.keywordsForTPKPCampaign.map(i => ({text: i})) : [{text: ''}]}
                    columns={TPKPColumns}
                    onChange={(data) => changeTableHandler(data, 'keywordsForTPKPCampaign')}
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
                <ExcelTable
                    data={semanticData.zeroToHero.asinsForDefenseCampaign?.length > 0 ? semanticData.zeroToHero.asinsForDefenseCampaign.map(i => ({text: i})) : [{text: ''}]}
                    columns={defenseColumns}
                    onChange={(data) => changeTableHandler(data, 'asinsForDefenseCampaign')}
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
                <ExcelTable
                    data={semanticData.zeroToHero.keywordsToSearchForSuggestedASINs?.length > 0 ? semanticData.zeroToHero.keywordsToSearchForSuggestedASINs.map(i => ({text: i})) : [{text: ''}]}
                    columns={keywordsToSearchForSuggestedASINsColumns}
                    onChange={(data) => changeTableHandler(data, 'keywordsToSearchForSuggestedASINs')}
                />
            </div>

            <div className="form-group w-50">
                <label htmlFor="">BSR Subcategory links to fetch Category ASINs from (CA campaigns) <br/> (e.g.: <a
                    _ngcontent-dqt-c36=""
                    href="https://www.amazon.com/gp/bestsellers/lawn-garden/553966/ref=pd_zg_hrsr_lawn-garden"
                    target="_blank">https://www.amazon.com/gp/bestsellers/lawn-garden/553966/ref=pd_zg_hrsr_lawn-garden</a>):</label>
                <ExcelTable
                    data={semanticData.zeroToHero.categoryLinksToParseASINsFrom?.length > 0 ? semanticData.zeroToHero.categoryLinksToParseASINsFrom.map(i => ({text: i})) : [{text: ''}]}
                    columns={categoryLinksToParseASINsFromColumns}
                    onChange={(data) => changeTableHandler(data, 'categoryLinksToParseASINsFrom')}
                />
            </div>
        </div>
    )
}

export default ProductInformation