import React, {useState} from "react"
import {Input} from "antd"
import './ConvertSemanticCore.less'
import SemanticInformation from "./SemanticInformation"
import CampaignsBids from "./CampaignsBids"
import Variations from "./Variations"
import ConversionOptions from "./ConversionOptions"
import {adminServices} from "../../../../services/admin.services"

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
        [semanticData, setSemanticData] = useState({})

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

    const convertSemanticHandler = () => {
        console.log(semanticData)
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
                    onConvert={convertSemanticHandler}
                />
            </>}

        </section>
    )
}

export default ConvertSemanticCore
