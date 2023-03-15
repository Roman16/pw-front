import React, {useState} from "react"
import {Header} from "../Header/Header"
import {Link} from "react-router-dom"
import {SVG} from "../../../utils/icons"
import '../OptimizationRules.less'
import '../CreateRulesWindow/CreateRulesWindow.less'
import './AttachSettings.less'
import {List} from "./List"
import {Spin} from "antd"
import {optimizationRulesServices} from "../../../services/optimization.rules.services"
import {notification} from "../../../components/Notification"

const AttachSettings = () => {
    const [attachedLis, setAttachedList] = useState({
            rules: [],
            campaigns: []
        }),
        [saveProcessing, setSaveProcessing] = useState(false)


    const saveHandler = async () => {
        setSaveProcessing(true)

        try {
            try {
                // if(attachedLis.campaigns === 'all') {
                //
                // } else {
                //     await optimizationRulesServices.attachRules(attachedLis)
                // }

                setAttachedList({
                    rules: [],
                    campaigns: []
                })
                notification.success({title: 'Components successfully paired!'})
            } catch (e) {
                console.log(e)
            }

        } catch (e) {
            console.log(e)
        }
        setSaveProcessing(false)
    }

    return (<div className="optimization-rules-page">
        <Header
            title={'Quick Settings'}
            actions={() => <Link to={'/optimization-rules'} className="btn default">
                <SVG id={'optimization-rules-icon-sidebar'}/>
                Optimization Rules
            </Link>}
        />


        <div className="attach-settings-page">
            <div className="row">
                <List
                    label={'Rules'}
                    type={'rules'}
                    attachedList={attachedLis.rules}
                    onChange={(rules, rulesCount) => setAttachedList({...attachedLis, rules, rulesCount})}
                />

                <List
                    label={'Campaigns'}
                    type={'campaigns'}
                    widthAttributionWindow
                    attachedList={attachedLis.campaigns}
                    onChange={(campaigns, campaignsCount) => setAttachedList({
                        ...attachedLis,
                        campaigns,
                        campaignsCount
                    })}
                />
            </div>

            <div
                className={`save-actions ${attachedLis.rules.length > 0 && attachedLis.campaigns.length > 0 ? 'visible' : ''}`}>

                <button disabled={saveProcessing} className="btn default" onClick={saveHandler}>
                    Pair the selected components
                    ({attachedLis.rules === 'all' ? attachedLis.rulesCount : attachedLis.rules.length}/{attachedLis.campaigns === 'all' ? attachedLis.campaignsCount : attachedLis.campaigns.length})

                    {saveProcessing && <Spin size={'small'}/>}
                </button>
            </div>
        </div>

    </div>)
}

export default AttachSettings