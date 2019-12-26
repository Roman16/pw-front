import React, {Component} from "react";
import './Dayparting.less';
import reloadIcon from '../../../assets/img/icons/reload-icon.svg';
import SpendStatistics from "./SpendStatistics";
import ChartStatistics from "./ChartStatistics/ChartStatistics";

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
                </div>

                <div className="row">
                    <SpendStatistics
                    data={[]}
                    />

                    <ChartStatistics />
                </div>
            </div>
        )
    }
}

export default Dayparting;
