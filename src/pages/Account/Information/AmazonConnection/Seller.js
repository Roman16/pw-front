import React, {Fragment, useState, useEffect} from 'react';
import {useSelector} from "react-redux";

import whales from '../../../../assets/img/seller-central-image.svg';
import Connectors from './Connectors';
import {SVG} from "../../../../utils/icons";

const Seller = () => {
    const [openedNewConnectorBlock, handleOpenBlock] = useState(false);

    const {amazonAccounts, ppcConnected, mwsConnected} = useSelector(state => ({
        amazonAccounts: [state.user.default_accounts],
        ppcConnected: state.user.account_links.length > 0 && state.user.account_links[0].amazon_ppc.is_connected,
        mwsConnected: state.user.account_links.length > 0 && state.user.account_links[0].amazon_mws.is_connected
    }));

    useEffect(() => {
        if(mwsConnected) {
            handleOpenBlock(false)
        }

    }, [mwsConnected])

    return (
        <Fragment>
            <div className="seller-box">
                <div className="whales-image">
                    <img src={whales} alt="whales"/>
                </div>

                <div className="seller-wrap">
                    <h2 className="seller-title">Seller Central Account Connection</h2>
                    <p className="seller-text">
                        Connect your Amazon account to use our marketing automation software.
                    </p>
                </div>

                {(!ppcConnected && !mwsConnected) &&
                <button className="btn green-btn seller-btn" type="button" onClick={() => handleOpenBlock(true)}>
                    <SVG id='plus-white'/>
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
