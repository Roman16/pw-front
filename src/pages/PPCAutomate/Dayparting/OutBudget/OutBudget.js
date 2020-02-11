import React, {Fragment, useEffect, useState} from "react";
import './OutBudget.less';
import moment from "moment";
import InformationTooltip from "../../../../components/Tooltip/Tooltip";
import {colorList} from "../colorList";
import shortid from "shortid";
import plusIconWhite from '../../../../assets/img/icons/plus-white.svg';
import {daypartingServices} from "../../../../services/dayparting.services";
import BudgetDrawer from "./BudgetDrawer";
import ModalWindow from "../../../../components/ModalWindow/ModalWindow";

const defaultData = Array.from({length: 168}, () => ({value: Math.floor(Math.random() * 555) + 1}));

const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

const hours = Array.from({length: 24}, (item, index) => index);


const OutBudget = () => {
    const [data, setData] = useState(defaultData),
        [percentParams, setParams] = useState({min: 0, max: 1}),
        [visibleModal, setModal] = useState(false);

    function saveBudget(data) {
        console.log(data);
        setModal(false)
    }

    useEffect(() => {
        daypartingServices.getSpendOutStatistic()
            .then(res => {
                // console.log(res);
            });

        const minValue = Math.min(...defaultData.map(item => item.value)),
            maxValue = Math.max(...defaultData.map(item => item.value));

        setParams({
            min: minValue,
            max: maxValue
        });
    }, []);

    const StatisticItem = ({value, index}) => {
        let color;

        colorList.forEach(item => {
           const percent = ((value - percentParams.min) * 100) / (percentParams.max - percentParams.min);
            if (percent > item.min && percent <= item.max) {
                color = item.color;
                return;
            }
        });

        if (index === 166 || index === 167) {
            return (
                <div className="out-budget-item">
                    <div className='statistic-information' style={{background: color}}/>
                </div>
            )
        } else {
            return (
                <div className='statistic-information' style={{background: color}}/>
            )
        }
    };

    const TooltipDescription = ({value, timeIndex}) => {
        return (
            <Fragment>
                <h3>
                    {days[Math.floor(timeIndex / 24)]}

                    <span className="time">
                        {`${moment(timeIndex - 24 * Math.floor(timeIndex / 24), 'HH').format('hh A')} - ${moment(timeIndex - 24 * Math.floor(timeIndex / 24) + 1, 'HH').format('hh A')}`}
                    </span>
                </h3>

                <div className="row-metric">
                    <StatisticItem value={value} index={timeIndex}/>

                    <span className='selected-metric'>Sales</span>

                    <div className="value">
                        ${value}
                    </div>
                </div>
            </Fragment>
        )
    };

    return (
        <Fragment>
            <section className='spend-statistics'>
                <div className="section-header">
                    <h2>Sales / Out of Budget</h2>

                    <div className='out-of-budget'>
                        <div/>
                        Out of Budget
                    </div>

                    <button className='btn default' onClick={() => setModal(true)}>
                        <img src={plusIconWhite} alt=""/>
                        Add budget
                    </button>
                </div>

                <div className="statistics-block">
                    <div className="row time-axis">
                        {hours.map((status, timeIndex) => (
                            <div className="time-name" key={shortid.generate()}>
                                {moment(timeIndex + 1, 'HH').format('hh')}
                                <br/>
                                {moment(timeIndex + 1, 'HH').format('A')}
                            </div>
                        ))}
                    </div>

                    <div className="row">
                        <div className="col day-axis">
                            {days.map((day, dayIndex) => (
                                <div className='day-name' key={shortid.generate()}>
                                    {day[0]}
                                </div>
                            ))}
                        </div>

                        <div className="statistic">
                            {data.map((item, index) => (
                                <div className='statistic-item' key={shortid.generate()}>
                                    <InformationTooltip
                                        getPopupContainer={trigger => trigger.parentNode}
                                        type={'custom'}
                                        className={'chart-tooltip'}
                                        description={
                                            <TooltipDescription
                                                value={item.value}
                                                timeIndex={index}
                                            />
                                        }
                                    >
                                        <StatisticItem
                                            value={item.value}
                                            index={index}
                                        />
                                    </InformationTooltip>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


            </section>


            <ModalWindow
                visible={visibleModal}
                className={'budget-window'}
                handleCancel={() => setModal(false)}
                footer={false}
            >
                <BudgetDrawer
                    onClose={() => setModal(false)}
                    onSave={saveBudget}
                />
            </ModalWindow>
        </Fragment>
    )
};

export default OutBudget;