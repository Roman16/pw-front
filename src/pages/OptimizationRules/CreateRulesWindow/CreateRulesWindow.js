import React, {useState} from "react"
import './CreateRulesWindow.less'
import ModalWindow from "../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../Analytics/Campaigns/CreateCampaignWindow/WindowHeader"
import {RuleInformation} from "./RuleInformation"
import WindowFooter from "../../Analytics/Campaigns/CreateCampaignWindow/WindowFooter"
import {RuleSettings} from "./RuleSettings"
import {CompareCampaigns} from "./CompareCampaigns"

const createSteps = ['Information', 'Settings', 'Compare']

export const CreateRulesWindow = ({
                                      visible,
                                      onClose
                                  }) => {
    const [currentStep, setCurrentStep] = useState(0),
        [createData, setCreateData] = useState({
            name: '',
            description: '',
            automatic: false,
            automaticPeriod: 'lifetime',
            timeline: undefined,
            action: undefined,
            settings: {
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

    const changeCreateDataHandler = (data) => {
        setCreateData(prevState => ({...prevState, ...data}))
    }

    const nextStepHandler = () => setCurrentStep(prevStep => prevStep + 1)
    const previousStepHandler = () => setCurrentStep(prevStep => prevStep - 1)

    return (<ModalWindow
            visible={visible}
            footer={false}
            className={'create-rules-window'}
        >
            <WindowHeader
                title={'Create Rule'}

                onClose={onClose}
            />

            {currentStep === 0 && <RuleInformation
                data={createData}

                onChange={changeCreateDataHandler}
            />}

            {currentStep === 1 && <RuleSettings
                data={createData}

                onChange={changeCreateDataHandler}
            />}

            {currentStep === 2 && <CompareCampaigns
                data={createData}

                onChange={changeCreateDataHandler}
            />}

            <WindowFooter
                currentStep={currentStep}
                steps={createSteps}
                createButtonTitle={'Create Rule'}
                goNext={nextStepHandler}
                goPrevious={previousStepHandler}
            />
        </ModalWindow>
    )
}