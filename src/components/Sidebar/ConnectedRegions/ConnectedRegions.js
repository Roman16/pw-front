import React, {useState} from "react"
import usFlag from "../../../assets/img/icons/us-flag.png"

const ConnectedRegions = ({visible, collapsed, regions, onSet, activeMarketplace, activeRegion}) => {
    const [openedRegions, setOpenedRegions] = useState([])

    const openRegionHandler = (index) => {
        if(openedRegions.includes(index)) setOpenedRegions(openedRegions.filter(i => i !== index))
        else setOpenedRegions([...openedRegions, index])
    }

    return (<div
        className={`available-marketplaces ${visible ? 'visible' : ''} ${collapsed && visible ? 'with-sidebar' : ''}`}>
        <div className="form-group search">
            <input type="text" placeholder={'Search'}/>

            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M13 13.5L9.32215 9.82215M9.32215 9.82215C10.2043 8.93994 10.75 7.72119 10.75 6.375C10.75 3.68261 8.56739 1.5 5.875 1.5C3.18261 1.5 1 3.68261 1 6.375C1 9.06739 3.18261 11.25 5.875 11.25C7.22119 11.25 8.43994 10.7043 9.32215 9.82215Z"
                    stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>

        <h3>MY ACCOUNTS</h3>

        <ul className={'regions'}>
            {regions.map((region, index) =>
                <li className={`${openedRegions.includes(index) ? 'opened' : ''} ${activeRegion.id === region.id ? 'active' : ''}`}>
                    <div className="account-name" onClick={() => openRegionHandler(index)}>
                        {region.account_alias || region.region_type.replace(/_/g, ' ')}

                        <i className={'arrow'}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.5 7.5L6 4L2.5 7.5" stroke="white" stroke-width="1.8" stroke-linecap="round"
                                      stroke-linejoin="round"/>
                            </svg>
                        </i>
                    </div>

                    <ul className={'marketplaces'}>
                        {region.amazon_region_account_marketplaces.map(marketplace => (
                            <li onClick={() => onSet({marketplace, region})} className={activeMarketplace.id === marketplace.id && 'active'}>
                                <div className="status"/>
                                <img src={usFlag} alt=""/>
                                {marketplace.marketplace_id}
                            </li>
                        ))}
                    </ul>
                </li>
            )}
        </ul>

        {/*<h3>SHARED WITH ME</h3>*/}

        <button className="btn transparent">
            See all
        </button>
    </div>)

}

export default React.memo(ConnectedRegions)
