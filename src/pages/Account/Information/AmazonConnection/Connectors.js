import React, {useState, useEffect} from 'react';
import Amazon from './Amazon';
import {SVG} from "../../../../utils/icons";

const Connectors = ({amazonTokens}) => {
    const [openedDopInformation, targetDopInformation] = useState(false);

    return (
        <div className="connectors-box">
            <div className='short-connect-information'>
                {amazonTokens && <div className="column">
                    <SVG id='selected-icon'/>
                </div>}

                <div className="column">
                    <div className="title">
                        Amazon Seller Central
                        Connection {amazonTokens && `- SELLER ID: ${amazonTokens.amazon_mws.seller_id || 'not connected'}`}
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
                    {amazonTokens ?
                        <button
                            className="check-btn"
                            type="button"
                            onClick={() => targetDopInformation(!openedDopInformation)}
                        >
                            <span className={openedDopInformation ? 'opened-block' : ''}>
                                <SVG id='down'/>
                            </span>
                        </button>
                        :
                        <button className="token-btn" type="button" onClick={() => targetDopInformation(true)}>
                            Add token
                        </button>
                    }


                </div>
            </div>

            {openedDopInformation && <Amazon
                amazonTokens={amazonTokens}
            />}
        </div>
    );
};

export default  React.memo(Connectors);
