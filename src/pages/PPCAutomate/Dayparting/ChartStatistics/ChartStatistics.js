import React, {useEffect, useState} from "react";
import {Select, Spin} from "antd";
import CustomSelect from "../../../../components/Select/Select";
import DayChart from './DayChart';
import {metricsList} from "./metricsList";
import {daypartingServices} from "../../../../services/dayparting.services";
import {useSelector} from "react-redux";
import axios from "axios";

const CancelToken = axios.CancelToken;
let source = null;
const Option = Select.Option;

const ChartStatistics = ({date}) => {
    let localFetching = false;

    const [data, setData] = useState([]),
        [firstMetric, setFirstMetric] = useState(metricsList[1]),
        [secondMetric, setSecondMetric] = useState(metricsList[0]),
        [processing, setProcessing] = useState(false);

    const {campaignId, fetchingCampaignList} = useSelector(state => ({
        campaignId: state.dayparting.selectedCampaign.id,
        fetchingCampaignList: state.dayparting.processing,
    }));

    useEffect(() => {
        async function fetchData() {
            source && source.cancel();
            source = CancelToken.source();

            if (campaignId == null) {
                setData([])
            } else if (!fetchingCampaignList) {
                setProcessing(true);
                localFetching = true;

                try {
                    const res = await daypartingServices.getDailyStatistic({
                        campaignId,
                        date,
                        firstMetric,
                        secondMetric,
                        cancelToken: source.token
                    });

                    setProcessing(false);
                    localFetching = false;

                    setData([...res.response.points.map(item => {
                        const point = {};
                        point.date = item.date;
                        point[firstMetric.key] = item.metrics[firstMetric.key].value !== null ? +item.metrics[firstMetric.key].value : null;

                        if (secondMetric.key !== 'nothing') {
                            point[secondMetric.key] = item.metrics[secondMetric.key].value !== null ? +item.metrics[secondMetric.key].value : null;
                        }

                        return (point);
                    })]);

                } catch (e) {
                    !localFetching && setProcessing(false);
                    localFetching = false;
                }
            }
        }

        fetchData();

    }, [campaignId, date, firstMetric, secondMetric]);

    useEffect(() => {
        if (campaignId == null && !fetchingCampaignList) {
            localFetching = false;
            setProcessing(false);
        }
    }, [fetchingCampaignList]);


    return (
        <section
            className={`${(processing || fetchingCampaignList) ? 'chart-statistics disabled' : 'chart-statistics'}`}>
            <div className="section-header">
                <h2>Metrics Comparison</h2>

                <div className='sorter'>
                    <div className={"select first"}>
                        <CustomSelect
                            value={firstMetric.key}
                            getPopupContainer={trigger => trigger.parentNode}
                            dropdownClassName={'full-width-menu'}
                            className={firstMetric.key === 'nothing' && 'default-border'}
                            onChange={(metric) => {
                                setFirstMetric(metricsList.find(item => item.key === metric));

                                if (metric === secondMetric.key) {
                                    setSecondMetric(metricsList[0])
                                }
                            }}
                        >
                            {metricsList.map(item => (
                                <Option
                                    title={item.title}
                                    key={item.key}
                                    value={item.key}
                                    disabled={secondMetric.key === 'nothing' && item.key === 'nothing'}
                                >
                                    {item.title}
                                </Option>
                            ))}
                        </CustomSelect>
                    </div>

                    <span>vs</span>

                    <div className="select second">
                        <CustomSelect
                            getPopupContainer={trigger => trigger.parentNode}
                            value={secondMetric.key}
                            dropdownClassName={'full-width-menu'}
                            className={secondMetric.key === 'nothing' && 'default-border'}
                            onChange={(metric) => setSecondMetric(metricsList.find(item => item.key === metric))}
                        >
                            {metricsList.map(item => (
                                <Option
                                    title={item.title}
                                    disabled={firstMetric.key === item.key}
                                    key={item.key}
                                    value={item.key}
                                >
                                    {item.title}
                                </Option>
                            ))}
                        </CustomSelect>
                    </div>
                </div>
            </div>

            <DayChart
                data={data}
                firstMetric={firstMetric}
                secondMetric={secondMetric}
            />

            {(processing || fetchingCampaignList) && <div className="disable-page-loading">
                <Spin size="large"/>
            </div>}
        </section>
    )
};

export default React.memo(ChartStatistics);
