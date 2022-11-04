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


const Dayparting = () => {
    const [multiselect, setMultiselect] = useState(false),
        [attributionWindow, setAttributionWindow] = useState(7)

    moment.locale('en')


    const activeAmazonMarketplace = useSelector(state => state.user.activeAmazonMarketplace),
        subscription = useSelector(state => state.user.subscription)

    const timezone = activeAmazonMarketplace.timezone

    const {campaignId, fetchingCampaignList, activeTab} = useSelector(state => ({
        campaignId: state.dayparting.selectedCampaign.id,
        fetchingCampaignList: state.dayparting.processing,
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
                        fetchingCampaignList={fetchingCampaignList}
                        hasSubscriptions={subscription.access.optimization}
                    />
                </div> : <div className="col">
                    <HourDayStatistics
                        date={selectedDate}
                        campaignId={campaignId}
                        selectedCompareDate={selectedCompareDate}
                        attributionWindow={attributionWindow}
                        fetchingCampaignList={fetchingCampaignList}
                    />

                    <MetricsComparison
                        date={selectedDate}
                        campaignId={campaignId}
                        attributionWindow={attributionWindow}
                        fetchingCampaignList={fetchingCampaignList}
                    />

                    <PlacementsStatistics
                        date={selectedDate}
                        selectedCompareDate={selectedCompareDate}
                        campaignId={campaignId}
                        attributionWindow={attributionWindow}
                        fetchingCampaignList={fetchingCampaignList}
                    />

                    {activeTab === 'campaigns' && <DaySwitches
                        multiselect={multiselect}
                        fetchingCampaignList={fetchingCampaignList}
                        hasSubscriptions={subscription.access.optimization}
                    />}
                </div>}
            </div>
        </div>

    )
}

export default React.memo(Dayparting)
