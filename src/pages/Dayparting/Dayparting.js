import React, {useEffect, useState} from "react"
import './Dayparting.less'
import HourDayStatistics from "./HourDayStatistics/HourDayStatistics"
import DaySwitches from "./DaySwithes/DaySwithes"
import PlacementsStatistics from "./Placements/Placements"
import shortid from "shortid"
import moment from "moment-timezone"
import tz from 'moment-timezone'
import {useSelector} from "react-redux"
import CampaignList from "./CampaignList/CampaignList"
import {Header} from "./Header/Header"
import DaySwitchesMulti from "./DaySwithes/DaySwitchesMulti"
import MetricsComparison from "./MetricsComparison/MetricsComparison"
import {activeTimezone} from "../../index"
import {daypartingServices} from "../../services/dayparting.services"


moment.locale('en')

const Dayparting = () => {
    const [multiselect, setMultiselect] = useState(false),
        [attributionWindow, setAttributionWindow] = useState(30)

    const activeAmazonMarketplace = useSelector(state => state.user.activeAmazonMarketplace),
        subscription = useSelector(state => state.user.subscription)

    const timezone = activeAmazonMarketplace.timezone

    const {campaignId, fetchingCampaignList, activeTab} = useSelector(state => ({
        campaignId: state.dayparting.selectedCampaign.id,
        fetchingCampaignList: state.dayparting.fetchingCampaignList,
        activeTab: state.dayparting.activeTab,
    }))

    const [selectedDate, setSelectedDate] = useState({
            startDate: moment().startOf('week'),
            endDate: moment().endOf('week')
        }),
        [selectedCompareDate, setSelectedCompareDate] = useState()


    return (
        <div className='dayparting-page dark-mode'>
            <Header
                selectedDate={selectedDate}
                selectedCompareDate={selectedCompareDate}
                marketplace={activeAmazonMarketplace}
                attributionWindowValue={attributionWindow}

                onChangeDate={setSelectedDate}
                onChangeCompareDate={setSelectedCompareDate}
                onChangeAttributionWindow={setAttributionWindow}
            />

            <div className="row">
                <CampaignList
                    multiselect={multiselect}
                    onSetMultiselect={setMultiselect}
                />

                {multiselect ? <div className="col">
                    <DaySwitchesMulti
                        multiselect={multiselect}
                        hasSubscriptions={subscription.active_subscription_type || subscription.trial.trial_active}
                    />
                </div> : <div className="col">
                    <HourDayStatistics
                        date={selectedDate}
                        campaignId={campaignId}
                        selectedCompareDate={selectedCompareDate}
                        attributionWindow={attributionWindow}
                    />

                    <MetricsComparison
                        date={selectedDate}
                        campaignId={campaignId}
                        attributionWindow={attributionWindow}
                    />

                    <PlacementsStatistics
                        date={selectedDate}
                        selectedCompareDate={selectedCompareDate}
                        campaignId={campaignId}
                        attributionWindow={attributionWindow}
                    />

                    {activeTab === 'campaigns' && <DaySwitches
                        multiselect={multiselect}
                        hasSubscriptions={subscription.active_subscription_type || subscription.trial.trial_active}
                    />}
                </div>}
            </div>
        </div>

    )
}

export default React.memo(Dayparting)
