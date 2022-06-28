import React, {useState} from "react"
import {SVG} from "../../../utils/icons"
import {userService} from "../../../services/user.services"
import {marketplaceIdValues} from "../../../constans/amazonMarketplaceIdValues"
import {useDispatch} from "react-redux"
import {userActions} from "../../../actions/user.actions"
import usFlag from '../../../assets/img/icons/us-flag.png'

const CurrentMarketplace = ({user, onToggle, active}) => {
    return (<>
        <div className={`current-marketplace ${active ? 'active' : ''}`} onClick={onToggle}>
            <div className="country-active__title">
                {/*<SVG id={`${marketplaceIdValues[user.default_accounts.amazon_ppc.marketplace_id]['countryCode'].toLowerCase()}-flag`}/>*/}
                {/*<SVG id={`${marketplaceIdValues['ATVPDKIKX0DER']['countryCode'].toLowerCase()}-flag`}/>*/}
                <img src={usFlag} alt=""/>

                {/*<h5>{marketplaceIdValues[user.default_accounts.amazon_ppc.marketplace_id]['countryCode']}</h5>*/}
                <h5>{marketplaceIdValues['ATVPDKIKX0DER']['countryCode']}</h5>
            </div>

            {user.default_accounts && user.default_accounts.amazon_mws && user.default_accounts.amazon_mws.seller_id
                ? <div className="country-active__description">
                    {user.default_accounts.amazon_mws.seller_id}
                </div>
                : ""}

        </div>
    </>)

}


export default React.memo(CurrentMarketplace)
