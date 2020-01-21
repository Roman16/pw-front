import React, {useEffect, useState} from 'react'
import {Checkbox, Progress, Icon} from "antd";
import InformationTooltip from "../../../components/Tooltip/Tooltip";
import InputCurrency from "../../../components/Inputs/InputCurrency";
import moment from "moment";

let problemList = [
    {
        title: 'Duplicate keywords',
        key: 'DuplicateKeywords',
        percent: 0
    },
    {
        title: 'Bad-performing keywords',
        key: 'BadPerformingKeywords',
        percent: 0
    },
    {
        title: 'Keywords Harvesting',
        key: 'KeywordsHarvesting',
        percent: 0
    },
    {
        title: 'Bad Semantic Core',
        key: 'PoorSemanticCore',
        percent: 0
    },
    {
        title: 'No Product Attribute Targeting',
        key: 'PATs',
        percent: 0
    },
];

let processingTimeout = null;

const ProblemList = ({onScanning, problemsCount, fetching, stopScanning, successFetch, onDownloadFile}) => {
    const devicePixelRatio = window.devicePixelRatio;

    const [problems, setProblems] = useState(problemList),
        [processingPercent, setPercent] = useState(),
        [netMargin, setMargin] = useState(0.00),
        [pausedCampaigns, setPausedCampaigns] = useState(false);

    function handleStop() {
        stopScanning();
        setPercent(0);
        setProblems(problems.map(item => {
            if (item.percent === 100) {
                return (item)
            } else {
                return ({
                    ...item,
                    percent: 0
                })
            }
        }));

        clearTimeout(processingTimeout);
    }

    useEffect(() => {
        if (fetching) {
            setPercent(1);
        } else if (!fetching && !successFetch) {
            setPercent(0);
            setProblems(problemList);
            clearTimeout(processingTimeout);
        }
    }, [fetching]);

    useEffect(() => {
        if (successFetch) {
            setPercent(0);
        }
    }, [successFetch]);

    useEffect(() => {
        if (fetching) {
            setProblems(problems.map(item => {
                if (problemsCount[item.key] >= 0) {
                    return ({
                        ...item,
                        count: problemsCount[item.key],
                        percent: 100
                    })
                } else {
                    return ({
                        ...item,
                        count: null,
                        percent: processingPercent
                    })
                }
            }));
        }
    }, [problemsCount]);


    useEffect(() => {
        if ((processingPercent > 0 && processingPercent < 100) || fetching) {
            processingTimeout = setTimeout(() => {
                if (problemsCount && processingPercent < Object.keys(problemsCount).length * 20) {
                    setPercent(Object.keys(problemsCount).length * 20);
                } else {
                    if(Object.keys(problemsCount).length < 5 && processingPercent === 90) {
                        setPercent(90);
                    } else {
                        setPercent(processingPercent + 1);
                    }
                }
            }, 500)
        }

        return (() => {
            clearTimeout(processingTimeout)
        })
    }, [processingPercent]);


    return (
        <section className='problems-list-card'>
            <div className="header-block">
                <h3>Find this problems:</h3>

                <div className='net-margin'>
                    <label>Enter your Product Net Margin</label>

                    <div className='input-block'>
                        <InformationTooltip
                            title={'How to calculate your Product Net Margin?'}
                            description={'Price - (Product Cost + Amazon Fees + Shipping Cost + Overhead + Labor + Taxes + Insurance) = Product Net Margin'}
                        />

                        <InputCurrency
                            value={netMargin}
                            onChange={value => setMargin(value)}
                        />
                    </div>
                </div>
            </div>

            <div className='problems-list'>
                <div className='title'>
                    <span className='status'>Status</span>
                    <span className='mistakes'>Mistakes</span>
                </div>

                <div className="list">
                    {problems.map(item => (
                        <div key={item.key}>
                            <Progress
                                type="circle"
                                format={percent => percent === 100 && <div className='completed'>&#10004;</div>}
                                percent={item.percent}
                                width={devicePixelRatio === 2 ? 18 : 24}
                                strokeWidth={10}
                                strokeColor={'#8FD39D'}
                            />
                            {item.title}

                            {item.count != null && item.count >= 0 && <div className='count'>{item.count}</div>}
                        </div>
                    ))}
                </div>

                <Checkbox onChange={(e) => setPausedCampaigns(e.target.checked)}>Check My Paused Campaigns</Checkbox>
            </div>


            {fetching ?
                <div className='processing-line'>
                    <div className="processing-green-line"
                         style={{width: `${processingPercent >= 100 ? 100 : processingPercent}%`}}/>
                    <div className='processing-status'>
                        Processing...
                        {processingPercent >= 100 ? 100 : processingPercent}%

                        <div className='stop-scan' onClick={handleStop}>
                            &#215;
                        </div>
                    </div>
                </div>
                :
                <button
                    className='btn default'
                    onClick={() => onScanning({
                        pausedCampaigns,
                        netMargin
                    })}
                >
                    {successFetch ? 'Scan Again' : ' Scan PPC Campaigns'}
                </button>
            }

            {successFetch && <button
                className='btn white download'
                onClick={onDownloadFile}
            >
                <div>
                    {moment(new Date()).format('DD MMM, HH:mm')}
                    <b>Problems Report</b>
                </div>
                <Icon type="download"/>
            </button>}
        </section>
    )
};

export default ProblemList;