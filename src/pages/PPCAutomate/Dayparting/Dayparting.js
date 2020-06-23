import React, {useState} from "react";
import './Dayparting.less';
import OutBudget from "./OutBudget/OutBudget";
import ChartStatistics from "./ChartStatistics/ChartStatistics";
import DaySwitches from "./DaySwithes/DaySwithes";
import PlacementsStatistics from "./PlacementsStatistics";
import {colorList} from "./colorList";
import InformationTooltip from "../../../components/Tooltip/Tooltip";
import shortid from "shortid";
import CustomSelect from "../../../components/Select/Select";
import {Select} from "antd";
import moment from "moment";
import tz from 'moment-timezone';

const Option = Select.Option;


// eslint-disable-next-line no-unused-vars
const Dayparting = () => {
    const weeks = [0, 1, 2, 3].map((item) => {
        return ({
            id: item,
            startDate: moment.tz(new Date(), 'America/Los_Angeles').day() !== 0 ? moment.tz(new Date(), 'America/Los_Angeles').subtract(item, 'w').startOf('isoweek').subtract(1, 'd') : moment.tz(new Date(), 'America/Los_Angeles').add(1, 'days').subtract(item, 'w').startOf('isoweek').subtract(1, 'd'),
            endDate: moment.tz(new Date(), 'America/Los_Angeles').day() !== 0 ? moment.tz(new Date(), 'America/Los_Angeles').subtract(item, 'w').endOf('isoweek').subtract(1, 'd') : moment.tz(new Date(), 'America/Los_Angeles').add(1, 'days').subtract(item, 'w').endOf('isoweek').subtract(1, 'd')
        })
    });

    const [selectedDate, setSelectedDate] = useState(weeks[0]);


    function changeDateHandler(dateIndex) {
        setSelectedDate(weeks[dateIndex]);
    }


    return (
        <div className='dayparting-page'>
            <div className='last-synced'>
                <div className="date-stamp">
                    Day-parting is operating in PST (Pacific Standard Time)
                </div>

                <div className="week-select">
                    <CustomSelect
                        getPopupContainer={trigger => trigger.parentNode}
                        defaultValue={0}
                        dropdownClassName={'full-width-menu'}
                        onChange={changeDateHandler}
                    >
                        {weeks.map((item, index) => (
                            <Option
                                key={item}
                                value={item.id}
                            >
                                {`${moment(item.startDate).format('MMM DD')} - ${moment(item.endDate).format('MMM DD')}`}
                            </Option>
                        ))}
                    </CustomSelect>
                </div>

                <div className="color-gradation">
                    Min
                    {colorList.map(item => (
                        <InformationTooltip
                            type={'custom'}
                            description={<span>Min: {item.min} % <br/> Max: {item.max} %</span>}
                            key={shortid.generate()}
                        >
                            <div key={item.color} style={{background: item.color}}/>
                        </InformationTooltip>
                    ))}
                    Max
                </div>
            </div>

            <div className="row">
                <OutBudget
                    date={selectedDate}
                />

                <ChartStatistics
                    date={selectedDate}
                />
            </div>

            <DaySwitches

            />

            <PlacementsStatistics
                date={selectedDate}
            />
        </div>

    )
};

export default React.memo(Dayparting);
