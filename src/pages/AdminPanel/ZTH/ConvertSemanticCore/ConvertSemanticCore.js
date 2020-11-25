import React, {useState} from "react"
import {Input} from "antd"
import './ConvertSemanticCore.less'
import SemanticInformation from "./SemanticInformation"
import CampaignsBids from "./CampaignsBids"
import Variations from "./Variations"
import ConversionOptions from "./ConversionOptions"
import {adminServices} from "../../../../services/admin.services"
import {notification} from "../../../../components/Notification"

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
        [semanticUrl, setSemanticUrl] = useState('https://docs.google.com/spreadsheets/d/1osHmhbyXGx5dbziIuh2NV5sUHOKKSG9ynyW3rGeM_A4/edit#gid=277769766'),
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
                convertToAmazonBulkUpload: false,
                conversionOptions: {
                    converter: {
                        useInputParametersProductName: true,
                        campaignsStatus: 'Enabled',
                        convertForMarketplace: 'USA'
                    },
                    productInformation: {
                        productName: semanticData.productName,
                        variations: semanticData.variations
                    },
                    saver: {
                        saveBulkUploadAs: 'xls'
                    },
                    zeroToHero: {
                        campaignsCompressionStrategy: semanticData.campaignsCompressionStrategy,
                        ppcPlan: semanticData.ppcPlan,
                        createSponsoredProductsSemanticCore: false,
                        createSponsoredDisplaySemanticCore: false
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

        setTimeout(() => {
            console.log('CONVERT:')
            console.log(semanticData)
            notification.success({title: 'Success!'})
            setConvertProcessing(false)
        }, 3000)

        // try {
        //     const res = await adminServices.convertSemantic(semanticData)
        //
        //     console.log(res)
        //     notification.success({title: 'Success!'})
        // } catch (e) {
        //     console.log(e)
        // }
    }
    const uploadSemanticHandler = (userId) => {
        setUploadProcessing(true)

        const requestData = {
            url: semanticData.url,
            userId: 0,
            conversionOptions: {
                converter: {...semanticData.conversionOptions.converter},
                productInformation: {...semanticData.conversionOptions.productInformation},
                upload: {...semanticData.conversionOptions.upload},
                zeroToHero: {...semanticData.conversionOptions.zeroToHero},
            }
        }

        delete requestData.convertToAmazonBulkUpload
        delete requestData.conversionOptions.converter.convertForMarketplace
        delete requestData.conversionOptions.converter.generateBulkUploadForCampaignTypes

        setTimeout(() => {
            console.log('UPLOAD:')
            console.log('User id:' + userId)
            console.log(requestData)
            notification.success({title: 'Success!'})
            setUploadProcessing(false)
        }, 3000)
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
