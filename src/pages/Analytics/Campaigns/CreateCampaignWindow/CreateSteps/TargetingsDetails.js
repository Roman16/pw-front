import React from "react"
import {Radio, Switch} from "antd"
import InputCurrency from "../../../../../components/Inputs/InputCurrency"
import NegativeKeywords from "../../../../ZeroToHero/CreatingCampaign/ProductSettings/NegativeKeywords/NegativeKeywords"

const TargetingsDetails = () => {

    return (<div className={'step step-4 targetings-details-step'}>
        <div className="row">
            <div className="col">
                <Radio.Group>
                    <h4>Targetings</h4>

                    <Radio value={'create'}>
                        Create Targetings
                    </Radio>

                    <Radio value={'not'}>
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

        <div className="row">
            <NegativeKeywords
                keywords={[]}
                onUpdate={() => {}}
            />
        </div>
    </div>)
}

export default TargetingsDetails
