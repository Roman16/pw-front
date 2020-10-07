import React from "react"
import {Input, Tabs} from "antd"
import SemanticCore from "./SemanticCore"
import './ConvertSemanticCore.less'

const {TabPane} = Tabs

const ConvertSemanticCore = () => {

    return (
        <section className={'convert-semantic-core'}>
            <h2>Convert Semantic Core</h2>


            <div className="step step-1">
                <div className="form-group">
                    <label htmlFor="">Semantic data url:</label>
                    <Input
                        placeholder={'Enter url'}
                    />
                </div>
                <br/>
                <button className={'btn default'}>
                    Load spreadsheet
                </button>
            </div>

            <div className="step step-2">
                Select sheets to convert:

                <h2>Semantic core sheets</h2>

                <Tabs type="card">
                    <TabPane tab="Tab 1" key="1">
                        <SemanticCore/>
                    </TabPane>
                </Tabs>
            </div>

        </section>
    )
}

export default ConvertSemanticCore
