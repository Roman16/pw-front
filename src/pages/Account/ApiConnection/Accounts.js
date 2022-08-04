import React, {useState} from "react"
import {SVG} from "../../../utils/icons"
import {marketplaceIdValues} from "../../../constans/amazonMarketplaceIdValues"
import InformationTooltip from "../../../components/Tooltip/Tooltip"

export const Accounts = ({accounts, selectedAccount, activeRegion, activeMarketplace, onSelect, onSetMarketplace}) => {
    const [openedAccount, setOpenedAccount] = useState()

    const openRegionHandler = (index) => (e) => {
        e.stopPropagation()
        setOpenedAccount(prevState => prevState === index ? undefined : index)
    }

    return (
        <ul className="accounts-list">
            {accounts.map(({account_alias, seller_id, amazon_region_account_marketplaces, id, mws_access_status, amazon_ads_api_access_status, is_amazon_ads_api_attached, is_mws_attached}, index) => (
                <li className={selectedAccount?.id === id && 'active'}>
                    <div className="account-name" onClick={() => onSelect(accounts[index])}>
                        <h3>
                            {account_alias || seller_id}
                            {activeRegion.id === id && <span>(Active)</span>}
                        </h3>

                        {(mws_access_status !== 'CREDENTIALS_SUCCESS' || amazon_ads_api_access_status !== 'CREDENTIALS_SUCCESS' || is_amazon_ads_api_attached === false || is_mws_attached === false) &&
                       <InformationTooltip type={'custom'}>
                           <div className={'error'}>
                               <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                   <g>
                                       <path fill-rule="evenodd" clip-rule="evenodd"
                                             d="M18.9766 16.4552C19.3469 17.1218 18.8649 17.9409 18.1024 17.9409H1.50144C0.738954 17.9409 0.256986 17.1218 0.627281 16.4552L8.92777 1.51436C9.30877 0.828548 10.2951 0.828547 10.6761 1.51436L18.9766 16.4552ZM9.80192 5.19087C10.2161 5.19087 10.5519 5.52666 10.5519 5.94087V11.9409C10.5519 12.3551 10.2161 12.6909 9.80192 12.6909C9.38771 12.6909 9.05192 12.3551 9.05192 11.9409V5.94087C9.05192 5.52666 9.38771 5.19087 9.80192 5.19087ZM8.80192 14.9409C8.80192 14.3886 9.24964 13.9409 9.80192 13.9409C10.3542 13.9409 10.8019 14.3886 10.8019 14.9409C10.8019 15.4932 10.3542 15.9409 9.80192 15.9409C9.24964 15.9409 8.80192 15.4932 8.80192 14.9409Z"
                                             fill="#FFAF52"/>
                                   </g>
                               </svg>
                           </div>
                       </InformationTooltip>}

                        <button className={`btn icon arrow ${openedAccount === index ? 'opened' : ''}`}
                                onClick={openRegionHandler(index)}>
                            <SVG id={'slider-arrow'}/>
                        </button>
                    </div>

                    <ul className={`marketplace-list ${openedAccount === index ? 'opened' : ''}`}>
                        {amazon_region_account_marketplaces.map(({marketplace_id, profile_id}, mIndex) => (
                            <li>
                                <div className="flag">
                                    <img src={marketplaceIdValues[marketplace_id].flag} alt=""/>
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

                                {!profile_id && <InformationTooltip
                                    type={'custom'}
                                    description={'Lorem LoremLoremLoremLorem Lorem'}
                                >
                                    <i className="error">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                  d="M10.8832 11.9978H1.11683C0.373449 11.9978 -0.110048 11.2155 0.222402 10.5506L5.10556 0.784232C5.47409 0.0471834 6.5259 0.0471829 6.89442 0.784231L11.7776 10.5506C12.11 11.2155 11.6265 11.9978 10.8832 11.9978ZM5.99999 3.63915C5.61529 3.63915 5.30343 3.951 5.30343 4.3357C5.30343 4.7204 5.61529 5.03226 5.99999 5.03226C6.38469 5.03226 6.69655 4.7204 6.69655 4.3357C6.69655 3.951 6.38469 3.63915 5.99999 3.63915ZM7.21897 10.6047C7.41132 10.6047 7.56725 10.4488 7.56725 10.2564C7.56725 10.0641 7.41132 9.90816 7.21897 9.90816C7.02662 9.90816 6.87069 9.75223 6.87069 9.55988V6.07709C6.87069 5.88475 6.71476 5.72882 6.52241 5.72882H5.47757H5.1293C4.93695 5.72882 4.78102 5.88475 4.78102 6.07709C4.78102 6.26944 4.93695 6.42537 5.1293 6.42537C5.32165 6.42537 5.47757 6.5813 5.47757 6.77365V9.55988C5.47757 9.75223 5.32165 9.90816 5.1293 9.90816C4.93695 9.90816 4.78102 10.0641 4.78102 10.2564C4.78102 10.4488 4.93695 10.6047 5.1293 10.6047H7.21897Z"
                                                  fill="#FFAF52"/>
                                        </svg>
                                    </i>
                                </InformationTooltip>}
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    )
}