import React, {useEffect, useState} from "react"
import {CampaignsList} from "../CreateRulesWindow/CampaignsList"
import {optimizationRulesServices} from "../../../services/optimization.rules.services"
import {Spin} from "antd"
import _ from 'lodash'
import {notification} from "../../../components/Notification"

const tabs = ['rules used it', 'all rules']

let attachedListFromRequest = []

export const Attach = ({id, onAttach, onDetach}) => {
    const [activeTab, setActiveTab] = useState(tabs[0]),
        [attachedRules, setAttachedRules] = useState([]),
        [campaigns, setCampaigns] = useState([]),
        [totalSize, setTotalSize] = useState(0),
        [processing, setProcessing] = useState(false),
        [saveProcessing, setSaveProcessing] = useState(false),
        [requestParams, setRequestParams] = useState({
            page: 1,
            pageSize: 30,
            filters: [],
            searchStr: ''
        })


    const getAttachedCampaigns = async () => {
        setProcessing(true)

        try {
            const {result} = await optimizationRulesServices.getAttachedRules([id])

            if (result[id].length > 0 && activeTab === tabs[0]) {
                getRules(result[id])
            } else if (activeTab === tabs[0]) {
                setProcessing(false)
                setCampaigns([])
                setTotalSize(0)
            }

            attachedListFromRequest = result[id].map(i => `${i}`)
            setAttachedRules(result[id].map(i => `${i}`))
        } catch (e) {
            console.log(e)
        }
    }

    const getRules = async (id = []) => {
        setProcessing(true)

        try {
            const {result} = await optimizationRulesServices.getRules({...requestParams, id})
            setCampaigns(result.data)
            setTotalSize(result.total_count)
        } catch (e) {
            console.log(e)
        }

        setProcessing(false)
    }

    const changeRequestParamsHandler = (data) => {
        setRequestParams(prevState => ({...prevState, ...data}))
    }

    const changeAttachedList = (list, attachList, detachList) => {
        if (detachList.length > 0) {
            setAttachedRules(prevState => [...prevState.filter(i => !detachList.includes(i))])
        } else {
            setAttachedRules(prevState => [...new Set([...prevState, ...list])])
        }

    }

    const resetHandler = () => {
        setAttachedRules([...attachedListFromRequest])
    }

    const saveHandler = () => {
        setSaveProcessing(true)

        const differenceList = _.difference(attachedListFromRequest, attachedRules)

        if (activeTab === tabs[0]) {
            onDetach({
                rule_id: differenceList,
                rulesNewLength: attachedRules.length,
                campaign_id: [id]
            }, () => {
                setSaveProcessing(false)
                setCampaigns(campaigns.filter(i => attachedRules.includes(i.id)))
                setTotalSize(attachedRules.length)
                notification.success({title: 'Campaign success updated!'})
            })
        } else {
            if (differenceList.length > 0) {
                onDetach({
                    rule_id: differenceList,
                    rulesNewLength: attachedRules.length,
                    campaign_id: [id]
                })
            }

            onAttach({
                rule_id: attachedRules,
                campaign_id: [id]
            }, () => {
                setSaveProcessing(false)
                notification.success({title: 'Campaign success updated!'})
            })
        }

        attachedListFromRequest = [...attachedRules]
    }

    useEffect(() => {
        getAttachedCampaigns()

        if (activeTab === tabs[1]) {
            getRules()
        }
    }, [activeTab, id, requestParams])

    useEffect(() => {
        attachedListFromRequest = []
        setAttachedRules([])
    }, [id])

    return (<div className="attach-block">
        <div className="tabs">
            <div className="container">
                {tabs.map((tab) => <div
                    onClick={() => setActiveTab(tab)}
                    className={`tab ${tab === activeTab ? 'active' : ''}`}
                >
                    {tab}

                    {tab === tabs[0] && attachedListFromRequest.length > 0 &&
                    <div className="count">{attachedListFromRequest.length}</div>}
                </div>)}
            </div>
        </div>


        <CampaignsList
            attachedList={attachedRules}
            list={campaigns}
            processing={processing}
            totalSize={totalSize}
            requestParams={requestParams}
            location={'rules'}
            widthDateRange={false}

            onChangeRequestParams={changeRequestParamsHandler}
            onChangeAttachedList={changeAttachedList}
        />

        <div
            className={`save-actions ${((_.difference(attachedListFromRequest, attachedRules).length > 0 || attachedRules.length > attachedListFromRequest.length) && !processing) ? 'visible' : ''}`}>
            <button className="btn white" onClick={resetHandler}>
                Reset All
            </button>

            <button disabled={saveProcessing} className="btn default" onClick={saveHandler}>
                Save Changes

                {saveProcessing && <Spin size={'small'}/>}
            </button>
        </div>
    </div>)
}