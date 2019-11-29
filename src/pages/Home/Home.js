import React from "react";
import './Home.less';
import SoftwareUpdates from "./SoftwareUpdates";
import Announcements from "./Announcements";

import image from '../../assets/img/roadmap.png';

const Home = () => {

    return (
        <div className="home-page">
            <div className="page-title">
                Welcome to ProfitWhales
            </div>

            <div className="row">
                <SoftwareUpdates/>

                <Announcements/>
            </div>

            <img src={image} alt="" className='bottom-image'/>
        </div>
    )
};

export default Home;