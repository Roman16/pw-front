import React, {memo} from "react";
import './Header.less';
import {SVG} from "../../../../utils/icons";
import {analyticsNavigation} from "../Navigation/Navigation";
import queryString from 'query-string';

const Header = ({location}) => {
    const queryParams = queryString.parse(location.search);

    const StepsRender = () => {
        if (queryParams.campaign_id) {
            return (
                <>
                    <li>
                        Campaigns

                        <i>
                            <SVG id={'right-steps-arrow'}/>
                        </i>
                    </li>

                    <li>
                        {queryParams.campaign_id}

                        <i>
                            <SVG id={'right-steps-arrow'}/>
                        </i>
                    </li>
                </>
            )
        } else {
            return (
                <li>
                    Account

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </li>
            )
        }
    };

    return (
        <section className="analytics-header">
            <div className="title">
                <SVG id={'analytics-icon'}/>
                <h1>All Products</h1>
            </div>


            <div className="nav">
                <ul className="steps">
                    <StepsRender/>
                </ul>

                <h4 className="current-location">
                    {analyticsNavigation.find(item => item.url === location.pathname).title}
                </h4>
            </div>
        </section>
    )
};

export default memo(Header);