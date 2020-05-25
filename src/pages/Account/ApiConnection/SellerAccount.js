import React, {Fragment, useEffect} from "react";
import {SVG} from "../../../utils/icons";
import USAFlag from '../../../assets/img/flags/usa-flag.svg';
import {history} from "../../../utils/history";
import {Spin} from "antd";

const SellerAccount = ({account, sellerName, opened, onOpenAccount, onDisconnect, deleteProcessing, sellerId}) => {
    const reconnectHandler = () => {
        if (!account.amazon_mws.is_connected && !account.amazon_ppc.is_connected) {
            history.push('/connect-amazon-account')
        } else if (!account.amazon_mws.is_connected && account.amazon_ppc.is_connected) {
            history.push('/connect-mws-account')
        } else if (account.amazon_mws.is_connected && !account.amazon_ppc.is_connected) {
            history.push('/connect-ppc-account')
        }
    }

    useEffect(() => {
        console.log(deleteProcessing);
    }, [deleteProcessing])

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
                            {account.amazon_mws.id && account.amazon_mws.status === 'FAILED' &&
                            <span style={{color: '#EC7F5C'}}>Failed</span>}
                            {account.amazon_mws.id && account.amazon_mws.is_connected === false &&
                            <span style={{color: '#EC7F5C'}}>Canceled</span>}
                        </div>

                        {sellerId && <div className="api-token">
                            Seller id: {sellerId}
                        </div>}

                        <div className="account-action">
                            {account.amazon_mws.id ? account.amazon_mws.is_connected ?
                                deleteProcessing === 'MWS' ?
                                    <button className={'btn white'} disabled>
                                        <Spin size={'small'}/>
                                    </button>
                                    :
                                    <button className={'btn white'}
                                            onClick={() => onDisconnect({
                                                type: 'MWS',
                                                id: account.amazon_mws.id
                                            })}>
                                        Disconnect
                                    </button>
                                :
                                <button className={'btn default'} onClick={reconnectHandler}>
                                    Reconnect
                                </button>
                                :
                                <button className={'btn default'} onClick={reconnectHandler}>
                                    Connect
                                </button>
                            }
                        </div>
                    </div>
                    <div className="row">
                        <h3>Advertising API</h3>

                        <div className={`account-status`}>
                            {account.amazon_ppc.is_connected && account.amazon_ppc.id && account.amazon_ppc.status === 'IN_PROGRESS' &&
                            <span style={{color: '#f0b849'}}>Verifying</span>}
                            {account.amazon_ppc.id && account.amazon_ppc.status === 'SUCCESS' &&
                            <span style={{color: '#7DD4A1'}}>Success</span>}
                            {account.amazon_ppc.id && account.amazon_ppc.status === 'FAILED' &&
                            <span style={{color: '#EC7F5C'}}>Failed</span>}
                            {account.amazon_ppc.id && account.amazon_ppc.is_connected === false &&
                            <span style={{color: '#EC7F5C'}}>Canceled</span>}
                        </div>

                        <div className="api-email">

                        </div>

                        <div className="account-action">
                            {account.amazon_ppc.id ? account.amazon_ppc.is_connected ?
                                deleteProcessing === 'PPC' ?
                                    <button className={'btn white'} disabled>
                                        <Spin size={'small'}/>
                                    </button>
                                    :
                                    <button className={'btn white'}
                                            onClick={() => onDisconnect({type: 'PPC', id: account.amazon_ppc.id})}>
                                        Disconnect
                                    </button>
                                :
                                <button className={'btn default'} onClick={reconnectHandler}>
                                    Reconnect
                                </button>
                                :
                                <button className={'btn default'} onClick={reconnectHandler}>
                                    Connect
                                </button>
                            }
                        </div>
                    </div>
                </div>}
            </div>


        </Fragment>
    )
};

export default SellerAccount;