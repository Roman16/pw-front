import React from "react"
import {Input, Tabs} from "antd"
import './ConvertSemanticCore.less'
import CustomSelect from "../../../../components/Select/Select"
import SemanticInformation from "./SemanticInformation"
import CampaignsBids from "./CampaignsBids"
import Variations from "./Variations"
import Themes from "./Themes"
import ConversionOptions from "./ConversionOptions"

const {TabPane} = Tabs

const ConvertSemanticCore = () => {

    return (
        <section className={'convert-semantic-core'}>
            <h2>Convert Semantic Core</h2>


            <div className="step step-1">
                <div className="form-group semantic-url">
                    <label htmlFor="">Semantic data url:</label>
                    <Input
                        placeholder={'Enter url'}
                    />
                </div>

                <button className={'btn default'}>
                    Load spreadsheet
                </button>
            </div>

            <br/>
            <br/>

            <SemanticInformation/>

            <CampaignsBids/>

            <br/>
            <br/>

            <Variations/>

            <br/>
            <br/>

            <Themes/>

            <br/>
            <br/>

            <ConversionOptions/>

            <br/>
            <br/>

            <button className={'btn default'}>
                Convert semantics
            </button>
        </section>
    )
}

export default ConvertSemanticCore
