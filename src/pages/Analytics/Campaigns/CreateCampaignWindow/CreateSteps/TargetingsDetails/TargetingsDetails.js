import React from "react"
import {Radio, Switch} from "antd"
import InputCurrency from "../../../../../../components/Inputs/InputCurrency"
import './TargetingsDetails.less'
import NegativeKeywords from "./NegativeKeywords"
import NegativePats from "./NegativePats"

const TargetingsDetails = ({campaignData, onChange}) => {

    return (<div className={'step step-4 targetings-details-step'}>
        <div className="row">
            <div className="col">
                <Radio.Group value={campaignData.create_targetings}
                             onChange={({target: {value}}) => onChange({create_targetings: value})}>
                    <h4>Targetings</h4>

                    <Radio value={true}>
                        Create Targetings
                    </Radio>

                    <Radio value={false}>
                        Do not create Targetings
                    </Radio>
                </Radio.Group>
            </div>
        </div>

        <div className="row">
            <div className="col">
                <h3>Title</h3>

                <div className="switch-table">
                    <div className="row header">
                        <div>Targeting Groups</div>
                        <div>Bid</div>
                    </div>
                    <div className="row">
                        <div className={'switch-block'}><Switch/>Close match</div>
                        <div className={'form-group'}><InputCurrency/></div>
                    </div>

                    <div className="row">
                        <div><Switch/>Loose match</div>
                        <div className={'form-group'}><InputCurrency/></div>
                    </div>
                    <div className="row">
                        <div><Switch/>Substitutes</div>
                        <div className={'form-group'}><InputCurrency/></div>
                    </div>
                    <div className="row">
                        <div><Switch/>Complements</div>
                        <div className={'form-group'}><InputCurrency/></div>
                    </div>
                </div>

            </div>

            <div className="col description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus
                consequat ornare laoreet duis tellus dignissim nisl rhoncus. Adipiscing at dis a id urna. Aliquam massa
                faucibus blandit justo. Sed et orci tortor pellentesque sed
            </div>
        </div>

        <NegativeKeywords
            keywords={campaignData.negative_keywords}
            onUpdate={onChange}
        />

        <NegativePats
            keywords={campaignData.negative_pats}
            onUpdate={onChange}
        />
    </div>)
}

export default TargetingsDetails
