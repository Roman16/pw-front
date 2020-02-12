import React, {PureComponent} from "react";
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

const Option = Select.Option;

const weeks = [0, 1, 2, 3].map((item) => ({
    id: item,
    startDate: moment().clone().startOf('isoweek').subtract(item, 'w').subtract(1, 'd'),
    endDate: moment().clone().startOf('isoweek').subtract(item, 'w').add(6, 'days').subtract(1, 'd')
}));

// eslint-disable-next-line no-unused-vars
class Dayparting extends PureComponent {
    state = {
        selectedDate: weeks[0]
    };

    changeDateHandler = (dateIndex) => {
        console.log(dateIndex);

        this.setState({
            selectedDate: weeks[dateIndex]
        })
    };

    render() {
        const {selectedDate} = this.state;

        return (
            <div className='dayparting-page'>
                <div className='last-synced'>
                    <div className="week-select">
                        <label htmlFor="">Select Week:</label>

                        <CustomSelect
                            getPopupContainer={trigger => trigger.parentNode}
                            defaultValue={0}
                            dropdownClassName={'full-width-menu'}
                            onChange={this.changeDateHandler}
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
    }
}

export default Dayparting;
