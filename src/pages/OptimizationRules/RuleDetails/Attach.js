import React, {useEffect, useState} from "react"
import {CampaignsList} from "../CreateRulesWindow/CampaignsList"
import {optimizationRulesServices} from "../../../services/optimization.rules.services"
import {Spin} from "antd"
import _ from 'lodash'
import {notification} from "../../../components/Notification"
import moment from "moment"

export const tabs = ['campaigns used it', 'all campaigns']

let attachedListFromRequest = []

export const Attach = ({id, attributionWindow, onAttach, onDetach}) => {
    const [activeTab, setActiveTab] = useState(tabs[0]),
        [attachedCampaigns, setAttachedCampaigns] = useState([]),
        [campaigns, setCampaigns] = useState([]),
        [totalSize, setTotalSize] = useState(0),
        [processing, setProcessing] = useState(false),
        [saveProcessing, setSaveProcessing] = useState(false),
        [requestParams, setRequestParams] = useState({
            page: 1,
            pageSize: 30,
            filters: [],
            searchStr: '',
            selectedRangeDate: {
                startDate: moment().add(-29, 'days').toISOString(),
                endDate: moment().toISOString()
            }
        })


    const getAttachedCampaigns = async () => {
        setProcessing(true)

        try {
            const {result} = await optimizationRulesServices.getAttachedCampaigns([id])

            if (result[id].length > 0 && activeTab === tabs[0]) {
                getCampaigns(result[id])
            } else if (activeTab === tabs[0]) {
                setProcessing(false)
                setCampaigns([])
                setTotalSize(0)
            }

            attachedListFromRequest = result[id].map(i => `${i}`)
            setAttachedCampaigns(result[id].map(i => `${i}`))
        } catch (e) {
            console.log(e)
        }
    }

    const getCampaigns = async (campaignsId = []) => {
        setProcessing(true)

        try {
            const {result} = await optimizationRulesServices.getCampaigns({
                ...requestParams,
                campaignsId,
                attributionWindow
            })
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
        if (list === 'all') {
            setAttachedCampaigns('all')
        } else if (detachList.length > 0) {
            setAttachedCampaigns(prevState => [...prevState.filter(i => !detachList.includes(i))])
        } else {
            setAttachedCampaigns(prevState => prevState === 'all' ? [...list] : [...new Set([...prevState, ...list])])
        }
    }

    const resetHandler = () => {
        setAttachedCampaigns([...attachedListFromRequest])
    }

    const saveHandler = () => {
        setSaveProcessing(true)

        const differenceList = _.difference(attachedListFromRequest, attachedCampaigns)

        if (activeTab === tabs[0]) {
            if (attachedCampaigns === 'all') {
                onDetach({
                    rule_id: [id],
                    all_campaigns: 1,
                    rulesNewLength: 0,
                }, () => {
                    attachedListFromRequest = 0
                    setSaveProcessing(false)
                    setCampaigns([])
                    setTotalSize(0)
                    notification.success({title: 'Rule success updated!'})
                    setAttachedCampaigns([])
                })
            } else {
                onDetach({
                    rule_id: [id],
                    campaign_id: differenceList,
                    rulesNewLength: attachedCampaigns.length,
                }, () => {
                    attachedListFromRequest = [...attachedCampaigns]
                    setSaveProcessing(false)
                    setCampaigns(campaigns.filter(i => attachedCampaigns.includes(i.campaignId)))
                    setTotalSize(attachedCampaigns.length)
                    notification.success({title: 'Rule success updated!'})
                })

            }
        } else {
            if (attachedCampaigns === 'all') {
                onAttach({
                    rule_id: [id],
                    all_campaigns: 1,
                }, () => {
                    attachedListFromRequest = Array(totalSize).fill(0)
                    setSaveProcessing(false)
                    notification.success({title: 'Rule success updated!'})
                })
            } else {
                if (differenceList.length > 0) {
                    onDetach({
                        rule_id: [id],
                        campaign_id: differenceList,
                        rulesNewLength: attachedCampaigns.length,
                    })
                }

                onAttach({
                    rule_id: [id],
                    campaign_id: attachedCampaigns
                }, () => {
                    attachedListFromRequest = [...attachedCampaigns]
                    setSaveProcessing(false)
                    notification.success({title: 'Rule success updated!'})
                })
            }
        }

    }

    const changeTabHandler = (tab) => {
        setRequestParams(prevState => ({...prevState, page: 1}))

        setActiveTab(tab)
    }

    useEffect(() => {
        getAttachedCampaigns()

        if (activeTab === tabs[1]) {
            getCampaigns()
        }
    }, [activeTab, id, requestParams, attributionWindow])

    useEffect(() => {
        attachedListFromRequest = []
        setAttachedCampaigns([])
    }, [id])

    return (<div className="attach-block">
        <div className="tabs">
            <div className="container">
                {tabs.map((tab) => <div
                    onClick={() => changeTabHandler(tab)}
                    className={`tab ${tab === activeTab ? 'active' : ''}`}
                >
                    {tab}

                    {tab === tabs[0] && attachedListFromRequest.length > 0 &&
                    <div className="count">{attachedListFromRequest.length}</div>}
                </div>)}
            </div>
        </div>


        <CampaignsList
            attachedList={attachedCampaigns}
            list={campaigns}
            processing={processing}
            totalSize={totalSize}
            requestParams={requestParams}
            selectAllBtn={_.difference(attachedListFromRequest, attachedCampaigns).length > 0}
            activeTab={activeTab}

            onChangeRequestParams={changeRequestParamsHandler}
            onChangeAttachedList={changeAttachedList}
        />

        <div
            className={`save-actions ${((_.difference(attachedListFromRequest, attachedCampaigns).length > 0 || attachedCampaigns.length > attachedListFromRequest.length) && !processing) ? 'visible' : ''}`}>
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