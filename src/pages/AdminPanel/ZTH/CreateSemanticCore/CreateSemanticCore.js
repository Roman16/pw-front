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

    useEffect(() => {
        getDefaultParams()
    }, [])

    return (<section className={'convert-semantic-core create-semantic-core'}>
        <h2>Create Semantic Core</h2>

        {loading ? <Spin size={'large'}/> : <>
            <InputParameters/>

            <MainKeywords
                semanticData={semanticData}
            />

            <ReportFile
                semanticData={semanticData}
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
            /></>}
    </section>)
}

export default CreateSemanticCore