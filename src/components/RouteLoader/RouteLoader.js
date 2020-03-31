import React from "react";
import logo from '../../assets/img/ProfitWhales-logo-dark.svg'
import './RouteLoader.less';
import {Spin} from "antd";

const RouteLoader = () => {

    return (
        <div className='route-loader'>
            {/*<img src={logo} alt=""/>*/}
            <Spin size={'large'}/>
        </div>
    )
};

export default RouteLoader;