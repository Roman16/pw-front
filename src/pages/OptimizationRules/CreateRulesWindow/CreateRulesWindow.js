import React, {useEffect, useState} from "react"
import './CreateRulesWindow.less'
import ModalWindow from "../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../Analytics/Campaigns/CreateCampaignWindow/WindowHeader"
import {RuleInformation} from "./RuleInformation"
import WindowFooter from "../../Analytics/Campaigns/CreateCampaignWindow/WindowFooter"
import {RuleSettings} from "./RuleSettings"
import {CampaignsList} from "./CampaignsList"
import {optimizationRulesServices} from "../../../services/optimization.rules.services"
import {Overview} from "./Overview"

const createSteps = ['Information', 'Settings', 'Attach', 'Overview']

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
        [createData, setCreateData] = useState({...defaultState}),
        [campaigns, setCampaigns] = useState([]),
        [totalSize, setTotalSize] = useState(0),
        [getProcessing, setGetProcessing] = useState(false),
        [requestParams, setRequestParams] = useState({
            page: 1,
            pageSize: 30,
            filters: [],
            searchStr: ''
        })

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

    const getCampaigns = async (campaignsId = []) => {
        setGetProcessing(true)

        try {
            const {result} = await optimizationRulesServices.getCampaigns({...requestParams, campaignsId})
            setCampaigns(result.data)
            setTotalSize(result.total_count)
        } catch (e) {
            console.log(e)
        }

        setGetProcessing(false)
    }


    useEffect(() => {
        if (!visible) {
            setTimeout(() => {
                setCurrentStep(0)
                setCreateData({...defaultState})
            }, 1000)
        }
    }, [visible])

    useEffect(() => {
        getCampaigns()
    }, [requestParams])

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

            {currentStep === 2 && <CampaignsList
                list={campaigns}
                totalSize={totalSize}
                requestParams={requestParams}
                attachedList={createData.campaignsId}
                processing={getProcessing}

                onChangeRequestParams={(data) => setRequestParams(prevState => ({...prevState, ...data}))}
                onChangeAttachedList={(campaignsId) => changeCreateDataHandler({campaignsId})}
            />}

            {currentStep === 3 && <Overview
                data={createData}
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