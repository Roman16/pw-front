import React, {useState} from "react"
import {Settings} from "./Settings"
import './RuleDetails.less'
import {Compare} from "./Compare"

export const RuleDetails = ({}) => {
    const [rule, setRule] = useState({
        name: 'Only for big Campaigns rule',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
        condition: {
            "type": "array",
            "glue": "AND",
            "rules": [
                {
                    "type": "rule",
                    "metric": "clicks",
                    "operator": "eq",
                    "value": 2
                },
                {
                    "type": "array",
                    "glue": "OR",
                    "rules": [
                        {
                            "type": "rule",
                            "metric": "clicks",
                            "operator": "eq",
                            "value": 3
                        },
                        {
                            "type": "rule",
                            "metric": "clicks",
                            "operator": "eq",
                            "value": 2
                        },
                        {
                            "type": "array",
                            "glue": "AND",
                            "rules": [
                                {
                                    "type": "rule",
                                    "metric": "clicks",
                                    "operator": "eq",
                                    "value": 1
                                },
                                {
                                    "type": "rule",
                                    "metric": "clicks",
                                    "operator": "eq",
                                    "value": 6
                                }
                            ]
                        }
                    ]
                }
            ]
        }

    })

    return (<div className="rule-details">
        <Settings
            data={rule}
        />

        <Compare/>
    </div>)
}