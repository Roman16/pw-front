import React from 'react';
import {Select} from "antd";

const Option = Select.Option;


const KeysKeywords = () => {

    return(
        <section className='keys-keywords'>
            <div className="section-header">
                <div className="tabs">
                    <div>Search Terms</div>
                    <div>Words</div>
                    <div>ASIN’s</div>
                </div>

                <Select defaultValue="clicks">
                    <Option value='clicks' selected>Organic Orders</Option>
                </Select>
            </div>

            <div className="words">
                <span>scratch map of the world</span>
                <span>scratch map usa</span>
                <span>scratch map for travelers</span>
                <span>scratch map world map travel poster</span>
                <span>scratch map big</span>
                <span>scratch map big</span>
                <span>scratch map baseball</span>
                <span>scratch map big size</span>
                <span>scratch map asia</span>
                <span>scratch map clear</span>
                <span>scratch map country</span>
                <span>scratch map edition</span>
                <span>scratch map christmas</span>
                <span>scratch map asia</span>
                <span>scratch map colorful world</span>
            </div>


        </section>
    )
};

export default KeysKeywords;
