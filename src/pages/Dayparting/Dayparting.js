import React, {useEffect, useState} from "react"
import './Dayparting.less'
import HourDayStatistics from "./HourDayStatistics/HourDayStatistics"
import DaySwitches from "./DaySwithes/DaySwithes"
import PlacementsStatistics from "./Placements/Placements"
import moment from "moment-timezone"
import {useSelector} from "react-redux"
import CampaignList from "./CampaignList/CampaignList"
import {Header} from "./Header/Header"
import DaySwitchesMulti from "./DaySwithes/DaySwitchesMulti"
import MetricsComparison from "./MetricsComparison/MetricsComparison"
import ModalWindow from "../../components/ModalWindow/ModalWindow"
import {Checkbox} from "antd"


const Dayparting = () => {
    const [multiselect, setMultiselect] = useState(false),
        [attributionWindow, setAttributionWindow] = useState(7)


    const [dontShowAgain, setDontShowAgain] = useState(false),
        [visibleWindow, setVisibleWindow] = useState(localStorage.getItem('dontShowDaypartingWindow') !== 'true')

    const setWindowStateHandler = () => {
        if (dontShowAgain) localStorage.setItem('dontShowDaypartingWindow', 'true')

        setVisibleWindow(false)
    }


    const activeAmazonMarketplace = useSelector(state => state.user.activeAmazonMarketplace),
        subscription = useSelector(state => state.user.subscription)

    const timezone = activeAmazonMarketplace.timezone

    const {campaignId, fetchingCampaignList, activeTab, campaignType} = useSelector(state => ({
        campaignId: state.dayparting.selectedCampaign.id,
        campaignType: state.dayparting.selectedCampaign.advertising_type,
        fetchingCampaignList: state.dayparting.processing,
        activeTab: state.dayparting.activeTab,
    }))

    const [selectedDate, setSelectedDate] = useState({
            startDate: moment().tz(timezone).startOf('week'),
            endDate: moment().tz(timezone).startOf('week').add(6, 'days')
        }),
        [selectedCompareDate, setSelectedCompareDate] = useState()

    useEffect(() => {
        moment.tz.setDefault(timezone)

        return (() => {
            moment.tz.setDefault()
        })
    }, [])


    return (
        <>
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
                        {campaignId && activeTab === 'campaigns' && campaignType !== 'SponsoredProducts' &&
                        <section className={'not-sp-campaign'}>
                            You have selected {campaignType?.replace(/([a-z])([A-Z])/g, '$1 $2')} campaign.
                            Unfortunately, hourly metrics are only provided by Amazon for Sponsored Products campaigns
                            only right now. <br/>
                            Our Dayparting functionality is still available though and you can set up your settings at
                            the bottom of this page.
                        </section>}

                        <HourDayStatistics
                            date={selectedDate}
                            campaignId={campaignId}
                            selectedCompareDate={selectedCompareDate}
                            attributionWindow={attributionWindow}
                            fetchingCampaignList={fetchingCampaignList}
                            activeTab={activeTab}
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

            <ModalWindow
                visible={visibleWindow}
                footer={false}
                className={'dayparting-message-window'}
            >
                <h2>Welcome to Dayparting 2.0</h2>
                <p>Please Note that this tool does not retrieve past data. Instead, it starts collecting it starting the
                    date you connect your APIs.</p>

                <div className="actions">
                    <Checkbox
                        checked={dontShowAgain}
                        onChange={({target: {checked}}) => setDontShowAgain(checked)}
                    >
                        Don’t show this message again
                    </Checkbox>

                    <button className="btn default" onClick={setWindowStateHandler}>
                        Ok
                    </button>
                </div>
            </ModalWindow>
        </>
    )
}

export default React.memo(Dayparting)
