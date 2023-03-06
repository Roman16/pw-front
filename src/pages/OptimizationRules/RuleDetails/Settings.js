import React, {useState} from "react"
import {RuleSettings} from "../CreateRulesWindow/RuleSettings"

export const Settings = ({data}) => {


    return (<div className="settings">
        <div className="rule-info">
            <h2>{data.name}</h2>
            <p>{data.description}</p>

            <div className="status-row">
                Auto • Lifetime

                <div className="status">
                    <div/>
                    Status
                </div>
            </div>
        </div>


        <RuleSettings
            data={data}
        />

        <div className="save-actions">
            <button className="btn white">
                Reset All
            </button>

            <button className="btn default">
                Save Changes
            </button>
        </div>
    </div>)
}