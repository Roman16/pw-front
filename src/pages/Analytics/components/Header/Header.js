import React from "react";
import './Header.less';
import {SVG} from "../../../../utils/icons";

const Header = () => {

    return (
        <section className="analytics-header">
            <SVG id={'analytics-icon'}/>
            <h1> All Products</h1>
        </section>
    )
};

export default Header;