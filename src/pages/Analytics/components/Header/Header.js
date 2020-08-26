import React, {memo} from "react";
import './Header.less';
import {SVG} from "../../../../utils/icons";

const Header = () => {

    return (
        <section className="analytics-header">
            <div className="title">
                <SVG id={'analytics-icon'}/>
                <h1>All Products</h1>
            </div>


            <div className="nav">
                Account
            </div>
        </section>
    )
};

export default memo(Header);