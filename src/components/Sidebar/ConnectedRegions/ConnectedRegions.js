import React, {useEffect, useState} from "react"
import usFlag from "../../../assets/img/icons/us-flag.png"
import {Link} from "react-router-dom"
import {marketplaceIdValues} from "../../../constans/amazonMarketplaceIdValues"

const ConnectedRegions = ({popupRef, visible, collapsed, regions, onSet, activeMarketplace, activeRegion, onChangeVisibleStatus}) => {
    const [openedRegions, setOpenedRegions] = useState([]),
        [localRegions, setLocalRegions] = useState([...regions])

    const openRegionHandler = (index) => {
        if (openedRegions.includes(index)) setOpenedRegions(openedRegions.filter(i => i !== index))
        else setOpenedRegions([...openedRegions, index])
    }

    const regionsSearchHandler = ({target: {value}}) => {
        value = value.trim().toLowerCase()

        setLocalRegions([...regions
            .filter(account => account.account_alias.toLowerCase().trim().includes(value.toLowerCase().replace(/\s+/g, '')) || account.seller_id.toLowerCase().includes(value.toLowerCase().replace(/\s+/g, '')))
        ])
    }

    useEffect(() => {
        setLocalRegions([...regions])
    }, [regions])

    return (<div
        ref={popupRef}
        className={`available-marketplaces ${visible ? 'visible' : ''} ${collapsed && visible ? 'with-sidebar' : ''}`}>
        <div className="form-group search">
            <input type="text" placeholder={'Search'} onChange={regionsSearchHandler}/>

            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13 13.5L9.32215 9.82215M9.32215 9.82215C10.2043 8.93994 10.75 7.72119 10.75 6.375C10.75 3.68261 8.56739 1.5 5.875 1.5C3.18261 1.5 1 3.68261 1 6.375C1 9.06739 3.18261 11.25 5.875 11.25C7.22119 11.25 8.43994 10.7043 9.32215 9.82215Z"
                    stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>

        <h3>MY ACCOUNTS</h3>

        {localRegions.length === 0 ? <h4>No accounts found</h4> : <ul className={'regions'}>
            {localRegions.map((region, index) =>
                <li className={`${openedRegions.includes(index) ? 'opened' : ''} ${activeRegion && activeRegion.id === region.id ? 'active' : ''}`}>
                    <div className="account-name" onClick={() => openRegionHandler(index)}>
                        {region.account_alias || region.region_type.replace(/_/g, ' ')}

                        {(region.mws_access_status !== 'CREDENTIALS_SUCCESS' || region.amazon_ads_api_access_status !== 'CREDENTIALS_SUCCESS') &&
                        <i className="error">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                      d="M10.8832 11.9978H1.11683C0.373449 11.9978 -0.110048 11.2155 0.222402 10.5506L5.10556 0.784232C5.47409 0.0471834 6.5259 0.0471829 6.89442 0.784231L11.7776 10.5506C12.11 11.2155 11.6265 11.9978 10.8832 11.9978ZM5.99999 3.63915C5.61529 3.63915 5.30343 3.951 5.30343 4.3357C5.30343 4.7204 5.61529 5.03226 5.99999 5.03226C6.38469 5.03226 6.69655 4.7204 6.69655 4.3357C6.69655 3.951 6.38469 3.63915 5.99999 3.63915ZM7.21897 10.6047C7.41132 10.6047 7.56725 10.4488 7.56725 10.2564C7.56725 10.0641 7.41132 9.90816 7.21897 9.90816C7.02662 9.90816 6.87069 9.75223 6.87069 9.55988V6.07709C6.87069 5.88475 6.71476 5.72882 6.52241 5.72882H5.47757H5.1293C4.93695 5.72882 4.78102 5.88475 4.78102 6.07709C4.78102 6.26944 4.93695 6.42537 5.1293 6.42537C5.32165 6.42537 5.47757 6.5813 5.47757 6.77365V9.55988C5.47757 9.75223 5.32165 9.90816 5.1293 9.90816C4.93695 9.90816 4.78102 10.0641 4.78102 10.2564C4.78102 10.4488 4.93695 10.6047 5.1293 10.6047H7.21897Z"
                                      fill="#FFAF52"/>
                            </svg>
                        </i>}

                        <i className={'arrow'}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.5 7.5L6 4L2.5 7.5" stroke="white" stroke-width="1.8" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                            </svg>
                        </i>
                    </div>

                    <ul className={'marketplaces'}>
                        {region.amazon_region_account_marketplaces.map(marketplace => (
                            <li onClick={() => onSet({marketplace, region})}
                                className={activeMarketplace && activeMarketplace.id === marketplace.id && 'active'}>
                                <div className="status"/>
                                <div className="flag">
                                    <img src={marketplaceIdValues[marketplace.marketplace_id].flag} alt=""/>
                                </div>
                                {marketplace.marketplace_id}
                            </li>
                        ))}
                    </ul>
                </li>
            )}
        </ul>}


        {/*<h3>SHARED WITH ME</h3>*/}

        <Link to={'/account/api-connections'} className="btn default" onClick={() => onChangeVisibleStatus(false)}>
            See all
        </Link>
    </div>)

}

export default React.memo(ConnectedRegions)
