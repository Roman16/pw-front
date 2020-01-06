import React, {Component} from "react";
import './Dayparting.less';
import reloadIcon from '../../../assets/img/icons/reload2-icon.svg';
import SpendStatistics from "./SpendStatistics";
import ChartStatistics from "./ChartStatistics/ChartStatistics";
import DaySwitches from "./DaySwithes/DaySwithes";
import KeysKeywords from "./KeysKeywords";
import PlacementsStatistics from "./PlacementsStatistics";
import {colorList} from "./colorList";
import InformationTooltip from "../../../components/Tooltip/Tooltip";

// eslint-disable-next-line no-unused-vars
class Dayparting extends Component {
    state = {};

    handleReloadDate = () => {

    };

    render() {
        return (
            <div className='dayparting-page'>
                <div className='last-synced'>
                    <button className='reload-btn' onClick={this.handleReloadDate}>
                        <img src={reloadIcon} alt=""/>
                    </button>

                    Data last synced at 3:08 PM GMT+3, 4/22/19

                    <div className="color-gradation">
                        Min
                        {colorList.map(item => (
                            <InformationTooltip
                                type={'custom'}
                                description={<span>Min: {item.min} <br/> Max: {item.max}</span>}
                            >
                                <div key={item.color} style={{background: item.color}}/>
                            </InformationTooltip>
                        ))}
                        Max
                    </div>
                </div>

                <SpendStatistics
                    data={[]}
                />

                <ChartStatistics

                />

                <DaySwitches

                />

                <KeysKeywords

                />

                <PlacementsStatistics

                />
            </div>
        )
    }
}

export default Dayparting;
