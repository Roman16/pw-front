import React, {useState} from "react"
import {SVG} from "../../../utils/icons"

export const Accounts = ({accounts, selectedAccount, activeRegion, activeMarketplace, onSelect, onSetMarketplace}) => {
    const [openedAccount, setOpenedAccount] = useState()

    const openRegionHandler = (index) => (e) => {
        e.stopPropagation()
        setOpenedAccount(prevState => prevState === index ? undefined : index)
    }

    return (
        <ul className="accounts-list">
            {accounts.map(({account_alias, seller_id, amazon_region_account_marketplaces, id, mws_access_status, amazon_ads_api_access_status, is_amazon_ads_api_attached, is_mws_attached}, index) => (
                <li className={selectedAccount === index && 'active'}>
                    <div className="account-name" onClick={() => onSelect(index)}>
                        <h3>
                            {account_alias || seller_id}
                            {activeRegion.id === id && <span>(Active)</span>}
                        </h3>

                        {(mws_access_status !== 'CREDENTIALS_SUCCESS' || amazon_ads_api_access_status !== 'CREDENTIALS_SUCCESS' || is_amazon_ads_api_attached === false || is_mws_attached === false) &&
                        <div className={'error'}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M18.9766 16.4552C19.3469 17.1218 18.8649 17.9409 18.1024 17.9409H1.50144C0.738954 17.9409 0.256986 17.1218 0.627281 16.4552L8.92777 1.51436C9.30877 0.828548 10.2951 0.828547 10.6761 1.51436L18.9766 16.4552ZM9.80192 5.19087C10.2161 5.19087 10.5519 5.52666 10.5519 5.94087V11.9409C10.5519 12.3551 10.2161 12.6909 9.80192 12.6909C9.38771 12.6909 9.05192 12.3551 9.05192 11.9409V5.94087C9.05192 5.52666 9.38771 5.19087 9.80192 5.19087ZM8.80192 14.9409C8.80192 14.3886 9.24964 13.9409 9.80192 13.9409C10.3542 13.9409 10.8019 14.3886 10.8019 14.9409C10.8019 15.4932 10.3542 15.9409 9.80192 15.9409C9.24964 15.9409 8.80192 15.4932 8.80192 14.9409Z"
                                          fill="#FFAF52"/>
                                </g>
                            </svg>
                        </div>}

                        <button className={`btn icon arrow ${openedAccount === index ? 'opened' : ''}`}
                                onClick={openRegionHandler(index)}>
                            <SVG id={'slider-arrow'}/>
                        </button>
                    </div>

                    <ul className={`marketplace-list ${openedAccount === index ? 'opened' : ''}`}>
                        {amazon_region_account_marketplaces.map(({marketplace_id}, mIndex) => (
                            <li>
                                <div className="flag">

                                </div>

                                <h4>{marketplace_id}</h4>

                                {activeMarketplace.marketplace_id === marketplace_id ?
                                    <div className="active-marketplace">
                                        Currently active
                                    </div> : <div className="switch" onClick={() => onSetMarketplace({
                                        marketplace: amazon_region_account_marketplaces[mIndex],
                                        region: accounts[index]
                                    })}>
                                        Switch to
                                    </div>}

                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    )
}