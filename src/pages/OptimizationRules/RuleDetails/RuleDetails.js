import React, {useEffect, useState} from "react"
import {Settings} from "./Settings"
import './RuleDetails.less'
import {Attach} from "./Attach"

export const RuleDetails = ({rule, onUpdate, onAttach, onDetach, onEdit,onChangeAttributionWindow}) => {
    return (<div className="rule-details">
        <Settings
            rule={rule}
            attributionWindow={rule.attribution_window}

            onUpdate={onUpdate}
            onChangeAttributionWindow={onChangeAttributionWindow}
            onEdit={onEdit}
        />

        <Attach
            id={rule.id}
            attributionWindow={rule.attribution_window}

            onAttach={onAttach}
            onDetach={onDetach}
        />
    </div>)
}