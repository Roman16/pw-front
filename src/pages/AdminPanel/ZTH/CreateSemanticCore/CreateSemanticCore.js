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


const CreateSemanticCore = () => {
    const [semanticData, setSemanticData] = useState({}),
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
            maxNewKeywords: semanticData.keywordsProvider.maxNewKeywords,
            merchantWordsCategories: semanticData.keywordsProvider.merchantWordsCategories,
            tpkKeywordsCount: semanticData.keywordsProvider.tpkKeywordsCount,
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
        productInformation: semanticData.productInformation,
        zeroToHero: semanticData.zeroToHero
    })


    const downloadInputParams = () => {
        dataSaveService.saveInputParameters([getInputParameters()])
    }

    const parseInputParametersFile = (file) => {
        setLoading(true)

        if (file) {
            const reader = new FileReader()
            reader.readAsText(file, 'UTF-8')
            reader.onload = (event) => {
                const ips = JSON.parse((event.target).result)
                setSemanticData({...semanticData, ...ips[0]})

                setLoading(false)
            }
            reader.onerror = (event) => {
                alert('Error reading file')
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
            /></>}
    </section>)
}

export default CreateSemanticCore