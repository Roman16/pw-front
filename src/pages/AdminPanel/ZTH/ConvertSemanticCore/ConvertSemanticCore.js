import React, {useState} from "react"
import {Input} from "antd"
import './ConvertSemanticCore.less'
import SemanticInformation from "./SemanticInformation"
import CampaignsBids from "./CampaignsBids"
import Variations from "./Variations"
import ConversionOptions from "./ConversionOptions"
import {adminServices} from "../../../../services/admin.services"
import {notification} from "../../../../components/Notification"
import {saveFile} from "../../../../utils/saveFile"
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

const ConvertSemanticCore = () => {
    const [semanticInformation, setSemanticInformation] = useState(),
        [semanticUrl, setSemanticUrl] = useState(),
        [loadingInformation, setLoadingInformation] = useState(false),
        [semanticData, setSemanticData] = useState({}),
        [uploadProcessing, setUploadProcessing] = useState(false),
        [convertProcessing, setConvertProcessing] = useState(false)

    const changeUploadDataHandler = (value) => {
        setSemanticData({
            ...semanticData,
            conversionOptions: {
                ...semanticData.conversionOptions,
                upload: value
            }
        })
    }

    const loadSemanticInformation = async (e) => {
        e.preventDefault()
        setSemanticInformation(undefined)
        setLoadingInformation(true)

        try {
            const res = await adminServices.fetchSemanticInformation({url: semanticUrl}),
                semanticData = res.semanticData

            setSemanticData({
                url: semanticUrl,
                convertToXLSXWorkBook: false,
                convertToAmazonBulkUpload: true,
                conversionOptions: {
                    converter: {
                        useInputParametersProductName: true,
                        campaignsStatus: 'Enabled',
                        convertForMarketplace: 'USA',
                        semanticCoreUrls: [semanticUrl]
                    },
                    productInformation: {
                        productName: semanticData.productName,
                        variations: semanticData.variations
                    },
                    saver: {
                        saveBulkUploadAs: 'xlsx'
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
            const res = await adminServices.convertSemantic(semanticData)

            res.bulkUploadDocuments && res.bulkUploadDocuments.forEach(doc => {
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
                userId: 0,
                conversionOptions: {
                    converter: {
                        useInputParametersProductName: true, // <- should always be true
                        campaignsStatus: semanticData.conversionOptions.converter.campaignsStatus,
                        semanticCoreUrls: semanticData.conversionOptions.converter.semanticCoreUrls
                    },
                    productInformation: {...semanticData.conversionOptions.productInformation},
                    upload: {...semanticData.conversionOptions.upload},
                    zeroToHero: {...semanticData.conversionOptions.zeroToHero},
                }
            }

            console.log('User id:' + userId)

            const res = await adminServices.uploadSemantic(requestData)
            setUploadProcessing(false)
            notification.success({title: 'Success!'})
        } catch (e) {
            console.log(e)
            setUploadProcessing(false)
        }
    }

    return (
        <section className={'convert-semantic-core'}>
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

            {semanticInformation && <>
                <SemanticInformation
                    semanticInfo={semanticInformation}
                    semanticData={semanticData}

                    onChange={(data) => setSemanticData(data)}
                />

                <CampaignsBids
                    semanticData={semanticData}
                    onChange={changeUploadDataHandler}
                />

                <Variations
                    semanticData={semanticData}
                    onChange={(data) => setSemanticData(data)}
                />

                <ConversionOptions
                    semanticData={semanticData}
                    onChange={(data) => setSemanticData(data)}
                    uploadProcessing={uploadProcessing}
                    convertProcessing={convertProcessing}
                    onConvert={convertSemanticHandler}
                    onUpload={uploadSemanticHandler}
                />
            </>}

        </section>
    )
}


export default ConvertSemanticCore
