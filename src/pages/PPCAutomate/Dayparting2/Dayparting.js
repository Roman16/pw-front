import React, {useEffect, useState} from "react"
import './Dayparting.less'
import HourDayStatistics from "./HourDayStatistics/HourDayStatistics"
import ChartStatistics from "./ChartStatistics/ChartStatistics"
import DaySwitches from "./DaySwithes/DaySwithes"
import PlacementsStatistics from "./PlacementsStatistics"
import shortid from "shortid"
import moment from "moment"
import tz from 'moment-timezone'
import {useSelector} from "react-redux"
import CampaignList from "./CampaignList/CampaignList"
import {Header} from "./Header/Header"
import DaySwitchesMulti from "./DaySwithes/DaySwitchesMulti"


const Dayparting = () => {
    const [multiselect, setMultiselect] = useState(false)

    const activeAmazonMarketplace = useSelector(state => state.user.activeAmazonMarketplace)
    const timezone = activeAmazonMarketplace.timezone

    const weeks = [0, 1, 2, 3].map((item) => {
        return ({
            id: item,
            startDate: moment.tz(new Date(), timezone).day() !== 0 ? moment.tz(new Date(), timezone).subtract(item, 'w').startOf('isoweek').subtract(1, 'd') : moment.tz(new Date(), timezone).add(1, 'days').subtract(item, 'w').startOf('isoweek').subtract(1, 'd'),
            endDate: moment.tz(new Date(), timezone).day() !== 0 ? moment.tz(new Date(), timezone).subtract(item, 'w').endOf('isoweek').subtract(1, 'd') : moment.tz(new Date(), timezone).add(1, 'days').subtract(item, 'w').endOf('isoweek').subtract(1, 'd')
        })
    })

    const [selectedDate, setSelectedDate] = useState(weeks[0])


    function changeDateHandler(dateIndex) {
        setSelectedDate(weeks[dateIndex])
    }

    useEffect(() => {

    }, [])

    return (
        <div className='dayparting-page dark-mode'>
            <Header
                weeks={weeks}
                marketplace={activeAmazonMarketplace}

                onChange={changeDateHandler}
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
                    />

                    <ChartStatistics
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
