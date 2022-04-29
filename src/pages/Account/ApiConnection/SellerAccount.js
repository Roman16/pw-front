import React from "react"
import USAFlag from '../../../assets/img/icons/us-flag.png'
import {Spin} from "antd"
import sectionIcon from '../../../assets/img/account/api-connection-icon.svg'

const SellerAccount = ({account, sellerName, onDisconnect, accountName, sellerId, deleteProcessing, onReconnect}) => {

    const Actions = ({account, type}) => {
        if (account[`amazon_${type}`].id) {
            if (account[`amazon_${type}`].is_connected && account[`amazon_${type}`].status !== 'FAILED') {
                return (
                    <button className={'btn white'}
                            onClick={() => onDisconnect({
                                type: type,
                                id: account[`amazon_${type}`].id
                            })}
                            disabled={deleteProcessing === type}
                    >
                        Disconnect
                        {deleteProcessing === type && <Spin size={'small'}/>}
                    </button>
                )
            } else {
                return (
                    <button className={'btn default'}
                            onClick={() => onReconnect(account, account[`amazon_${type}`].status === 'FAILED', type)}>
                        Reconnect
                    </button>
                )
            }
        } else {
            return (
                <button className={'btn default'} onClick={() => onReconnect(account)}>
                    Connect
                </button>
            )
        }
    }

    const MWSStatus = () => {
        if (account.amazon_mws.id && account.amazon_mws.is_connected === false) {
            return <span style={{color: '#FF5256'}}>Canceled</span>
        } else if (account.amazon_mws.is_connected && account.amazon_mws.id && account.amazon_mws.status === 'IN_PROGRESS') {
            return <span style={{color: '#f0b849'}}>Verifying</span>
        } else if (account.amazon_mws.id && account.amazon_mws.status === 'SUCCESS') {
            return <span style={{color: '#7FD3A1'}} className={'success'}>
                Success <br/>
                {sellerId && <span>Seller id: {sellerId}</span>}
            </span>
        } else if (account.amazon_mws.id && (account.amazon_mws.status === 'FAILED' || account.amazon_mws.status === 'UNAUTHORIZED' || account.amazon_mws.status === 'REFRESH_INVALID')) {
            return <span style={{color: '#FF5256'}}>Failed</span>
        } else {
            return ''
        }
    }

    const PPCStatus = () => {
        if (account.amazon_ppc.id && account.amazon_ppc.is_connected === false) {
            return <span style={{color: '#FF5256'}}>Canceled</span>
        } else if (account.amazon_ppc.is_connected && account.amazon_ppc.id && account.amazon_ppc.status === 'IN_PROGRESS') {
            return <span style={{color: '#f0b849'}}>Verifying</span>
        } else if (account.amazon_ppc.id && account.amazon_ppc.status === 'SUCCESS') {
            return <span style={{color: '#7FD3A1'}} className={'success'}>
                Success <br/>
                {account.amazon_ppc.account_email && <span>Email: {account.amazon_ppc.account_email}</span>}
            </span>
        } else if (account.amazon_ppc.id && (account.amazon_ppc.status === 'FAILED' || account.amazon_ppc.status === 'UNAUTHORIZED' || account.amazon_ppc.status === 'REFRESH_INVALID')) {
            return <span style={{color: '#FF5256'}}>Failed</span>
        } else {
            return ''
        }
    }

    return (
        <section className={`seller-account`}>
            <div className="container">
                <img src={sectionIcon} alt=""/>

                <div className="col">
                    <div className="description-row">
                        <img src={sectionIcon} alt="" className={'icon'}/>

                        <div className="section-description">
                            <h3>{accountName ? 'Account alias' : 'Seller id'}: <span>{accountName || sellerId}<img src={USAFlag} alt=""/></span></h3>
                            <p>Here you can see current status of MWS Authorization and Advertising API. </p>
                        </div>
                    </div>

                    <div className="row">
                        <h4>MWS <br/> Authorization</h4>

                        <div className={`account-status`}>
                            <MWSStatus/>
                        </div>

                        <div className="account-action">
                            <Actions
                                account={account}
                                type={'mws'}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <h4>Advertising <br/> API</h4>

                        <div className={`account-status`}>
                            <PPCStatus/>
                        </div>

                        <div className="account-action">
                            <Actions
                                account={account}
                                type={'ppc'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


const SectionIcon = () => <i>
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none"
         xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_21013:65709" maskUnits="userSpaceOnUse" x="0" y="0" width="120" height="120">
            <circle cx="60" cy="60" r="60" fill="#F3F3F3"/>
        </mask>
        <g>
            <circle cx="60" cy="60" r="60" fill="#F3F3F3"/>
            <rect x="13" y="53" width="71" height="46" rx="4" fill="#A9ADBB"/>
            <path
                d="M13 57C13 54.7909 14.7909 53 17 53H70C72.2091 53 74 54.7909 74 57V95C74 97.2091 72.2091 99 70 99H17C14.7909 99 13 97.2091 13 95V57Z"
                fill="#BABDC8"/>
            <rect x="41" y="98" width="15" height="14" fill="#DEDFE4"/>
            <rect x="45" y="98" width="11" height="14" fill="#CACCD6"/>
            <rect x="34" y="110" width="29" height="4" rx="2" fill="white"/>
            <path d="M17 99H80C82.2091 99 84 97.2091 84 95V90H13V95C13 97.2091 14.7909 99 17 99Z" fill="#EAEAEB"/>
            <path d="M17 99H70C72.2091 99 74 97.2091 74 95V90H13V95C13 97.2091 14.7909 99 17 99Z" fill="white"/>
            <path d="M30 27H41M60 27H41M41 27V38C41 39.1046 40.1046 40 39 40H16" stroke="#E4E4E4" stroke-width="2"
                  stroke-linecap="round"/>
            <path d="M70.5 29.5H95M107 88V31.5C107 30.3954 106.105 29.5 105 29.5H95M95 29.5V58" stroke="#E4E4E4"
                  stroke-width="2" stroke-linecap="round"/>
            <path d="M71.5 24H96.5C97.6046 24 98.5 23.1046 98.5 22V11.5" stroke="#E4E4E4" stroke-width="2"
                  stroke-linecap="round"/>
            <path d="M64.5 32V41.5C64.5 42.6046 63.6046 43.5 62.5 43.5H51C49.8954 43.5 49 44.3954 49 45.5V72"
                  stroke="#E4E4E4" stroke-width="2" stroke-linecap="round"/>
            <path d="M64.5 21.5V12C64.5 10.8954 63.6046 10 62.5 10H20" stroke="#E4E4E4" stroke-width="2"
                  stroke-linecap="round"/>
            <circle cx="30" cy="27" r="4" fill="white"/>
            <circle cx="49" cy="72" r="4" fill="white"/>
            <circle cx="16" cy="40" r="4" fill="#A9ADBB"/>
            <circle cx="16" cy="20" r="4" fill="#A9ADBB"/>
            <circle cx="95" cy="58" r="4" fill="#A9ADBB"/>
            <circle cx="107" cy="89" r="4" fill="white"/>
            <path
                d="M57 21C57 19.8954 57.8954 19 59 19H70C71.1046 19 72 19.8954 72 21V32C72 33.1046 71.1046 34 70 34H59C57.8954 34 57 33.1046 57 32V21Z"
                fill="#A9ADBB"/>
        </g>
        <path d="M64.5 19V12C64.5 10.8954 63.6046 10 62.5 10H20H18C16.8954 10 16 10.8954 16 12V20.4348" stroke="#E4E4E4"
              stroke-width="2"/>
        <circle cx="16" cy="20" r="4" fill="#A9ADBB"/>
    </svg>
</i>


export default SellerAccount