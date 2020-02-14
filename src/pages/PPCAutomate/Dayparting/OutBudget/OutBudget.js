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
import {useSelector} from "react-redux";
import axios from "axios";
import {numberMask} from "../../../../utils/numberMask";

const CancelToken = axios.CancelToken;
let source = null;

const defaultData = Array.from({length: 168}, () => 0);

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


const OutBudget = ({date}) => {
    const [data, setData] = useState(defaultData),
        [percentParams, setParams] = useState({min: 0, max: 1}),
        [visibleModal, setModal] = useState(false);

    const {campaignId} = useSelector(state => ({
        campaignId: state.products.selectedProduct.id
    }));

   async function saveBudget(data) {
        console.log(data);

       try {
           await daypartingServices.setCampaignBudget({campaignId});
           setModal(false);
       } catch (e) {
           console.log(e);
       }
   }

    useEffect(() => {
        async function fetchData() {
            source && source.cancel();
            source = CancelToken.source();

            try {
                const res = await daypartingServices.getOutBudgetStatistic({campaignId, date, cancelToken: source.token});

                const minValue = Math.min(...res.response.map(item => item.sales ? item.sales : 0)),
                    maxValue = Math.max(...res.response.map(item => item.sales));

                setParams({
                    min: minValue,
                    max: maxValue
                });

                setData(res.response)
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();

    }, [campaignId, date]);

    const StatisticItem = ({value, index, outBudget}) => {
        let color;

        colorList.forEach(item => {
            const percent = ((value - percentParams.min) * 100) / (percentParams.max - percentParams.min);
            if (percent > item.min && percent <= item.max) {
                color = item.color;
                return;
            }
        });

        if (outBudget) {
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

    const TooltipDescription = ({value, timeIndex, date}) => {
        return (
            <Fragment>
                <div className="col">
                    <h3>
                        {`${days[Math.floor(timeIndex / 24)]}`}
                    </h3>

                    <span className='selected-metric'>Sales</span>
                </div>
                <div className="col">
                    <h3>
                        {`${moment(timeIndex - 24 * Math.floor(timeIndex / 24), 'HH').format('hh A')} - ${moment(timeIndex - 24 * Math.floor(timeIndex / 24) + 1, 'HH').format('hh A')}`}
                    </h3>

                    <div className="value">
                        {value ? `$${numberMask(value, 2)}` : <div className='no-value'/>}
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
                                                value={item.sales}
                                                date={item.date}
                                                timeIndex={index}
                                            />
                                        }
                                    >
                                        <StatisticItem
                                            value={item.sales}
                                            outBudget={item.out_of_budget}
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