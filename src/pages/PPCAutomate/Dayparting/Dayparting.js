import React, {PureComponent} from "react";
import './Dayparting.less';
import OutBudget from "./OutBudget";
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

const weeks = [
    {
        startDate: moment().clone().startOf('isoweek'),
        endDate: moment().clone().startOf('isoweek').add(6, 'days')
    },
    {
        startDate: moment().clone().startOf('isoweek').subtract(1, 'w'),
        endDate: moment().clone().startOf('isoweek').subtract(1, 'w').add(6, 'days')
    },

];

// eslint-disable-next-line no-unused-vars
class Dayparting extends PureComponent {
    handleReloadDate = () => {

    };

    render() {
        return (
            <div className='dayparting-page'>
                <div className='last-synced'>
                    <div className="week-select">
                        <label htmlFor="">Select Week:</label>

                        <CustomSelect
                            getPopupContainer={trigger => trigger.parentNode}
                            value={0}
                            dropdownClassName={'full-width-menu'}
                            onChange={(metric) => {
                            }}
                        >
                            {[0, 1, 2, 3].map(item => (
                                <Option
                                    key={item}
                                    value={item}
                                >
                                    {`${moment().clone().startOf('isoweek').subtract(item, 'w').subtract(1, 'd').format('MMM DD')} - ${moment().clone().startOf('isoweek').subtract(item, 'w').add(6, 'days').subtract(1, 'd').format('MMM DD')}`}
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
                    />

                    <ChartStatistics
                    />
                </div>

                <DaySwitches

                />

                <PlacementsStatistics

                />
            </div>
        )
    }
}

export default Dayparting;
