import React, {Fragment, useEffect} from "react";
import {SVG} from "../../../utils/icons";
import USAFlag from '../../../assets/img/flags/usa-flag.svg';
import {history} from "../../../utils/history";
import {Spin} from "antd";


const SellerAccount = ({account, sellerName, opened, onOpenAccount, onDisconnect, deleteProcessing, sellerId, onReconnect}) => {

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

    return (
        <Fragment>
            <div className={`seller-account ${opened && 'opened'}`}>
                <div className={'seller-name'} onClick={onOpenAccount}>Seller Name: {sellerName}
                    <img src={USAFlag} alt=""/>

                    {(account.amazon_mws.status === 'FAILED' || account.amazon_ppc.status === 'FAILED' || account.amazon_mws.is_connected === false || account.amazon_ppc.is_connected === false) &&
                    <div className="some-problems">
                        <SVG id={'warningsmall'}/>
                    </div>}

                    <button>
                        <SVG id={'down'}/>
                    </button>
                </div>

                {opened && <div className="account-links">
                    <div className="row">
                        <h3>MWS Authorization</h3>

                        <div className={`account-status`}>
                            {account.amazon_mws.is_connected && account.amazon_mws.id && account.amazon_mws.status === 'IN_PROGRESS' &&
                            <span style={{color: '#f0b849'}}>Verifying</span>}
                            {account.amazon_mws.id && account.amazon_mws.status === 'SUCCESS' &&
                            <span style={{color: '#7DD4A1'}}>Success</span>}
                            {account.amazon_mws.id && (account.amazon_mws.status === 'FAILED' || account.amazon_mws.status === 'UNAUTHORIZED') &&
                            <span style={{color: '#EC7F5C'}}>Failed</span>}
                            {account.amazon_mws.id && account.amazon_mws.is_connected === false &&
                            <span style={{color: '#EC7F5C'}}>Canceled</span>}
                        </div>

                        {sellerId && <div className="api-token">
                            Seller id: {sellerId}
                        </div>}

                        <div className="account-action">
                            <Actions
                                account={account}
                                type={'mws'}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <h3>Advertising API</h3>

                        <div className={`account-status`}>
                            {account.amazon_ppc.is_connected && account.amazon_ppc.id && account.amazon_ppc.status === 'IN_PROGRESS' &&
                            <span style={{color: '#f0b849'}}>Verifying</span>}
                            {account.amazon_ppc.id && account.amazon_ppc.status === 'SUCCESS' &&
                            <span style={{color: '#7DD4A1'}}>Success</span>}
                            {account.amazon_ppc.id && (account.amazon_ppc.status === 'FAILED' || account.amazon_ppc.status === 'UNAUTHORIZED') &&
                            <span style={{color: '#EC7F5C'}}>Failed</span>}
                            {account.amazon_ppc.id && account.amazon_ppc.is_connected === false &&
                            <span style={{color: '#EC7F5C'}}>Canceled</span>}
                        </div>

                        {account.amazon_ppc.id && account.amazon_ppc.account_email && <div className="api-email">
                            Email: {account.amazon_ppc.account_email}
                        </div>}

                        <div className="account-action">
                            <Actions
                                account={account}
                                type={'ppc'}
                            />
                        </div>
                    </div>
                </div>}
            </div>


        </Fragment>
    )
};

export default SellerAccount;