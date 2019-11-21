import React, {Fragment, useState} from 'react';
import {useSelector} from "react-redux";

import whales from '../../../../assets/img/whales.svg';
import plus from '../../../../assets/img/icons/plus-white.svg';
import Amazon from './Amazon';
import Connectors from './Connectors';

const Seller = () => {
    const [openedNewConnectorBlock, handleOpenBlock] = useState(false);

    const {amazonAccounts, ppcConnected, mwsConnected} = useSelector(state => ({
        amazonAccounts: [state.user.default_accounts],
        ppcConnected: state.user.account_links && state.user.account_links.amazon_ppc.is_connected,
        mwsConnected: state.user.account_links && state.user.account_links.amazon_mws.is_connected
    }));

    return (
        <Fragment>
            <div className="seller-box">
                <img src={whales} alt="whales"/>
                <div className="seller-wrap">
                    <h2 className="seller-title">Seller Central Connections</h2>
                    <p className="seller-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.
                    </p>
                </div>

                {(!ppcConnected || !mwsConnected) &&
                <button className="btn green-btn seller-btn" type="button" onClick={() => handleOpenBlock(true)}>
                    <img src={plus} alt="plus"/>
                    Add New Account
                </button>}
            </div>

            {openedNewConnectorBlock && <Connectors/>}

            {(ppcConnected || mwsConnected) && amazonAccounts.map((item, index) => (
                <Connectors
                    key={`amazon_${index}`}
                    amazonTokens={item}
                />
            ))}

        </Fragment>
    );
};

export default Seller;
