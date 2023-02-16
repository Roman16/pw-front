import React, {memo, useEffect, useState} from "react"
import './Header.less'
import {SVG} from "../../../../utils/icons"
import {allMenuItems} from "../Navigation/Navigation"
import {useDispatch, useSelector} from "react-redux"
import {history} from "../../../../utils/history"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {analyticsServices} from "../../../../services/analytics.services"
import queryString from "query-string"
import {Link} from "react-router-dom"
import AttributionWindow from "./AttributionWindow"
import {marketplaceTimezone} from "../../../../components/Sidebar/ConnectedRegions/CurrentMarketplace"
import {currencyName, currencySymbol} from "../../../../components/CurrencyCode/CurrencyCode"
import InformationTooltip from "../../../../components/Tooltip/Tooltip"
import {marketplaceIdValues} from "../../../../constans/amazonMarketplaceIdValues"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import {Checkbox} from "antd"
import {AdBlockWindow} from "./AdBlockWindow"

let newState = undefined

const Header = ({location}) => {
    const locationDescription = allMenuItems.find(item => item.url === location.pathname)
    const dispatch = useDispatch()
    const mainState = useSelector(state => state.analytics.mainState),
        marketplace = useSelector(state => state.user.activeAmazonMarketplace)

    const visibleNavigation = useSelector(state => state.analytics.visibleNavigation)

    const [stateName, setStateName] = useState(mainState.name),
        [visibleAdBlockWindow, setVisibleAdBlockWindow] = useState(false)

    const setMainState = (state, location, event) => {
        if (event.ctrlKey || event.metaKey) return

        newState = {
            state,
            location
        }
    }

    const getStateInformation = async () => {
        try {
            const idArr = Object.keys(mainState).filter(item => item !== 'name')
            const res = await Promise.all(idArr.map((key) => analyticsServices.fetchStateInformation(key, mainState[key])))

            let stateNameValue = {}

            idArr.forEach((key, index) => {
                stateNameValue[`${key.split('Id')[0]}Name`] = res[index].response.name
            })

            dispatch(analyticsActions.setStateDetails(res.reduce((total, item) => ({...total, ...item.response, ...stateNameValue}), {})))

            setStateName(stateNameValue)
        } catch (e) {
            console.log(e)
        }
    }

    async function detectAdBlock() {
        let adBlockEnabled = false

        const googleAdUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'

        try {
            await fetch(new Request(googleAdUrl)).catch(_ => adBlockEnabled = true)
        } catch (e) {
            adBlockEnabled = true
        } finally {
            if (adBlockEnabled) {
                setVisibleAdBlockWindow(true)
            }
        }
    }

    useEffect(() => {
        if (mainState.name) {
            setStateName(mainState.name)
        }

        if (mainState.campaignId || mainState.productId || mainState.portfolioId) {
            getStateInformation()
        }
    }, [mainState])

    useEffect(() => {
        if (newState) {
            dispatch(analyticsActions.setMainState(newState.state))
            dispatch(analyticsActions.setLocation(newState.location))

            newState = undefined
        }
    }, [history.location])

    useEffect(() => {
        detectAdBlock()

    }, [])

    const StepsRender = () => {
        if (mainState.adGroupId && mainState.campaignId) {
            return (<>
                <Link
                    to={'/analytics/campaigns'}
                    onClick={(e) => setMainState(undefined, 'campaigns', e)}>
                    Campaigns

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </Link>

                <Link
                    to={`/analytics/ad-groups?campaignId=${mainState.campaignId}`}
                    onClick={(e) => setMainState({
                        campaignId: mainState.campaignId,
                        name: {campaignName: stateName.campaignName}
                    }, 'ad-groups', e)}>
                    {stateName.campaignName}

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </Link>

                <li>
                    {stateName.adGroupName}

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </li>
            </>)
        } else if (mainState.campaignId) {
            return (
                <>
                    <Link
                        to={'/analytics/campaigns'}
                        onClick={(e) => setMainState(undefined, undefined, e)}>
                        Campaigns

                        <i>
                            <SVG id={'right-steps-arrow'}/>
                        </i>
                    </Link>

                    <li>
                        {stateName.campaignName}

                        <i>
                            <SVG id={'right-steps-arrow'}/>
                        </i>
                    </li>
                </>
            )
        } else if (mainState.productId) {
            const queryParams = queryString.parse(history.location.search)

            return (<>
                <Link
                    to={queryParams.isParent === 'true' ? '/analytics/products/parents' : '/analytics/products/regular'}
                    onClick={(e) => setMainState(undefined, undefined, e)}>
                    Products

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </Link>

                <li title={stateName.productName && stateName.productName.length > 30 && stateName.productName}>
                    {stateName.productName && stateName.productName.length > 30 ? `${stateName.productName.slice(0, 30)}...` : stateName.productName}

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </li>
            </>)
        } else if (mainState.portfolioId) {
            return (<>
                <Link
                    to={'/analytics/portfolios'}
                    onClick={(e) => setMainState(undefined, undefined, e)}>
                    Portfolios

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </Link>

                <li>
                    {stateName.portfolioName}

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </li>
            </>)
        } else {
            return (
                <li>
                    Account

                    <i>
                        <SVG id={'right-steps-arrow'}/>
                    </i>
                </li>
            )
        }
    }

    return (
        <section className={`analytics-header  ${visibleNavigation ? 'visible' : 'hidden'}`}>
            <Link to={'/analytics/products/regular'} className="title"
                  onClick={() => {
                      newState = {
                          state: undefined,
                          location: 'products'
                      }
                  }}>
                <SVG id={'analytics-icon'}/>
                <h1>Analytics</h1>
            </Link>


            <div className="nav">
                <ul className="steps">
                    <StepsRender/>
                </ul>

                <h4 className="current-location">
                    {locationDescription && (locationDescription.headerTitle || locationDescription.title)}
                </h4>
            </div>

            {(location.pathname !== '/analytics/negative-targetings' && location.pathname !== '/analytics/campaign-settings' && location.pathname !== '/analytics/portfolio-settings') &&
            <AttributionWindow/>}

            <div className="marketplace-info">
                <div className="tz">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8 1C4.13984 1 1 4.13981 1 8C1 11.8602 4.13981 15 8 15C11.8602 15 15 11.8602 15 8C15.0001 4.13984 11.8603 1 8 1ZM13.8549 7.44591H11.0289C10.9735 5.56197 10.5672 3.65963 9.88381 2.42216C12.0448 3.16088 13.6331 5.10023 13.8548 7.44591H13.8549ZM8 13.8918C7.26128 13.8918 6.19001 11.8233 6.07922 8.55409H9.93938C9.81016 11.8233 8.73892 13.8918 8.00003 13.8918H8ZM6.06079 7.44591C6.17158 4.17675 7.24284 2.10818 8 2.10818C8.75729 2.10818 9.80999 4.17675 9.92078 7.44591H6.06079ZM6.09763 2.42216C5.41429 3.65963 5.00796 5.54357 4.95255 7.44591H2.12669C2.34828 5.10023 3.95522 3.16095 6.09766 2.42216H6.09763ZM2.12666 8.55409H4.95251C5.00791 10.438 5.41426 12.3404 6.0976 13.5778C3.95522 12.8391 2.34826 10.8998 2.12662 8.55409H2.12666ZM9.88391 13.5778C10.5673 12.3404 10.9736 10.4564 11.029 8.55409H13.8549C13.6333 10.8998 12.0449 12.8391 9.88388 13.5778H9.88391Z"
                            fill="#6959AB" stroke="#6959AB" stroke-width="0.4"/>
                    </svg>

                    {marketplace?.timezone && <>{marketplace?.timezone} (GMT {marketplaceTimezone(marketplace.timezone)}) <InformationTooltip
                        position={'bottomLeft'}
                        description={`All date-based campaign management and reporting are currently using ${marketplaceIdValues[marketplace?.marketplace_id]?.countryName || ''} marketplace's local time zone: ${marketplace?.timezone} (GMT ${marketplaceTimezone(marketplace.timezone)})`}/></>}
                </div>

                <div className="currency">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8 15C11.8596 15 15 11.8596 15 8C15 4.14043 11.8596 1 8 1C4.14043 1 1 4.14043 1 8C1 11.8596 4.14043 15 8 15ZM8 1.875C11.3775 1.875 14.125 4.6225 14.125 8C14.125 11.3775 11.3775 14.125 8 14.125C4.6225 14.125 1.875 11.3775 1.875 8C1.875 4.6225 4.6225 1.875 8 1.875Z"
                            fill="#6959AB" stroke="#6959AB" stroke-width="0.5"/>
                        <path
                            d="M6.24992 9.74164C6.24992 9.50009 6.05385 9.30418 5.81246 9.30418C5.57091 9.30418 5.375 9.50025 5.375 9.74164C5.375 10.8232 6.32305 11.7218 7.5625 11.8963V12.3338C7.5625 12.5753 7.75857 12.7712 7.99996 12.7712C8.24151 12.7712 8.43742 12.5752 8.43742 12.3338V11.8963C9.67688 11.7218 10.6249 10.8232 10.6249 9.74164C10.6249 8.66012 9.67688 7.76152 8.43742 7.58695V4.97555C9.19 5.12218 9.75 5.63184 9.75 6.24172C9.75 6.48327 9.94607 6.67918 10.1875 6.67918C10.429 6.67918 10.6249 6.48311 10.6249 6.24172C10.6249 5.16016 9.67688 4.2616 8.43742 4.08703V3.58395C8.43742 3.3424 8.24135 3.14648 7.99996 3.14648C7.75841 3.14648 7.5625 3.34256 7.5625 3.58395V4.08703C6.32305 4.26159 5.375 5.1602 5.375 6.24172C5.375 7.32324 6.32305 8.22184 7.5625 8.39641V11.0078C6.80992 10.8612 6.24992 10.3515 6.24992 9.74164ZM9.75 9.74164C9.75 10.3515 9.19 10.8607 8.43742 11.0078V8.47609C9.19 8.62258 9.75 9.13223 9.75 9.74164ZM6.24992 6.24172C6.24992 5.63184 6.80992 5.12266 7.5625 4.97555V7.50727C6.80992 7.36124 6.24992 6.8516 6.24992 6.24172Z"
                            fill="#6959AB" stroke="#6959AB" stroke-width="0.5"/>
                    </svg>

                    {marketplace?.currency_code && <> {currencyName[marketplace?.currency_code]} ({marketplace?.currency_code} - {currencySymbol[marketplace?.currency_code]}) <InformationTooltip
                        position={'bottomLeft'}
                        description={`All monetary values are currently shown in ${marketplaceIdValues[marketplace?.marketplace_id]?.countryName || ''} marketplace's local currency: ${currencyName[marketplace?.currency_code]} (${marketplace?.currency_code} - ${currencySymbol[marketplace?.currency_code]})`}/></>}
                </div>
            </div>

            {/*<AdBlockWindow*/}
            {/*    visible={visibleAdBlockWindow}*/}

            {/*    setVisibleWindow={setVisibleAdBlockWindow}*/}
            {/*/>*/}
        </section>
    )
}

export default memo(Header)
