import React, {useEffect, useState} from "react"
import './CreateRulesWindow.less'
import ModalWindow from "../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../Analytics/Campaigns/CreateCampaignWindow/WindowHeader"
import {RuleInformation} from "./RuleInformation"
import WindowFooter from "../../Analytics/Campaigns/CreateCampaignWindow/WindowFooter"
import {RuleSettings} from "./RuleSettings"
import {AttachCampaigns} from "./AttachCampaigns"

const createSteps = ['Information', 'Settings', 'Attach']

const defaultState = {
    attribution_window: '7',
    name: '',
    description: '',
    type: 'manual',
    active: true,
    interval: undefined,
    period: '+1 day',
    actions: {
        type: undefined,
    },
    condition: {
        "type": "rule",
        "metric": "clicks",
        "operator": "eq",
        "value": 1
    },
    campaignsId: []
}

export const CreateRulesWindow = ({
                                      visible,
                                      processing,
                                      onClose,
                                      onCreate,
                                  }) => {
    const [currentStep, setCurrentStep] = useState(0),
        [createData, setCreateData] = useState({...defaultState})

    const changeCreateDataHandler = (data) => {
        setCreateData(prevState => ({...prevState, ...data}))
    }

    const createValidator = () => {
        if (currentStep === 0 && !createData.name) return true
        else if (currentStep === 1 && (!createData.interval || !createData.actions.value)) return true
        else return false
    }

    const createRuleHandler = () => {
        onCreate({
            ...createData,
            condition: JSON.stringify(createData.condition),
            actions: JSON.stringify(createData.actions),
        })
    }

    const nextStepHandler = () => setCurrentStep(prevStep => prevStep + 1)
    const previousStepHandler = () => setCurrentStep(prevStep => prevStep - 1)

    useEffect(() => {
        if (!visible) {
            setTimeout(() => {
                setCurrentStep(0)
                setCreateData({...defaultState})
            }, 1000)
        }
    }, [visible])

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

            {currentStep === 2 && <AttachCampaigns
                data={createData}

                onChange={changeCreateDataHandler}
            />}

            <WindowFooter
                currentStep={currentStep}
                steps={createSteps}
                createButtonTitle={'Create Rule'}
                processing={processing}

                disableNextStep={createValidator()}
                goNext={nextStepHandler}
                goPrevious={previousStepHandler}
                onCreate={createRuleHandler}
            />
        </ModalWindow>
    )
}