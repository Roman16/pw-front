import React from 'react'
import {Checkbox, Progress} from "antd";
import InformationTooltip from "../../../components/Tooltip/Tooltip";
import InputCurrency from "../../../components/Inputs/InputCurrency";

const ProblemList = ({onScanning}) => {
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
                            value={0}
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
                    <div>
                        {/*<div className='loader'/>*/}
                        <Progress
                            type="circle"
                            percent={100}
                            width={20}
                        />

                        Duplicate keywords
                    </div>
                    <div>
                        <div className='loader'/>
                        Bad-performing keywords
                    </div>
                    <div>
                        <div className='loader'/>
                        Keywords Harvesting
                    </div>
                    <div>
                        <div className='loader'/>
                        Bad Semantic Core
                    </div>
                    <div>
                        <div className='loader'/>
                        No Product Attribute Targeting
                    </div>
                </div>

                <Checkbox>Check My Paused Campaigns</Checkbox>
            </div>

            <button
                className='btn default'
                onClick={onScanning}
            >
                Scan PPC Campaigns
            </button>
        </section>
    )
};

export default ProblemList;