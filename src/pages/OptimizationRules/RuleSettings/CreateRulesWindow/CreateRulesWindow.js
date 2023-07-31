import React, {useEffect, useState} from "react"
import './CreateRulesWindow.less'
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../../Analytics/Campaigns/CreateCampaignWindow/WindowHeader"
import {RuleInformation} from "./RuleInformation"
import WindowFooter from "../../../Analytics/Campaigns/CreateCampaignWindow/WindowFooter"
import {RuleSettings} from "./RuleSettings"
import {CampaignsList} from "./CampaignsList"
import {optimizationRulesServices} from "../../../../services/optimization.rules.services"
import {Overview} from "./Overview"
import moment from "moment"

const createSteps = ['Information', 'Settings', 'Attach', 'Overview']

const defaultState = {
    attribution_window: '7',
    name: '',
    advertising_type: undefined,
    rule_entity_type: undefined,
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
        "operator": "===",
        "value": "1"
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
            searchStr: '',
            attributionWindow: '7',
            selectedRangeDate: {
                startDate: moment().add(-29, 'days').toISOString(),
                endDate: moment().toISOString()
            }
        })

    const changeCreateDataHandler = (data) => {
        setCreateData(prevState => ({...prevState, ...data}))
    }

    const createValidator = () => {
        if (currentStep === 0 && (!createData.name || !createData.rule_entity_type)) return true
        else if (currentStep === 1) {
            if (!createData.interval) {
                return true
            }

            if ((createData.rule_entity_type === 'search_term_keywords' || createData.rule_entity_type === 'search_term_targets')) {
                if (createData.actions?.type) {
                    if (createData.actions?.type === 'add_as_keyword_exact' ||
                        createData.actions?.type === 'add_as_keyword_phrase' ||
                        createData.actions?.type === 'add_as_keyword_broad' ||
                        createData.actions?.type === 'add_as_target_asin' ||
                        createData.actions?.type === 'add_as_target_asin_expaned') {

                        if (createData.actions.useBidFromCpc) {
                            return false
                        } else {
                            return !createData.actions.bid
                        }
                    } else if (createData.actions?.type === 'add_as_keyword_negative_exact' ||
                        createData.actions?.type === 'add_as_keyword_negative_phrase' ||
                        createData.actions?.type === 'add_as_target_negative_asin') {
                        return !createData.actions.adGroupId
                    } else if (createData.actions?.type === 'add_as_keyword_campaign_negative_phrase' ||
                        createData.actions?.type === 'add_as_keyword_campaign_negative_exact') {
                        return !createData.actions.campaignId
                    } else {

                    }
                } else {
                    return true
                }
            } else {
                return !createData.actions.value
            }
        } else return false
    }

    const createRuleHandler = () => {
        if (createData.actions.type === 'add_as_keyword_exact' || createData.actions.type === 'add_as_keyword_phrase' || createData.actions.type === 'add_as_keyword_broad' || createData.actions.type === 'add_as_target_asin' || createData.actions.type === 'add_as_target_asin_expaned') {
            onCreate({
                ...createData,
                condition: JSON.stringify(createData.condition),
                actions: JSON.stringify([{
                    ...createData.actions,
                    bid: !!createData.actions.useBidFromCpc ? undefined : createData.actions.bid,
                    useBidFromCpc: !!createData.actions.useBidFromCpc ? createData.actions.useBidFromCpc : undefined
                }]),
            })
        } else {
            onCreate({
                ...createData,
                condition: JSON.stringify(createData.condition),
                actions: JSON.stringify([createData.actions]),
            })
        }
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
                widthAttributionWindow={true}
                onChangeRequestParams={(data) => setRequestParams(prevState => ({...prevState, ...data}))}
                onChangeAttachedList={(campaignsId) => changeCreateDataHandler({campaignsId})}

                pageSizeOptions={[10, 30, 50, 300]}
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