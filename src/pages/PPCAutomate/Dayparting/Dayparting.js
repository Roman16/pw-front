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
import shortid from "shortid";
import moment from "moment";

// eslint-disable-next-line no-unused-vars
class Dayparting extends Component {
    handleReloadDate = () => {

    };

    render() {
        return (
            <div className='dayparting-page'>
                <div className='last-synced'>
                    {moment(new Date()).utc().format('HH:mm')}

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
                    <SpendStatistics
                    />

                    <ChartStatistics
                    />
                </div>

                <DaySwitches

                />

                {/*<div className="row">*/}
                {/*<KeysKeywords*/}

                {/*/>*/}

                <PlacementsStatistics

                />
                {/*</div>*/}
            </div>
        )
    }
}

export default Dayparting;
