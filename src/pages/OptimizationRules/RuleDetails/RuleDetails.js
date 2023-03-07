import React, {useState} from "react"
import {Settings} from "./Settings"
import './RuleDetails.less'
import {Attach} from "./Attach"

export const RuleDetails = ({rule, onUpdate}) => {

    return (<div className="rule-details">
        <Settings
            rule={rule}

            onUpdate={onUpdate}
        />

        <Attach
            id={rule.id}
        />
    </div>)
}