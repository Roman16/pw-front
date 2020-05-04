import React from "react";
import {SVG} from "../../../utils/icons";
import USAFlag from '../../../assets/img/flags/usa-flag.svg';
import {history} from "../../../utils/history";

const SellerAccount = ({account, sellerName, opened, onOpenAccount, onDisconnect}) => {

    const reconnectHandler = () => {
        if (!account.amazon_mws.is_connected && !account.amazon_ppc.is_connected) {
            history.push('/connect-amazon-account')
        } else if (!account.amazon_mws.is_connected && account.amazon_ppc.is_connected) {
            history.push('/connect-mws-account')
        } else if (account.amazon_mws.is_connected && !account.amazon_ppc.is_connected) {
            history.push('/connect-ppc-account')
        }
    }

    return (<div className={`seller-account ${opened && 'opened'}`}>
        <h2>Seller Name: {sellerName}
            <img src={USAFlag} alt=""/>


            <button onClick={onOpenAccount}>
                {(!account.amazon_mws.is_connected || !account.amazon_ppc.is_connected) && <SVG id={'warningsmall'}/>}

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
                        <button className={'btn white'} onClick={() => onDisconnect('MWS', account.amazon_mws.id)}>
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
                        <button className={'btn white'} onClick={() => onDisconnect('PPC', account.amazon_ppc.id)}>
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
    </div>)
};

export default SellerAccount;