import React from "react"
import USAFlag from '../../../assets/img/icons/us-flag.png'
import {Spin} from "antd"
import sectionIcon from '../../../assets/img/account/api-connection-icon.svg'

const SellerAccount = ({account, onDisconnect, deleteProcessing, onConnect}) => {
    const Actions = ({type}) => {
        if (account[`is_${type}_attached`]) {
            return (
                <button className={'btn white'}
                        onClick={() => onDisconnect({
                            type: type,
                            id: account.id
                        })}
                        disabled={deleteProcessing === type}
                >
                    Disconnect
                    {deleteProcessing === type && <Spin size={'small'}/>}
                </button>
            )
        } else {
            return (
                <button className={'btn default'} onClick={() => onConnect(account, type)}>
                    Connect
                </button>
            )
        }
    }

    const MWSStatus = () => {
        if (account.is_mws_attached === false) {
            return <span style={{color: '#FF5256'}}>Canceled</span>
        } else if (account.mws_access_status === 'CREDENTIALS_SUCCESS') {
            return <span style={{color: '#7FD3A1'}} className={'success'}>
                 Success <br/>
                {account.seller_id && <span>Seller id: {account.seller_id}</span>}
                         </span>
        } else {
            return <span style={{color: '#FF5256'}}>Failed</span>
        }
    }


    const PPCStatus = () => {
        if (account.is_amazon_ads_api_attached === false) {
            return <span style={{color: '#FF5256'}}>Canceled</span>
        } else if (account.amazon_ads_api_access_status === 'CREDENTIALS_SUCCESS') {
            return <span style={{color: '#7FD3A1'}} className={'success'}>
                Success <br/>
                {account.seller_id && <span>Seller id: {account.seller_id}</span>}
            </span>
        } else {
            return <span style={{color: '#FF5256'}}>Failed</span>
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
                            <h3>{account.account_alias ? 'Account alias' : 'Seller id'}: <span>{account.account_alias || account.seller_id}<img
                                src={USAFlag} alt=""/></span></h3>
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
                                type={'amazon_ads_api'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SellerAccount