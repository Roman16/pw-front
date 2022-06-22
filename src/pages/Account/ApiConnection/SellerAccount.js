import React from "react"
import USAFlag from '../../../assets/img/icons/us-flag.png'
import {Spin} from "antd"
import sectionIcon from '../../../assets/img/account/api-connection-icon.svg'

const SellerAccount = ({account, onDisconnect, deleteProcessing, onReconnect}) => {

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

    // const MWSStatus = () => {
    //     if (account.is_mws_attached === false) {
    //         return <span style={{color: '#FF5256'}}>Canceled</span>
    //     } else if (account.amazon_mws.is_connected && account.amazon_mws.id && account.amazon_mws.status === 'IN_PROGRESS') {
    //         return <span style={{color: '#f0b849'}}>Verifying</span>
    //     } else if (account.amazon_mws.id && account.amazon_mws.status === 'SUCCESS') {
    //         return <span style={{color: '#7FD3A1'}} className={'success'}>
    //             Success <br/>
    //             {account.seller_id && <span>Seller id: {account.seller_id}</span>}
    //         </span>
    //     } else if (account.amazon_mws.id && (account.amazon_mws.status === 'FAILED' || account.amazon_mws.status === 'UNAUTHORIZED' || account.amazon_mws.status === 'REFRESH_INVALID')) {
    //         return <span style={{color: '#FF5256'}}>Failed</span>
    //     } else {
    //         return ''
    //     }
    // }
    const MWSStatus = () => {
        if (account.is_mws_attached === false) {
            return <span style={{color: '#FF5256'}}>Canceled</span>
        } else {
            return <span style={{color: '#7FD3A1'}} className={'success'}>
                 Success <br/>
                {account.seller_id && <span>Seller id: {account.seller_id}</span>}
                         </span>
        }
    }
    //
    // const PPCStatus = () => {
    //     if (account.amazon_ppc.id && account.amazon_ppc.is_connected === false) {
    //         return <span style={{color: '#FF5256'}}>Canceled</span>
    //     } else if (account.amazon_ppc.is_connected && account.amazon_ppc.id && account.amazon_ppc.status === 'IN_PROGRESS') {
    //         return <span style={{color: '#f0b849'}}>Verifying</span>
    //     } else if (account.amazon_ppc.id && account.amazon_ppc.status === 'SUCCESS') {
    //         return <span style={{color: '#7FD3A1'}} className={'success'}>
    //             Success <br/>
    //             {account.amazon_ppc.account_email && <span>Email: {account.amazon_ppc.account_email}</span>}
    //         </span>
    //     } else if (account.amazon_ppc.id && (account.amazon_ppc.status === 'FAILED' || account.amazon_ppc.status === 'UNAUTHORIZED' || account.amazon_ppc.status === 'REFRESH_INVALID')) {
    //         return <span style={{color: '#FF5256'}}>Failed</span>
    //     } else {
    //         return ''
    //     }
    // }

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
                            {/*<Actions*/}
                            {/*    account={account}*/}
                            {/*    type={'mws'}*/}
                            {/*/>*/}
                        </div>
                    </div>

                    <div className="row">
                        <h4>Advertising <br/> API</h4>

                        <div className={`account-status`}>
                            {/*<PPCStatus/>*/}
                        </div>

                        <div className="account-action">
                            {/*<Actions*/}
                            {/*    account={account}*/}
                            {/*    type={'ppc'}*/}
                            {/*/>*/}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SellerAccount