import React, {useState} from "react"
import {SVG} from "../../utils/icons"
import InformationTooltip from "../Tooltip/Tooltip"
import {userService} from "../../services/user.services"
import {marketplaceIdValues} from "../../constans/amazonMarketplaceIdValues"
import {useDispatch} from "react-redux"
import {userActions} from "../../actions/user.actions"
import {Spin} from "antd"

const ToggleMarketplace = ({user}) => {
    // const [activeMarketplace, setActiveMarketplace] = useState(marketplaceIdValues[user.default_accounts.amazon_ppc.marketplace_id]),
    const [activeMarketplace, setActiveMarketplace] = useState(marketplaceIdValues['ATVPDKIKX0DER']),
        [processing, setProcessing] = useState(true)

    const dispatch = useDispatch()

    const toggleMarketplaceHandler = async (marketplace) => {
        setProcessing(true)

        try {
            setActiveMarketplace({
                ...activeMarketplace,
                countryCode: marketplace
            })
            const res = await userService.toggleMarketplace(user.account_links[0].amazon_ppc.id)

            dispatch(userActions.setInformation(res))
        } catch (e) {
            console.log(e)
        }
        setProcessing(false)
    }

    return (<div className="country-active">
        <div className="country-active__title">
            {/*<SVG id={`${marketplaceIdValues[user.default_accounts.amazon_ppc.marketplace_id]['countryCode'].toLowerCase()}-flag`}/>*/}
            <SVG id={`${marketplaceIdValues['ATVPDKIKX0DER']['countryCode'].toLowerCase()}-flag`}/>

            {/*<h5>{marketplaceIdValues[user.default_accounts.amazon_ppc.marketplace_id]['countryCode']}</h5>*/}
            <h5>{marketplaceIdValues['ATVPDKIKX0DER']['countryCode']}</h5>
        </div>

        {user.default_accounts && user.default_accounts.amazon_mws && user.default_accounts.amazon_mws.seller_id
            ? <div className="country-active__description">
                {user.default_accounts.amazon_mws.seller_id}
            </div>
            : ""}
    </div>)

    // return (<InformationTooltip
    //     type={'custom'}
    //     description={<>
    //         <h3>Choose marketplace</h3>
    //
    //         <ul>
    //             <li
    //                 onClick={() => toggleMarketplaceHandler('US')}
    //                 className={activeMarketplace.countryCode === 'US' ? 'active' : ''}
    //             >
    //                 <SVG id='us-flag'/> US
    //             </li>
    //             <li
    //                 onClick={() => toggleMarketplaceHandler('CA')}
    //                 className={activeMarketplace.countryCode === 'CA' ? 'active' : ''}
    //             >
    //                 <SVG id='ca-flag'/> CA
    //             </li>
    //         </ul>
    //     </>}
    //     position={'rightTop'}
    //     className={'marketplace-toggle-button'}
    //     overlayClassName={'toggle-marketplace-window'}
    // >
    //     <div className="country-active">
    //         <div className="country-active__title">
    //             <SVG
    //                 id={`${marketplaceIdValues[user.default_accounts.amazon_ppc.marketplace_id]['countryCode'].toLowerCase()}-flag`}/>
    //
    //             <h5>{marketplaceIdValues[user.default_accounts.amazon_ppc.marketplace_id]['countryCode']}</h5>
    //         </div>
    //
    //         {user.default_accounts && user.default_accounts.amazon_mws && user.default_accounts.amazon_mws.seller_id
    //             ? <div className="country-active__description">
    //                 {user.default_accounts.amazon_mws.seller_id}
    //             </div>
    //             : ""}
    //     </div>
    // </InformationTooltip>)
}

export default React.memo(ToggleMarketplace)
