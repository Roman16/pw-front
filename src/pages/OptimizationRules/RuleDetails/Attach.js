import React, {useEffect, useState} from "react"
import {CampaignsList} from "../CreateRulesWindow/CampaignsList"
import {optimizationRulesServices} from "../../../services/optimization.rules.services"
import {Spin} from "antd"
import _ from 'lodash'
import {notification} from "../../../components/Notification"
import moment from "moment"

const tabs = ['campaigns used it', 'all campaigns']

let attachedListFromRequest = []

export const Attach = ({id,attributionWindow, onAttach, onDetach}) => {
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

            setAttachedCampaigns(result[id].map(i => `${i}`))
            attachedListFromRequest = result[id].map(i => `${i}`)
        } catch (e) {
            console.log(e)
        }
    }

    const getCampaigns = async (campaignsId = []) => {
        setProcessing(true)

        try {
            const {result} = await optimizationRulesServices.getCampaigns({...requestParams, campaignsId, attributionWindow})
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

    const changeAttachedList = (list) => {
        setAttachedCampaigns(list)
    }

    const resetHandler = () => {
        setAttachedCampaigns([...attachedListFromRequest])
    }

    const saveHandler = () => {
        setSaveProcessing(true)

        const differenceList = _.difference(attachedListFromRequest, attachedCampaigns)

        if (activeTab === tabs[0]) {
            onDetach({
                rules: [id],
                campaigns: differenceList,
                rulesNewLength: attachedCampaigns.length,
            }, () => {
                setSaveProcessing(false)
                setCampaigns(campaigns.filter(i => attachedCampaigns.includes(i.campaignId)))
                notification.success({title: 'Rule success updated!'})
            })
        } else {
            if (differenceList.length > 0) {
                onDetach({
                    rules: [id],
                    campaigns: differenceList,
                    rulesNewLength: attachedCampaigns.length,
                })
            }

            onAttach({
                rules: [id],
                campaigns: attachedCampaigns
            }, () => {
                setSaveProcessing(false)
                notification.success({title: 'Rule success updated!'})
            })
        }

        attachedListFromRequest = [...attachedCampaigns]
    }

    useEffect(() => {
        getAttachedCampaigns()

        if (activeTab === tabs[1]) {
            getCampaigns()
        }
    }, [activeTab, id, requestParams, attributionWindow])

    useEffect(() => {
        attachedListFromRequest = []
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
            attachedList={attachedCampaigns}
            list={campaigns}
            processing={processing}
            totalSize={totalSize}
            requestParams={requestParams}

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