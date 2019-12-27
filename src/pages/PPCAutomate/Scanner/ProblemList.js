import React, {useEffect, useState} from 'react'
import {Checkbox, Progress} from "antd";
import InformationTooltip from "../../../components/Tooltip/Tooltip";
import InputCurrency from "../../../components/Inputs/InputCurrency";

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

const ProblemList = ({onScanning, problemsCount, fetching, stopScanning, successFetch}) => {
    const [problems, setProblems] = useState(problemList),
        [processingPercent, setPercent] = useState(),
        [netMargin, setMargin] = useState(0.00);

    function handleStop() {
        stopScanning();
        clearTimeout(processingTimeout);

        setProblems(problems.map(item => {
            if (item.percent !== 100) {
                return ({
                    ...item,
                    percent: 0
                })
            } else {
                return item
            }
        }))
    }

    useEffect(() => {
        setProblems(problems.map(item => ({
            ...item,
            count: problemsCount[item.key]
        })))
    }, [problemsCount]);

    useEffect(() => {
        if (fetching) {
            setPercent(5);
        }
    }, [fetching]);

    useEffect(() => {
        if (processingPercent > 0 && processingPercent < 100) {
            processingTimeout = setTimeout(() => {
                setPercent(processingPercent + 1);

                setProblems(problems.map(item => ({
                    ...item,
                    percent: processingPercent + 1
                })))
            }, 500)
        }
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
                                width={24}
                                strokeWidth={10}
                                strokeColor={'#8FD39D'}
                            />
                            {item.title}

                            {item.count >= 0 && <div className='count'>{item.count}</div>}
                        </div>
                    ))}
                </div>

                <Checkbox>Check My Paused Campaigns</Checkbox>
            </div>

            {fetching ?
                <div className='processing-line'>
                    <div className="processing-green-line" style={{width: `${processingPercent}%`}}/>
                    <div className='processing-status'>
                        Processing...
                        {processingPercent}%

                        <div className='stop-scan' onClick={handleStop}>
                            &#215;
                        </div>
                    </div>
                </div>
                :
                <button
                    className='btn default'
                    onClick={onScanning}
                >
                    {successFetch ? 'Scan Again' : ' Scan PPC Campaigns'}
                </button>
            }
        </section>
    )
};

export default ProblemList;