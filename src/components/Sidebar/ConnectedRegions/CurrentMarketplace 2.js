import React from "react"
import {marketplaceIdValues} from "../../../constans/amazonMarketplaceIdValues"
import moment from 'moment'
import {currencyName, currencySymbol} from "../../CurrencyCode/CurrencyCode"
import InformationTooltip from "../../Tooltip/Tooltip"


const CurrentMarketplace = ({activeMarketplace, onToggle, active}) => {
    const marketplaceDetails = activeMarketplace ? marketplaceIdValues[activeMarketplace.marketplace_id] : undefined

    return (<>
        {marketplaceDetails && <div className={`current-marketplace ${active ? 'active' : ''}`} onClick={onToggle}>
            {activeMarketplace.marketplace_id && <div className="marketplace-id">
                {activeMarketplace.marketplace_id}
            </div>}

            <div className="country">
                <div className="flag">
                    <img src={marketplaceDetails.flag} alt=""/>
                </div>

                <div className={'name'}>{marketplaceDetails.country}</div>
            </div>

            <div className={'code'}>{marketplaceDetails.countryCode}</div>
        </div>}

        {activeMarketplace && (activeMarketplace.timezone || activeMarketplace.currency_code) &&
        <div className="current-marketplace-details">
            {activeMarketplace.timezone && <InformationTooltip
                type={'custom'}
                position={'bottomRight'}
                className="timezone"
                description={`All date-based campaign management and reporting are currently using ${marketplaceDetails.countryName} marketplace\'s local time zone: ${activeMarketplace?.timezone} (GMT ${marketplaceTimezone(activeMarketplace.timezone)})`}
            >
                <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.3"
                              d="M8 1C4.13984 1 1 4.13981 1 8C1 11.8602 4.13981 15 8 15C11.8602 15 15 11.8602 15 8C15.0001 4.13984 11.8603 1 8 1ZM13.8549 7.44591H11.0289C10.9735 5.56197 10.5672 3.65963 9.88381 2.42216C12.0448 3.16088 13.6331 5.10023 13.8548 7.44591H13.8549ZM8 13.8918C7.26128 13.8918 6.19001 11.8233 6.07922 8.55409H9.93938C9.81016 11.8233 8.73892 13.8918 8.00003 13.8918H8ZM6.06079 7.44591C6.17158 4.17675 7.24284 2.10818 8 2.10818C8.75729 2.10818 9.80999 4.17675 9.92078 7.44591H6.06079ZM6.09763 2.42216C5.41429 3.65963 5.00796 5.54357 4.95255 7.44591H2.12669C2.34828 5.10023 3.95522 3.16095 6.09766 2.42216H6.09763ZM2.12666 8.55409H4.95251C5.00791 10.438 5.41426 12.3404 6.0976 13.5778C3.95522 12.8391 2.34826 10.8998 2.12662 8.55409H2.12666ZM9.88391 13.5778C10.5673 12.3404 10.9736 10.4564 11.029 8.55409H13.8549C13.6333 10.8998 12.0449 12.8391 9.88388 13.5778H9.88391Z"
                              fill="white" stroke="white" stroke-width="0.4"/>
                    </svg>

                    <p>GMT{marketplaceTimezone(activeMarketplace.timezone)}</p>
                </>
            </InformationTooltip>}

            {activeMarketplace.currency_code &&
            <InformationTooltip type={'custom'} position={'bottomRight'} className={'currency'} description={`All monetary values are currently shown in ${marketplaceDetails.countryName} marketplace's local currency: ${currencyName[activeMarketplace?.currency_code]} (${activeMarketplace?.currency_code} - ${currencySymbol[activeMarketplace?.currency_code]})`}>
                <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.3">
                            <path
                                d="M8 15C11.8596 15 15 11.8596 15 8C15 4.14043 11.8596 1 8 1C4.14043 1 1 4.14043 1 8C1 11.8596 4.14043 15 8 15ZM8 1.875C11.3775 1.875 14.125 4.6225 14.125 8C14.125 11.3775 11.3775 14.125 8 14.125C4.6225 14.125 1.875 11.3775 1.875 8C1.875 4.6225 4.6225 1.875 8 1.875Z"
                                fill="white" stroke="white" stroke-width="0.5"/>
                            <path
                                d="M6.24998 9.74164C6.24998 9.50009 6.05391 9.30418 5.81252 9.30418C5.57098 9.30418 5.37506 9.50025 5.37506 9.74164C5.37506 10.8232 6.32311 11.7218 7.56256 11.8963V12.3338C7.56256 12.5753 7.75864 12.7712 8.00002 12.7712C8.24157 12.7712 8.43748 12.5752 8.43748 12.3338V11.8963C9.67694 11.7218 10.625 10.8232 10.625 9.74164C10.625 8.66012 9.67694 7.76152 8.43748 7.58695V4.97555C9.19006 5.12218 9.75006 5.63184 9.75006 6.24172C9.75006 6.48327 9.94614 6.67918 10.1875 6.67918C10.4291 6.67918 10.625 6.48311 10.625 6.24172C10.625 5.16016 9.67694 4.2616 8.43748 4.08703V3.58395C8.43748 3.3424 8.24141 3.14648 8.00002 3.14648C7.75848 3.14648 7.56256 3.34256 7.56256 3.58395V4.08703C6.32311 4.26159 5.37506 5.1602 5.37506 6.24172C5.37506 7.32324 6.32311 8.22184 7.56256 8.39641V11.0078C6.80998 10.8612 6.24998 10.3515 6.24998 9.74164ZM9.75006 9.74164C9.75006 10.3515 9.19006 10.8607 8.43748 11.0078V8.47609C9.19006 8.62258 9.75006 9.13223 9.75006 9.74164ZM6.24998 6.24172C6.24998 5.63184 6.80998 5.12266 7.56256 4.97555V7.50727C6.80998 7.36124 6.24998 6.8516 6.24998 6.24172Z"
                                fill="white" stroke="white" stroke-width="0.5"/>
                        </g>
                    </svg>

                    <p>{activeMarketplace.currency_code}
                        <span>- {currencySymbol[activeMarketplace.currency_code]}</span></p>
                </>
            </InformationTooltip>}
        </div>}
    </>)
}

export const marketplaceTimezone = (timezone) => timezone ? moment().tz(timezone).utcOffset() / 60 : '-0'


export default React.memo(CurrentMarketplace)
