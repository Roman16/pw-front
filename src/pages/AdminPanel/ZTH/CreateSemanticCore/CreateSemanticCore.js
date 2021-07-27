import React, {useState} from "react"

import './CreateSemanticCore.less'
import '../ConvertSemanticCore/ConvertSemanticCore.less'
import InputParameters from "./InputParameters"
import MainKeywords from "./MainKeywords"
import ReportFile from "./ReportFile"
import ProductInformation from "./ProductInformation"
import Variations from "../ConvertSemanticCore/Variations"
import CreateOptions from "./CreateOptions"

const CreateSemanticCore = () => {
    const [semanticData, setSemanticData] = useState({
        conversionOptions: {
            converter: {
                useInputParametersProductName: true,
            },
            productInformation: {
                variations: []
            },
            saver: {
                saveBulkUploadAs: 'xlsx'
            },
        }

    })

    return (<section className={'convert-semantic-core create-semantic-core'}>
        <h2>Create Semantic Core</h2>

        <InputParameters/>

        <MainKeywords/>

        <ReportFile/>

        <ProductInformation/>

        <Variations
            semanticData={semanticData}
            onChange={(data) => setSemanticData(data)}
        />

        <CreateOptions/>

    </section>)
}

export default CreateSemanticCore