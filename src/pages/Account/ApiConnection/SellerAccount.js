import React, {Fragment, useEffect} from "react";
import {SVG} from "../../../utils/icons";
import USAFlag from '../../../assets/img/flags/usa-flag.svg';
import {history} from "../../../utils/history";
import {Spin} from "antd";

const SellerAccount = ({account, sellerName, opened, onOpenAccount, onDisconnect, deleteProcessing}) => {
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
                <h2>Seller Name: {sellerName}
                    <img src={USAFlag} alt=""/>

                    {(!account.amazon_mws.is_connected || !account.amazon_ppc.is_connected) &&
                    <div className="some-problems">
                        <SVG id={'warningsmall'}/>
                    </div>}

                    <button onClick={onOpenAccount}>
                        <SVG id={'down'}/>
                    </button>
                </h2>

                {opened && <div className="account-links">
                    <div className="row">
                        <h3>MWS Authorization</h3>

                        <div className={`account-status ${account.amazon_mws.is_connected ? 'active' : 'expired'}`}>
                            {account.amazon_mws.is_connected ? 'Active' : 'Expired'}
                        </div>

                        <div className="account-action">
                            {account.amazon_mws.is_connected ?
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
                            }
                        </div>
                    </div>
                    <div className="row">
                        <h3>Advertising API</h3>
                        <div className={`account-status ${account.amazon_ppc.is_connected ? 'active' : 'expired'}`}>
                            {account.amazon_ppc.is_connected ? 'Active' : 'Expired'}
                        </div>

                        <div className="account-action">
                            {account.amazon_ppc.is_connected ?
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
                            }
                        </div>
                    </div>
                </div>}
            </div>


        </Fragment>
    )
};

export default SellerAccount;