import React from "react"
import USFlag from '../../../assets/img/icons/us-flag.png'

const ConnectedAccounts = ({sellerName}) => {
    return (<ul>
        <li className={'active'}>
            <div className="card-header">
                {sellerName}

            </div>

            <div className="marketplace">
                US <img src={USFlag} alt=""/>
            </div>
        </li>

        <li className={'new'}>
            <PlusIcon/>
            <p>Add Account</p>
            <span>soon</span>
        </li>
    </ul>)
}

export const PlusIcon = () =>  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 2.5V10M10 17.5V10M10 10H17.5M10 10H2.5" stroke="#5B586F" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round"/>
</svg>

export default ConnectedAccounts