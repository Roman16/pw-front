import React, {Fragment, useEffect, useState} from "react";
import './OutBudget.less';
import moment from "moment";
import InformationTooltip from "../../../../components/Tooltip/Tooltip";
import {colorList} from "../colorList";
import shortid from "shortid";
import {daypartingServices} from "../../../../services/dayparting.services";
import BudgetDrawer from "./BudgetDrawer";
import ModalWindow from "../../../../components/ModalWindow/ModalWindow";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import {numberMask} from "../../../../utils/numberMask";
import {productsActions} from "../../../../actions/products.actions";
import successImage from '../../../../assets/img/landing-contact-us/checked.svg';
import {Spin} from "antd";
import {NavLink} from "react-router-dom";
import {SVG} from "../../../../utils/icons";

const CancelToken = axios.CancelToken;
let source = null;


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
    let localFetching = false;

    const defaultData = Array.from({length: 168}, (item, index) => moment(`${moment(date.startDate).add(Math.floor(index / 24), 'days').format('DD.MM.YYYY')} ${index - 24 * Math.floor(index / 24)}`, 'DD.MM.YYYY HH').format('YYYY-MM-DD HH:mm:ss'));

    const [data, setData] = useState(defaultData),
        [percentParams, setParams] = useState({min: 0, max: 1}),
        [visibleModal, setModal] = useState(false),
        [saved, setStatus] = useState(false),
        [processing, setProcessing] = useState(false),
        [fetchingData, setFetchingData] = useState(false);

    const dispatch = useDispatch();
    const {campaignId, fetchingCampaignList} = useSelector(state => ({
        campaignId: state.products.selectedProduct.id,
        fetchingCampaignList: state.products.fetching,
    }));

    async function saveBudget(data) {
        setProcessing(true);
        try {
            await daypartingServices.setCampaignBudget({campaignId, data: {'value_in_usd': data.value}});
            setStatus(true);

            dispatch(productsActions.updateCampaignBudget({
                id: campaignId,
                dailyBudget: data.value
            }));
        } catch (e) {
            console.log(e);
        }

        setProcessing(false);
    }

    useEffect(() => {

        async function fetchData() {
            source && source.cancel();
            source = CancelToken.source();

            if(campaignId == null) {
                setData(defaultData)
            }

            if (!fetchingCampaignList) {
                setFetchingData(true);
                localFetching = true;

                try {
                    const res =  await daypartingServices.getOutBudgetStatistic({
                            campaignId,
                            date,
                            cancelToken: source.token
                        })

                    const minValue = Math.min(...res.response.map(item => item.sales).filter(item => (item != null && item !== 0))),
                        maxValue = Math.max(...res.response.map(item => item.sales));

                    setParams({
                        min: minValue,
                        max: maxValue
                    });


                    // setData(res.response);
                    setData(defaultData.map(item => {
                        return res.response.find(dataDot => dataDot.date === item) ? res.response.find(dataDot => dataDot.date === item) : {}
                    }));
                    setFetchingData(false);
                    localFetching = false;
                } catch (e) {
                    !localFetching && setFetchingData(false);
                    localFetching = false;
                }
            }
        }

        fetchData();

    }, [campaignId, date]);

    const StatisticItem = ({value, index, outBudget}) => {
        let color;

        colorList.forEach(item => {
            if (value != null) {
                const percent = ((value - percentParams.min) * 100) / (percentParams.max - percentParams.min);
                if (percent >= item.min && percent <= item.max) {
                    color = item.color;
                    return;
                }
            }
        });

        if (outBudget) {
            return (
                <div className="out-budget-item">
                    <div className='statistic-information' style={{background: color, opacity: color ? 1 : 0}}/>
                </div>
            )
        } else {
            return (
                <div className='statistic-information' style={{background: color}}/>
            )
        }
    };

    const TooltipDescription = ({value, timeIndex, date, outBudget}) => {
        return (
            <Fragment>
                <h3 className="date">{`${days[Math.floor(timeIndex / 24)]}`}</h3>
                <div className="row">
                    <div className="col">
                        <h3>
                            {moment(date).format('MMMM DD')}
                        </h3>

                        <span className='selected-metric'>Sales</span>
                    </div>
                    <div className="col">
                        <h3>
                            {`${moment(timeIndex - 24 * Math.floor(timeIndex / 24), 'HH').format('hh A')} - ${moment(timeIndex - 24 * Math.floor(timeIndex / 24) + 1, 'HH').format('hh A')}`}
                        </h3>

                        <div className="value">
                            {(value != null && value !== 0) ? `$${numberMask(value, 2)}` : <div className='no-value'/>}
                        </div>
                    </div>
                </div>

                {outBudget && <div className="row out-of">
                    Out of Budget
                </div>}
            </Fragment>
        )
    };

    return (
        <Fragment>
            <section
                className={` ${(fetchingData || fetchingCampaignList) ? 'spend-statistics disabled' : 'spend-statistics'}`}>
                <div className="section-header">
                    <h2>
                        Sales / Out of Budget
                        <InformationTooltip
                            description={'Sales are total earnings (organic + PPC) from orders for your products that are being advertised in currently selected campaign (you have enabled product ads for these products in campaign)'}
                        />
                    </h2>

                    <div className='out-of-budget'>
                        <div className="campaign">
                            <div/>
                            Out of Budget
                        </div>
                    </div>

                    <button
                        className='btn default'
                        onClick={() => setModal(true)}
                        disabled={!campaignId}
                        data-intercom-target='add-budget-button'
                    >
                        <SVG id='plus-white'/>
                        Add budget
                    </button>
                </div>

                <div className="statistics-block">
                    <div className="row time-axis">
                        {hours.map((status, timeIndex) => (
                            <div className="time-name" key={shortid.generate()}>
                                {moment(timeIndex, 'HH').format('hh')}
                                <br/>
                                {moment(timeIndex, 'HH').format('A')}
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
                                                outBudget={item.out_of_budget}
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

                {(fetchingData || fetchingCampaignList) && <div className="disable-page-loading">
                    <Spin size="large"/>
                </div>}
            </section>


            <ModalWindow
                visible={visibleModal}
                className={'budget-window'}
                handleCancel={() => {
                    setModal(false);
                    setStatus(false);
                }}
                footer={false}
                destroyOnClose={true}
            >
                {saved ?
                    <div className='success'>
                        <img src={successImage} alt=""/>
                        <h3>Budget saved</h3>

                        <button
                            onClick={() => {
                                setModal(false);
                                setStatus(false);
                            }}
                            className='btn green-btn'
                        >
                            Done
                        </button>
                    </div>
                    :
                    <BudgetDrawer
                        onClose={() => setModal(false)}
                        onSave={saveBudget}
                        processing={processing}
                    />
                }
            </ModalWindow>
        </Fragment>
    )
};

export default React.memo(OutBudget);