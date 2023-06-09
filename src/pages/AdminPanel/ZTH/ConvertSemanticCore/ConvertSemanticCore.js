import React, {useEffect, useState} from "react"
import {Input} from "antd"
import './ConvertSemanticCore.less'
import SemanticInformation from "./SemanticInformation"
import CampaignsBids from "./CampaignsBids"
import Variations from "./Variations"
import ConversionOptions from "./ConversionOptions"
import {adminServices} from "../../../../services/admin.services"
import {notification} from "../../../../components/Notification"
import {saveFile, saveGoogleSpreadsheet, saveWorkbook, saveInputParameters} from "../../../../utils/saveFile"

import _ from 'lodash'
import InputParameters from "../CreateSemanticCore/InputParameters"
import RouteLoader from "../../../../components/RouteLoader/RouteLoader"

//
// interface ConvertSemanticDataRequest {
//     url: string;
//     convertToXLSXWorkBook: boolean; // <- should always be false, 'xlsxWorkBook' won't be generated
//     convertToAmazonBulkUpload: boolean;
//     conversionOptions: {
//         converter: {
//             useInputParametersProductName: boolean; // <- should always be true
//             campaignsStatus: Status;
//             convertForMarketplace: MarketplaceType;
//             semanticCoreUrls: string[];
//             generateBulkUploadForCampaignTypes: CampaignType[];
//         };
//         productInformation: {
//             productName: string;
//             variations: IVariationInputParameters[];
//         };
//         saver: {
//             saveBulkUploadAs: FileExtension;
//         };
//         upload: {
//             bidsTemplate: BidsTemplate;
//             budgetsTemplate: BudgetsTemplate;
//         };
//         zeroToHero: {
//             ppcPlan: PPCPlan;
//             campaignsCompressionStrategy: CampaignsCompressionStrategy;
//             createSponsoredProductsSemanticCore: boolean;
//             createSponsoredDisplaySemanticCore: boolean;
//         };
//     };
// }

// const defaultEnums = {
//     "enums": {
//         "CampaignType": [
//             "Auto",
//             "ExactPhrase",
//             "PAT",
//             "AutoCTA",
//             "AutoNegative",
//             "TPK",
//             "DPK",
//             "Broad",
//             "CloseVariants",
//             "Variations",
//             "ExactSimple",
//             "ExactOther",
//             "STESTP",
//             "Misspellings",
//             "Brands",
//             "TCA",
//             "TPA",
//             "ASINs",
//             "Categories",
//             "SDRemarketing",
//             "SDTCA",
//             "SDTPA",
//             "SDPA",
//             "SDRA",
//             "SDSA",
//             "SDCategories"
//         ],
//         "AdGroupType": [
//             "AutoTargeting",
//             "RelevantExact",
//             "SemiRelevantExact",
//             "LooseRelevantExact",
//             "Broad",
//             "ExactLowAcos",
//             "ExactMediumAcos",
//             "ExactHighAcos",
//             "PhraseLowAcos",
//             "PhraseMediumAcos",
//             "PhraseHighAcos",
//             "MyBrand",
//             "CompetingBrands",
//             "KeywordsWithBrands",
//             "TopCompetitorsASINs",
//             "TopPerformingASINs",
//             "PerformingASINs",
//             "RiskASINs",
//             "SuggestedASINs",
//             "SuggestedCategories",
//             "SDRemarketing",
//             "SDTopCompetitorsASINs",
//             "SDTopPerformingASINs",
//             "SDPerformingASINs",
//             "SDRiskASINs",
//             "SDSuggestedASINs",
//             "SDSuggestedCategories"
//         ],
//         "CampaignsCompressionStrategy": [
//             "Wide",
//             "Compact"
//         ],
//         "MarketplaceType": [
//             "Europe"
//         ],
//         "PPCPlan": [
//             "Medium",
//             "High"
//         ],
//         "Status": [
//             "Paused"
//         ]
//     },
//     "aggregates": {
//         "campaignTypesOrdered": [
//             "Auto",
//             "ExactPhrase",
//             "PAT",
//             "AutoCTA",
//             "AutoNegative",
//             "TPK",
//             "DPK",
//             "Broad",
//             "Brands",
//             "TCA",
//             "TPA",
//             "ASINs",
//             "Categories",
//             "STESTP",
//             "Variations",
//             "CloseVariants",
//             "ExactSimple",
//             "ExactOther",
//             "Misspellings",
//             "SDRemarketing",
//             "SDTCA",
//             "SDTPA",
//             "SDPA",
//             "SDRA",
//             "SDSA",
//             "SDCategories"
//         ],
//         "spCampaignTypesOrdered": [
//             "Auto",
//             "ExactPhrase",
//             "PAT",
//             "AutoCTA",
//         ],
//         "sdCampaignTypesOrdered": [
//             "SDRemarketing",
//             "SDTCA",
//             "SDTPA",
//             "SDPA",
//             "SDRA",
//             "SDSA",
//             "SDCategories"
//         ],
//         "adGroupTypesOrdered": [
//             "AutoTargeting",
//             "Broad",
//             "ExactLowAcos",
//             "ExactMediumAcos",
//             "ExactHighAcos",
//             "PhraseLowAcos",
//             "PhraseMediumAcos",
//             "PhraseHighAcos",
//             "MyBrand",
//             "CompetingBrands",
//             "KeywordsWithBrands",
//             "RelevantExact",
//             "SemiRelevantExact",
//             "LooseRelevantExact",
//             "TopCompetitorsASINs",
//             "TopPerformingASINs",
//             "PerformingASINs",
//             "RiskASINs",
//             "SuggestedASINs",
//             "SuggestedCategories",
//             "SDRemarketing",
//             "SDTopCompetitorsASINs",
//             "SDTopPerformingASINs",
//             "SDPerformingASINs",
//             "SDRiskASINs",
//             "SDSuggestedASINs",
//             "SDSuggestedCategories"
//         ],
//         "spAdGroupTypesOrdered": [
//             "AutoTargeting",
//             "Broad",
//             "ExactLowAcos",
//             "ExactMediumAcos",
//             "ExactHighAcos",
//             "PhraseLowAcos",
//             "PhraseMediumAcos",
//             "PhraseHighAcos",
//             "MyBrand",
//             "CompetingBrands",
//             "KeywordsWithBrands",
//             "RelevantExact",
//             "SemiRelevantExact",
//             "LooseRelevantExact",
//             "TopCompetitorsASINs",
//             "TopPerformingASINs",
//             "PerformingASINs",
//             "RiskASINs",
//             "SuggestedASINs",
//             "SuggestedCategories"
//         ],
//         "sdAdGroupTypesOrdered": [
//             "SDRemarketing",
//             "SDTopCompetitorsASINs",
//             "SDTopPerformingASINs",
//             "SDPerformingASINs",
//             "SDRiskASINs",
//             "SDSuggestedASINs",
//             "SDSuggestedCategories"
//         ],
//         "campaignTypesForCompressionStrategy": {
//             "Wide": [
//                 "AutoCTA",
//                 "AutoNegative",
//                 "TPK",
//                 "DPK",
//                 "Broad",
//                 "Brands",
//                 "TCA",
//                 "TPA",
//                 "ASINs",
//                 "Categories",
//                 "STESTP",
//                 "Variations",
//                 "CloseVariants",
//                 "ExactSimple",
//                 "ExactOther",
//                 "Misspellings",
//                 "SDRemarketing",
//                 "SDTCA",
//                 "SDTPA",
//                 "SDPA",
//                 "SDRA",
//                 "SDSA",
//                 "SDCategories"
//             ],
//             "Simple": [
//                 "AutoCTA",
//                 "AutoNegative",
//                 "TPK",
//                 "DPK",
//                 "Broad",
//                 "Brands",
//                 "TCA",
//                 "TPA",
//                 "ASINs",
//                 "Categories",
//                 "STESTP",
//                 "Variations",
//                 "CloseVariants",
//                 "ExactSimple",
//                 "ExactOther",
//                 "Misspellings",
//                 "SDRemarketing",
//                 "SDTCA",
//                 "SDTPA",
//                 "SDPA",
//                 "SDRA",
//                 "SDSA",
//                 "SDCategories"
//             ],
//             "Compact": [
//                 "Auto",
//                 "ExactPhrase",
//                 "PAT",
//                 "Broad",
//                 "SDRemarketing",
//                 "SDTCA",
//                 "SDTPA",
//                 "SDPA",
//                 "SDRA",
//                 "SDSA",
//                 "SDCategories"
//             ]
//         }
//     }
// }

const ConvertSemanticCore = ({admin}) => {
    const [semanticInformation, setSemanticInformation] = useState(),
        [semanticUrl, setSemanticUrl] = useState(''),

        [zthEnums, setZthEnums] = useState({
            enums: {
                CampaignType: [],
                AdGroupType: [],
                CampaignsCompressionStrategy: [],
                AmazonRegion: [],
                PPCPlan: [],
                Status: []
            },
            aggregates: {
                campaignTypesOrdered: [],
                spCampaignTypesOrdered: [],
                sdCampaignTypesOrdered: [],
                adGroupTypesOrdered: [],
                spAdGroupTypesOrdered: [],
                sdAdGroupTypesOrdered: [],
                campaignTypesForCompressionStrategy: {}
            }
        }),
        [loadingInformation, setLoadingInformation] = useState(false),

        [semanticData, setSemanticData] = useState(),

        [uploadProcessing, setUploadProcessing] = useState(false),
        [convertProcessing, setConvertProcessing] = useState(false),
        [parseProcessing, setParseProcessing] = useState(false)

    const getZthEnums = async () => {
        try {
            const resEnums = await adminServices.fetchEnums()
            setZthEnums(resEnums)
        } catch (e) {

        }
    }

    const loadSemanticInformation = async (e) => {
        e.preventDefault()
        setSemanticInformation(undefined)
        setLoadingInformation(true)

        try {
            const {semanticData} = await adminServices.fetchSemanticInformation({url: semanticUrl})

            await setSemanticData({
                settings: {
                    manuallySetExactBid: false,
                    manuallyBudgets: false,
                    exactBid: 1,
                    ppcPlan: semanticData.ppcPlan,
                    budgetMultiplier: 1,
                    actionType: 'convert'
                },


                url: semanticUrl,
                convertToXLSXWorkBook: false,
                convertToAmazonBulkUpload: true,
                conversionOptions: {
                    converter: {
                        useInputParametersProductName: true,
                        campaignsStatus: zthEnums.enums.Status[0],
                        convertForAmazonRegion: zthEnums.enums.AmazonRegion[0],
                        semanticCoreUrls: [semanticUrl],
                        generateBulkUploadForCampaignTypes: [...zthEnums.aggregates.spCampaignTypesOrdered]
                    },
                    productInformation: {
                        productName: semanticData.productName,
                        variations: semanticData.variations
                    },
                    saver: {
                        saveBulkUploadAs: 'xlsx'
                    },
                    upload: {
                        bidsTemplate: {
                            adGroups: {},
                            campaigns: {}
                        },
                        budgetsTemplate: {}
                    },
                    zeroToHero: {
                        campaignsCompressionStrategy: semanticData.campaignsCompressionStrategy,
                        ppcPlan: semanticData.ppcPlan,
                        createSponsoredProductsSemanticCore: true,
                        createSponsoredDisplaySemanticCore: true
                    }
                }
            })

            setSemanticInformation({
                markupVersion: semanticData.markupVersion,
                zeroToHeroVersion: semanticData.zeroToHeroVersion
            })
        } catch (e) {
            console.log(e)
        }
        setLoadingInformation(false)
    }

    const convertSemanticHandler = async () => {
        setConvertProcessing(true)

        try {
            const res = await adminServices.convertSemantic({
                url: semanticData.url,
                convertToXLSXWorkBook: semanticData.convertToXLSXWorkBook,
                convertToAmazonBulkUpload: semanticData.convertToAmazonBulkUpload,
                conversionOptions: {
                    ...semanticData.conversionOptions,
                    productInformation: {
                        ...semanticData.conversionOptions.productInformation,
                        variations: _.mapValues(semanticData.conversionOptions.productInformation.variations, (item) => ({
                            ...item,
                            themeValues: item.themeValues.map(value => ({
                                ...value,
                                relatedValues: [...value.relatedValues.filter(i => !!i)]
                            }))
                        }))
                    },
                }
            })

            semanticData.convertToXLSXWorkBook && saveGoogleSpreadsheet(res)

            res.bulksheets && res.bulksheets.forEach(doc => {
                saveFile(doc, semanticData.conversionOptions.saver.saveBulkUploadAs)
            })

            setConvertProcessing(false)
            notification.success({title: 'Success!'})
        } catch (e) {
            console.log(e)
            setConvertProcessing(false)
            notification.error({title: 'Error!'})
        }
    }

    const uploadSemanticHandler = async (userId) => {
        setUploadProcessing(true)

        try {
            const requestData = {
                url: semanticData.url,
                userId: userId,
                conversionOptions: {
                    converter: {
                        useInputParametersProductName: true, // <- should always be true
                        campaignsStatus: semanticData.conversionOptions.converter.campaignsStatus,
                        semanticCoreUrls: semanticData.conversionOptions.converter.semanticCoreUrls
                    },
                    productInformation: {
                        ...semanticData.conversionOptions.productInformation,
                        variations: _.mapValues(semanticData.conversionOptions.productInformation.variations, (item) => ({
                            ...item,
                            themeValues: item.themeValues.map(value => ({
                                ...value,
                                relatedValues: [...value.relatedValues.filter(i => !!i)]
                            }))
                        }))
                    },
                    upload: {...semanticData.conversionOptions.upload},
                    zeroToHero: {...semanticData.conversionOptions.zeroToHero},
                }
            }

            const res = await adminServices.uploadSemantic(requestData)
            setUploadProcessing(false)
            notification.success({title: 'Success!'})
        } catch (e) {
            console.log(e)
            setUploadProcessing(false)
        }
    }

    const parseInputParametersFile = (file) => {
        setParseProcessing(true)
        if (file) {
            const reader = new FileReader()
            reader.readAsText(file, 'UTF-8')
            reader.onload = (event) => {
                const ips = JSON.parse((event.target).result)
                console.log(ips)

                setSemanticData({
                    ...ips,
                    url: semanticUrl,
                    conversionOptions: {
                        ...ips.conversionOptions,

                        converter: {
                            ...ips.conversionOptions.converter,
                            semanticCoreUrls: [semanticUrl]
                        }
                    }
                })

                setParseProcessing(false)
            }
            reader.onerror = (event) => {
                console.log(event)
                setParseProcessing(false)
            }
        }
    }

    const downloadInputParams = () => {
        saveInputParameters(semanticData, 'conversion-settings')
    }

    useEffect(() => {
        getZthEnums()
    }, [])

    return (
        <section className={'convert-semantic-core'}>
            {/*{parseProcessing && <RouteLoader/>}*/}

            <h2>Convert Semantic Core</h2>

            <form className="step step-1" onSubmit={loadSemanticInformation}>
                <div className="form-group semantic-url">
                    <label htmlFor="">Semantic data url:</label>
                    <Input
                        placeholder={'Enter url'}
                        value={semanticUrl}
                        onChange={({target: {value}}) => setSemanticUrl(value)}
                        required
                    />
                </div>

                <button className={'btn default'} disabled={loadingInformation}>
                    Load spreadsheet
                </button>
            </form>

            {semanticInformation &&
            <InputParameters
                onUpload={parseInputParametersFile}
                label={'Choose conversion-settings.json file to upload settings'}
            />}

            {semanticInformation && !parseProcessing && <>
                <SemanticInformation
                    semanticInfo={semanticInformation}
                    semanticData={semanticData}
                    campaignsCompressionStrategyEnums={zthEnums.enums.CampaignsCompressionStrategy}

                    onChange={setSemanticData}
                />

                <CampaignsBids
                    zthEnums={zthEnums}
                    semanticData={semanticData}

                    onChange={setSemanticData}
                />

                <Variations
                    semanticData={semanticData}
                    onChange={setSemanticData}
                />

                <ConversionOptions
                    zthEnums={zthEnums}
                    semanticData={semanticData}
                    admin={admin}

                    uploadProcessing={uploadProcessing}
                    convertProcessing={convertProcessing}

                    onGetParams={downloadInputParams}
                    onChange={setSemanticData}
                    onConvert={convertSemanticHandler}
                    onUpload={uploadSemanticHandler}
                />
            </>}

        </section>
    )
}


export default ConvertSemanticCore
