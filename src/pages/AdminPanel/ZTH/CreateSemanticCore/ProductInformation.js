import React from "react"
import {Checkbox, Input, Select} from "antd"
import ExcelTable from "../../../../components/ExcelTable/ExcelTable"
import {keyColumn, textColumn} from "react-datasheet-grid"
import CustomSelect from "../../../../components/Select/Select"

const Option = Select.Option

const ProductInformation = ({semanticData, allEnums, onChange}) => {

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
                [name]: data
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

    const ownBrandNamesColumns = [
        {...keyColumn('text', textColumn), title: 'Own brand name and aliases', width: 1},
    ]
    const competitorBrandsColumns = [
        {...keyColumn('mainName', textColumn), title: 'Main name', width: 1},
        {...keyColumn('aliases', textColumn), title: 'Aliases separated by comma', width: 1},
    ]
    const competitorBrandsOffAmazonColumns = [
        {...keyColumn('mainName', textColumn), title: 'Main name', width: 1},
        {...keyColumn('aliases', textColumn), title: 'Aliases separated by comma', width: 1},
    ]

    return (
        <div className={'product-information col'}>
            <h2>Product information:</h2>

            <div className="row cols-4">
                <div className="form-group">
                    <label htmlFor="">Main product name:</label>
                    <Input
                        type="text"
                        value={semanticData.productInformation.mainProductName}
                        onChange={({target: {value}}) => changeDataHandler('productInformation', 'mainProductName', value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="">Main product ASIN:</label>
                    <Input
                        type="text"
                        value={semanticData.productInformation.mainProductAsin}
                        onChange={({target: {value}}) => changeDataHandler('productInformation', 'mainProductAsin', value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Main product SKU:</label>
                    <Input
                        type="text"
                        value={semanticData.productInformation.mainProductSku}
                        onChange={({target: {value}}) => changeDataHandler('productInformation', 'mainProductSku', value)}
                    />
                </div>
            </div>

            <div className="row cols-4">
                <div className="form-group">
                    <label htmlFor="">Choose campaign name generation strategy:</label>
                    <CustomSelect
                        value={semanticData.zeroToHero.campaignNameGenerationStrategyType}
                        onChange={value => changeDataHandler('zeroToHero', 'campaignNameGenerationStrategyType', value)}
                    >
                        {allEnums.enums.CampaignNameGenerationStrategyType.map(type => (
                            <Option value={type}>
                                {type}
                            </Option>
                        ))}
                    </CustomSelect>
                </div>
            </div>

            <br/>

            <Checkbox
                checked={semanticData.zeroToHero.useManuallyProvidedCompetitorBrands}
                onChange={({target: {checked}}) => changeDataHandler('zeroToHero', 'useManuallyProvidedCompetitorBrands', checked)}
            >
                Use manually provided competitor brands (instead of Software gathering them)
            </Checkbox>


            <div className="row cols-3">
                <div className="form-group">
                    <label htmlFor="">Own brand name (first row is a main name, other rows are aliases):</label>
                    <ExcelTable
                        data={semanticData.productInformation.ownBrandNames?.length > 0 ? semanticData.productInformation.ownBrandNames.map(i => ({text: i})) : [{text: ''}]}
                        columns={ownBrandNamesColumns}
                        onChange={(data) => changeTableHandler(data.map(i => i.text), 'ownBrandNames', 'productInformation')}
                    />
                </div>

                {semanticData.zeroToHero.useManuallyProvidedCompetitorBrands && <>
                    <div className="form-group">
                        <label htmlFor="">Competitor brands:</label>
                        <ExcelTable
                            data={semanticData.productInformation.competitorBrands?.length > 0 ? semanticData.productInformation.competitorBrands : [{mainName: '', aliases: ''}]}
                            columns={competitorBrandsColumns}
                            onChange={(data) => changeTableHandler(data, 'competitorBrands', 'productInformation')}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Competitor brands off Amazon:</label>
                        <ExcelTable
                            data={semanticData.productInformation.competitorBrandsOffAmazon?.length > 0 ? semanticData.productInformation.competitorBrandsOffAmazon : [{mainName: '', aliases: ''}]}
                            columns={competitorBrandsOffAmazonColumns}
                            onChange={(data) => changeTableHandler(data, 'competitorBrandsOffAmazon', 'productInformation')}
                        />
                    </div>
                </>}
            </div>

            <br/>
            <br/>

            <h2>Limits:</h2>
            <div className="row cols-5">
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

                <div className="form-group">
                    <label htmlFor="">Ad groups count to create new campaign:</label>
                    <Input
                        type="number"
                        value={semanticData.zeroToHero.generationRules.campaigns.adGroupsCountRequiredToCreateNewCampaign}
                        onChange={({target: {value}}) => changeDataHandler('zeroToHero', 'generationRules', {
                            campaigns: {
                                keywordsCountRequiredToCreateNewCampaign: semanticData.zeroToHero.generationRules.campaigns.keywordsCountRequiredToCreateNewCampaign,
                                adGroupsCountRequiredToCreateNewCampaign: +value
                            },
                            adGroups: {
                                keywordsCountRequiredToCreateNewAdGroup: semanticData.zeroToHero.generationRules.adGroups.keywordsCountRequiredToCreateNewAdGroup
                            }
                        })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Keywords count to create new campaign:</label>
                    <Input
                        type="number"
                        value={semanticData.zeroToHero.generationRules.campaigns.keywordsCountRequiredToCreateNewCampaign}
                        onChange={({target: {value}}) => changeDataHandler('zeroToHero', 'generationRules', {
                            campaigns: {
                                keywordsCountRequiredToCreateNewCampaign: +value,
                                adGroupsCountRequiredToCreateNewCampaign: semanticData.zeroToHero.generationRules.campaigns.adGroupsCountRequiredToCreateNewCampaign
                            },
                            adGroups: {
                                keywordsCountRequiredToCreateNewAdGroup: semanticData.zeroToHero.generationRules.adGroups.keywordsCountRequiredToCreateNewAdGroup
                            }
                        })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="">Keywords count to create new ad group:</label>
                    <Input
                        type="number"
                        value={semanticData.zeroToHero.generationRules.adGroups.keywordsCountRequiredToCreateNewAdGroup}
                        onChange={({target: {value}}) => changeDataHandler('zeroToHero', 'generationRules', {
                            campaigns: {
                                keywordsCountRequiredToCreateNewCampaign: semanticData.zeroToHero.generationRules.campaigns.keywordsCountRequiredToCreateNewCampaign,
                                adGroupsCountRequiredToCreateNewCampaign: semanticData.zeroToHero.generationRules.campaigns.adGroupsCountRequiredToCreateNewCampaign
                            },
                            adGroups: {
                                keywordsCountRequiredToCreateNewAdGroup: +value
                            }
                        })}
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
                    onChange={(data) => changeTableHandler(data.map(i => i.text), 'manuallyProvidedTopCompetitorASINs')}
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
                    onChange={(data) => changeTableHandler(data.map(i => i.text), 'keywordsForTPKPCampaign')}
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
                    onChange={(data) => changeTableHandler(data.map(i => i.text), 'asinsForDefenseCampaign')}
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
                    onChange={(data) => changeTableHandler(data.map(i => i.text), 'keywordsToSearchForSuggestedASINs')}
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
                    onChange={(data) => changeTableHandler(data.map(i => i.text), 'categoryLinksToParseASINsFrom')}
                />
            </div>
        </div>
    )
}

export default ProductInformation