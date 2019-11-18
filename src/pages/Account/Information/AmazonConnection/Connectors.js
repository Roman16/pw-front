import React from 'react';
import {useSelector} from 'react-redux';
import {Checkbox} from "antd";
import selectedIcon from '../../../../assets/img/icons/selected-icon.svg';

const Connectors = () => {
    // const {sellerId} = useSelector(state => ({
    //     sellerId: state.user.default_accounts.amazon_mws.seller_id || ''
    // }));

    return (
        <div className="connectors-box">
            <img src={selectedIcon} alt=""/>

            <div className="column">
                <div className="title">
                    Amazon MWS (Seller Central) - North America (US/CA/MX/BR)
                </div>

                <a
                    className="show-link"
                    href="https://www.youtube.com/watch?time_continue=2&v=SRhhgDVB0jk&feature=emb_logo"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Show me what to do
                </a>
            </div>

            <div className="connectors-buttons">
                <button className="btn-token" type="button">
                    Add token
                </button>
            </div>
        </div>
    );
};

export default Connectors;
