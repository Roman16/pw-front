import React, {useEffect, useState} from "react"
import './Dayparting.less'
import HourDayStatistics from "./HourDayStatistics/HourDayStatistics"
import ChartStatistics from "./ChartStatistics/ChartStatistics"
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


moment.locale('en')

const Dayparting = () => {
    const [multiselect, setMultiselect] = useState(false)

    const activeAmazonMarketplace = useSelector(state => state.user.activeAmazonMarketplace)
    const timezone = activeAmazonMarketplace.timezone


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

                onChangeDate={setSelectedDate}
                onChangeCompareDate={setSelectedCompareDate}
            />

            <div className="row">
                <CampaignList
                    multiselect={multiselect}

                    onSetMultiselect={setMultiselect}
                />

                {multiselect ? <div className="col">
                    <DaySwitchesMulti
                        multiselect={multiselect}
                    />
                </div> : <div className="col">
                    <HourDayStatistics
                        date={selectedDate}
                        selectedCompareDate={selectedCompareDate}
                    />

                    <MetricsComparison
                        date={selectedDate}
                    />

                    <PlacementsStatistics
                        date={selectedDate}
                    />

                    <DaySwitches
                        multiselect={multiselect}

                    />
                </div>}
            </div>
        </div>

    )
}

export default React.memo(Dayparting)
