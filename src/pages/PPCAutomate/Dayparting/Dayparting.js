import React, {useState} from "react"
import './Dayparting.less'
import OutBudget from "./OutBudget/OutBudget"
import ChartStatistics from "./ChartStatistics/ChartStatistics"
import DaySwitches from "./DaySwithes/DaySwithes"
import PlacementsStatistics from "./PlacementsStatistics"
import shortid from "shortid"
import moment from "moment"
import tz from 'moment-timezone'
import {useSelector} from "react-redux"
import CampaignList from "../../../components/CampaignList/CampaignList"
import {Header} from "./Header"
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


    return (
        <div className='dayparting-page'>
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
                    <div className="row charts">
                        <OutBudget
                            date={selectedDate}
                        />

                        <ChartStatistics
                            date={selectedDate}
                        />
                    </div>

                    <DaySwitches
                        multiselect={multiselect}

                    />

                    <PlacementsStatistics
                        date={selectedDate}
                    />
                </div>}

            </div>
        </div>

    )
}

export default React.memo(Dayparting)
