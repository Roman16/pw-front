import React, {useEffect, useState} from "react"

import './CreateSemanticCore.less'
import '../ConvertSemanticCore/ConvertSemanticCore.less'
import InputParameters from "./InputParameters"
import MainKeywords from "./Keywords/Keywords"
import ReportFile from "./ReportFile"
import ProductInformation from "./ProductInformation"
import CreateOptions from "./CreateOptions"
import {adminServices} from "../../../../services/admin.services"
import Variations from "./Variations"
import {Spin} from "antd"
import * as dataSaveService from "../../../../utils/saveFile"
import {notification} from "../../../../components/Notification"


const CreateSemanticCore = () => {
    const [semanticData, setSemanticData] = useState({}),
        [reportFiles, setReportFiles] = useState({
            searchTerm: undefined,
            productReport: undefined
        }),
        [allEnums, setAllEnums] = useState({}),
        [reportFileSize, setReportFileSize] = useState({}),
        [loading, setLoading] = useState(true)

    const getDefaultParams = async () => {
        setLoading(true)

        try {
            const [params, enums, fileSize] = await Promise.all([adminServices.fetchCreateParams(), adminServices.fetchEnums(), adminServices.fetchReportFileSize()])

            setAllEnums(enums)
            setReportFileSize(fileSize)
            setSemanticData(params.defaultInputParameters)

            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    }

    const changeSemanticDataHandler = (data) => {
        setSemanticData(data)
    }

    const getInputParameters = () => ({
        keywordsProvider: {
            maxNewKeywords: +semanticData.keywordsProvider.maxNewKeywords,
            merchantWordsCategories: semanticData.keywordsProvider.merchantWordsCategories,
            tpkKeywordsCount: +semanticData.keywordsProvider.tpkKeywordsCount,
        },
        creator: {
            mainKeywords: semanticData.creator.mainKeywords.filter(x => x.text && x.text.length > 0),
            baseKeywords: semanticData.creator.baseKeywords.filter(x => x.text && x.text.length > 0),
            globalNegativePhrases: semanticData.creator.globalNegativePhrases.filter(x => x.text && x.text.length > 0),
            globalNegativeExacts: semanticData.creator.globalNegativeExacts.filter(x => x.text && x.text.length > 0),
            productNegativePhrases: semanticData.creator.productNegativePhrases.filter(x => x.text && x.text.length > 0),
            productNegativeExacts: semanticData.creator.productNegativeExacts.filter(x => x.text && x.text.length > 0),
            negativeASINs: semanticData.creator.negativeASINs.filter(x => x.text && x.text.length > 0)
        },
        productInformation: {
            ...semanticData.productInformation,
            brandNames: semanticData.productInformation.brandNames.filter(x => x && x.length > 0),
            variations: semanticData.productInformation.variations.map(i => {
                if (!i.listingUrl || i.listingUrl === null) i.listingUrl = ''
                if (!i.sku || i.sku === null) i.sku = ''

                    i.themeValues = i.themeValues.map(t => {
                        t.relatedValues = t.relatedValues.filter(x => x && x.length > 0)
                        return t
                    })

                return i
            })
        },
        zeroToHero: {
            ...semanticData.zeroToHero,
            keywordsToSearchForSuggestedASINs: semanticData.zeroToHero.keywordsToSearchForSuggestedASINs.filter(x => x && x.length > 0),
            manuallyProvidedTopCompetitorASINs: semanticData.zeroToHero.manuallyProvidedTopCompetitorASINs.filter(x => x && x.length > 0),
            categoryLinksToParseASINsFrom: semanticData.zeroToHero.categoryLinksToParseASINsFrom.filter(x => x && x.length > 0),
            keywordsForTPKPCampaign: semanticData.zeroToHero.keywordsForTPKPCampaign.filter(x => x && x.length > 0),
            asinsForDefenseCampaign: semanticData.zeroToHero.asinsForDefenseCampaign.filter(x => x && x.length > 0),
        }
    })


    const downloadInputParams = () => {
        dataSaveService.saveInputParameters(getInputParameters())
    }

    const createZeroToHeroHandler = async () => {
        const requestData = new FormData()

        console.log(getInputParameters())

        const ips = JSON.stringify([{
            ...getInputParameters(),
            apiClients: {
                Amazon: {
                    marketplaceId: 'ATVPDKIKX0DER'
                }
            },
        }])

        requestData.set(
            'inputParameters',
            new Blob([ips], {type: 'application/json'})
        )

        if (reportFiles.searchTerm) requestData.set('searchTerm', reportFiles.searchTerm)
        if (reportFiles.productReport) requestData.set('productReport', reportFiles.productReport)


        try {
            const job = await adminServices.createZTH(requestData)

            if (job.status !== 'ERROR' && job.status !== 'FAILED') {
                notification.success({title: `Successfully scheduled Zero to Hero creation job with id: ${job.id}, with title: ${job.title}`})
            } else {
                notification.error({title: `Zero to Hero job with id: ${job.id}, failed to schedule with error message: ${job.errorText}`})
            }
        } catch (error) {
            console.log(error)
        }
    }

    const parseInputParametersFile = (file) => {
        setLoading(true)

        if (file) {
            const reader = new FileReader()
            reader.readAsText(file, 'UTF-8')
            reader.onload = (event) => {
                const ips = JSON.parse((event.target).result)
                console.log(ips)
                setSemanticData({...semanticData, ...ips})

                setLoading(false)
            }
            reader.onerror = (event) => {
                console.log(event)
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        getDefaultParams()
    }, [])

    return (<section className={'convert-semantic-core create-semantic-core'}>
        <h2>Create Semantic Core</h2>

        <InputParameters
            onUpload={parseInputParametersFile}
        />


        {loading ? <Spin size={'large'}/> : <>
            <MainKeywords
                semanticData={semanticData}
                onChange={changeSemanticDataHandler}
            />

            <ReportFile
                fileSize={reportFileSize}
                onChange={(data) => setReportFiles({...reportFiles, ...data})}
            />

            <ProductInformation
                semanticData={semanticData}
                onChange={changeSemanticDataHandler}
            />

            <Variations
                semanticData={semanticData}
                onChange={(data) => setSemanticData(data)}
            />

            <CreateOptions
                semanticData={semanticData}
                allEnums={allEnums}

                onChange={changeSemanticDataHandler}

                onGetParams={downloadInputParams}
                onCreate={createZeroToHeroHandler}
            /></>}
    </section>)
}

export default CreateSemanticCore