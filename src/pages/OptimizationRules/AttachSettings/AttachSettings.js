import React, {useState} from "react"
import {Header} from "../Header/Header"
import {Link} from "react-router-dom"
import {SVG} from "../../../utils/icons"
import '../OptimizationRules.less'
import '../CreateRulesWindow/CreateRulesWindow.less'
import './AttachSettings.less'
import {Spin} from "antd"
import {optimizationRulesServices} from "../../../services/optimization.rules.services"
import {notification} from "../../../components/Notification"
import moment from "moment"
import {Rules} from "./Rules"
import {Campaigns} from "./Campaigns"

const AttachSettings = () => {
    const [attachedLis, setAttachedList] = useState({
            rule_id: [],
            campaign_id: []
        }),
        [saveProcessing, setSaveProcessing] = useState(false),
        [campaignFilters, setCampaignsFilter] = useState([]),
        [rulesFilters, setRulesFilters] = useState([]),

        [attributionWindow, setAttributionWindow] = useState('7'),
        [selectedRangeDate, setSelectedRangeDate] = useState({
            startDate: moment().add(-29, 'days').toISOString(),
            endDate: moment().toISOString()
        })


    const saveHandler = async () => {
        setSaveProcessing(true)

        try {
            if (attachedLis.campaign_id === 'all' && attachedLis.rule_id === 'all') {
                await optimizationRulesServices.attachRulesWidthFilters({
                    attributionWindow,
                    selectedRangeDate,

                    campaignFilters,
                    rulesFilters
                })
            } else if (attachedLis.rule_id === 'all') {
                await optimizationRulesServices.attachRulesWidthFilters({
                    attributionWindow,
                    selectedRangeDate,
                    campaigns: attachedLis.campaign_id,
                    rulesFilters
                })
            } else if (attachedLis.campaign_id === 'all') {
                await optimizationRulesServices.attachRulesWidthFilters({
                    attributionWindow,
                    selectedRangeDate,
                    rules: attachedLis.rule_id,
                    campaignFilters
                })
            } else {
                await optimizationRulesServices.attachRules(attachedLis)
            }

            setAttachedList({
                rule_id: [],
                campaign_id: []
            })
            notification.success({title: 'Components successfully paired!'})

        } catch (e) {
            console.log(e)
        }
        setSaveProcessing(false)
    }

    return (<div className="optimization-rules-page">
        <Header
            title={'Quick Settings'}
            actions={() => <Link to={'/optimization-rules'} className="btn default back">
                <SVG id={'down-white-arrow'}/>
                Back to Rule-Based Optimization
            </Link>}
        />


        <div className="attach-settings-page">
            <div className="row">
                <Rules
                    attachedList={attachedLis.rule_id}
                    filters={rulesFilters}

                    onChangeFilters={setRulesFilters}
                    onChangeAttachedList={(rule_id, rulesCount) => setAttachedList(prevState => ({
                        ...prevState,
                        rule_id,
                        rulesCount
                    }))}

                />

                <Campaigns
                    attachedList={attachedLis.campaign_id}
                    filters={campaignFilters}
                    attributionWindow={attributionWindow}
                    selectedRangeDate={selectedRangeDate}

                    onChangeFilters={setCampaignsFilter}
                    onChangeAttachedList={(campaign_id, campaignsCount) => setAttachedList(prevState => ({
                        ...prevState,
                        campaign_id,
                        campaignsCount
                    }))}
                    onChangeAttributionWindow={setAttributionWindow}
                    onChangeSelectedRangeDate={setSelectedRangeDate}
                />
            </div>

            <div
                className={`save-actions ${attachedLis.rule_id.length > 0 && attachedLis.campaign_id.length > 0 ? 'visible' : ''}`}
            >
                <button disabled={saveProcessing} className="btn default" onClick={saveHandler}>
                    Pair the selected components
                    ({attachedLis.rule_id === 'all' ? attachedLis.rulesCount : attachedLis.rule_id.length}/{attachedLis.campaign_id === 'all' ? attachedLis.campaignsCount : attachedLis.campaign_id.length})

                    {saveProcessing && <Spin size={'small'}/>}
                </button>
            </div>
        </div>

    </div>)
}

export default AttachSettings