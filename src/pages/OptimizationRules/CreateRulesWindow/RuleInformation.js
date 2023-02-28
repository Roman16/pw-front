import React from "react"
import {Select, Switch} from "antd"
import CustomSelect from "../../../components/Select/Select"
import {SVG} from "../../../utils/icons"

const Option = Select.Option

export const RuleInformation = ({data, onChange}) => {

    return (<div className="step rule-information">
        <div className="row form-group">
            <label htmlFor="">Rule name</label>

            <input
                type="text"
                placeholder={'Only for big Campaigns rule'}
                value={data.name}
                onChange={({target: {value}}) => onChange({'name': value})}
            />
        </div>
        <div className="row form-group">
            <label htmlFor="">Description</label>
            <textarea
                value={data.description}
                onChange={({target: {value}}) => onChange({'description': value})}
            />
        </div>
        <div className="row form-group">
            <label htmlFor="">Automatic <SVG id='rotate-arrows-icon'/></label>
            <div className="switch-group">
                <Switch checked={data.automatic} onChange={value => onChange({'automatic': value})}/>

                {data.automatic && <CustomSelect
                    getPopupContainer={trigger => trigger}
                    value={data.automaticPeriod}
                    onChange={(value) => onChange({'automaticPeriod': value})}
                >
                    <Option value={'lifetime'}>Lifetime</Option>
                    <Option value={'daily'}>Daily</Option>
                </CustomSelect>}
            </div>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus consequat ornare laoreet duis tellus
                digni
            </p>
        </div>
    </div>)
}