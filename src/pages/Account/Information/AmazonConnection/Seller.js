import React, {Fragment, useState} from 'react';

import whales from '../../../../assets/img/whales.svg';
import plus from '../../../../assets/img/icons/plus-white.svg';
import Amazon from './Amazon';
import Connectors from './Connectors';
import Soon from './Soon';


const Seller = () => {
    const [openedConnectBlock, handleOpenBlock] = useState(false);

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
                <button className="btn green-btn seller-btn" type="button" onClick={() => handleOpenBlock(true)}>
                    <img src={plus} alt="plus"/>
                    Add New Account
                </button>
            </div>

            {openedConnectBlock && <Amazon/>}

            <Connectors />

            {/*<Soon />*/}
        </Fragment>
    );
};

export default Seller;
