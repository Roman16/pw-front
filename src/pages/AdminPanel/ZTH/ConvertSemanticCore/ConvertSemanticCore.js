import React, {useState} from "react"
import {Input} from "antd"
import './ConvertSemanticCore.less'
import SemanticInformation from "./SemanticInformation"
import CampaignsBids from "./CampaignsBids"
import Variations from "./Variations"
import ConversionOptions from "./ConversionOptions"
import {adminServices} from "../../../../services/admin.services"

const ConvertSemanticCore = () => {
    const [semanticInformation, setSemanticInformation] = useState(),
        [semanticUrl, setSemanticUrl] = useState('')


    const loadSemanticInformation = async (e) => {
        e.preventDefault()

        try {
            const res = await adminServices.fetchSemanticInformation({url: semanticUrl})
            console.log(res)
        } catch (e) {
            console.log(e)
        }

        setSemanticInformation(true)
    }

    return (
        <section className={'convert-semantic-core'}>
            <h2>Convert Semantic Core</h2>


            <form className="step step-1" onSubmit={loadSemanticInformation}>
                <div className="form-group semantic-url">
                    <label htmlFor="">Semantic data url:</label>
                    <Input
                        placeholder={'Enter url'}
                        onChange={({target: {value}}) => setSemanticUrl(value)}
                        required
                    />
                </div>

                <button className={'btn default'}>
                    Load spreadsheet
                </button>
            </form>

            {semanticInformation && <>
                <SemanticInformation
                    semantic={semanticInformation.semanticData}
                />

                <CampaignsBids/>

                <Variations/>

                <ConversionOptions/>
            </>}

        </section>
    )
}

export default ConvertSemanticCore
