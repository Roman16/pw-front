import React from "react"
import USFlag from '../../../assets/img/icons/us-flag.png'
import {history} from "../../../utils/history"

const ConnectedAccounts = ({sellerName, accountLinks}) => {
    return (<ul>
        {(accountLinks[0].amazon_mws.is_connected === true || accountLinks[0].amazon_ppc.is_connected === true) &&
        <li className={'active'}>
            <div className="card-header">
                <span title={sellerName}>{sellerName}</span>

                {accountLinks.some(i => i.amazon_mws.is_connected === false || i.amazon_ppc.is_connected === false) &&
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M15.0112 16.0002H1.9914C1.24802 16.0002 0.764525 15.2179 1.09698 14.553L7.60686 1.53326C7.97538 0.796207 9.02719 0.796206 9.39571 1.53326L15.9056 14.553C16.238 15.2179 15.7545 16.0002 15.0112 16.0002ZM8.50128 5.55013C8.02033 5.55013 7.63043 5.94002 7.63043 6.42097C7.63043 6.90193 8.02033 7.29182 8.50128 7.29182C8.98224 7.29182 9.37213 6.90193 9.37213 6.42097C9.37213 5.94002 8.98224 5.55013 8.50128 5.55013ZM10.0253 14.2586C10.2657 14.2586 10.4607 14.0637 10.4607 13.8232C10.4607 13.5827 10.2657 13.3878 10.0253 13.3878C9.78479 13.3878 9.58985 13.1928 9.58985 12.9523V8.59809C9.58985 8.35762 9.3949 8.16267 9.15442 8.16267H7.84815H7.41272C7.17225 8.16267 6.9773 8.35762 6.9773 8.59809C6.9773 8.83857 7.17225 9.03352 7.41272 9.03352C7.6532 9.03352 7.84815 9.22846 7.84815 9.46894V12.9523C7.84815 13.1928 7.6532 13.3878 7.41272 13.3878C7.17225 13.3878 6.9773 13.5827 6.9773 13.8232C6.9773 14.0637 7.17225 14.2586 7.41272 14.2586H10.0253Z"
                          fill="#FFAF52"/>
                </svg>}
            </div>

            <div className="marketplace">
                US <img src={USFlag} alt=""/>
            </div>
        </li>}

        <li className={`new ${(accountLinks[0].amazon_mws.is_connected === false && accountLinks[0].amazon_ppc.is_connected === false) ? 'enabled' : 'disabled'}`}
            onClick={() => history.push('/connect-amazon-account')}>
            <PlusIcon/>
            <p>Add Account</p>
            <span>soon</span>
        </li>
    </ul>)
}

export const PlusIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2.5V10M10 17.5V10M10 10H17.5M10 10H2.5" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round"/>
</svg>

export default ConnectedAccounts