import React, {useState} from 'react';
import {Input, Cascader} from 'antd';

import checked from '../../../../assets/img/icons/checked.svg';
import amazon from '../../../../assets/img/amazon.png';
import closeIcon from '../../../../assets/img/icons/close-icon.svg';
import {useSelector, useDispatch} from 'react-redux';
import {userService} from "../../../../services/user.services";
import {userActions} from "../../../../actions/user.actions";

const options = [
    {
        value: 'USACAMX',
        label: 'North America (USA, CA, MX)'
    },
    {
        value: 'UKDEFRESITINTR',
        label: 'Europe (UK, DE, FR, ES, IT, IN, TR)'
    }
];

const Amazon = ({amazonTokens}) => {
    const dispatch = useDispatch();
    const [amazonTokensValue, onChange] = useState({
        mws_auth_token: '',
        merchant_id: ''
    });
    const {ppcLink, mwsLink, ppcConnected, mwsConnected} = useSelector(state => ({
            ppcLink: state.user.account_links
                ? state.user.account_links.amazon_ppc.connect_link
                : '',
            mwsLink: state.user.account_links
                ? state.user.account_links.amazon_mws.connect_link
                : '',
            ppcConnected: state.user.account_links && state.user.account_links.amazon_ppc.is_connected,
            mwsConnected: state.user.account_links && state.user.account_links.amazon_mws.is_connected
        })),
        token = localStorage.getItem('token');

    const redirectLink = `${ppcLink}&state=${token}`;

    function handleChangeInput({target: {name, value}}) {
        onChange({
            ...amazonTokensValue,
            [name]: value
        })
    }

    function onUntieAccount(type) {
        dispatch(userActions)
    }

    async function handleSaveMws() {
        await userService.setMWS(amazonTokensValue)
    }

    return (
        <div className="amazon-box">
            {amazonTokens && <div className="approved-wrapper">
                <div className="title-wrap">
                    <h3>DbvtskGoods</h3>
                    <p>A344WPJGDI66R5 - North America (US, CA, MX)</p>
                </div>

                {mwsConnected && <div className="mws-wrap">
                    <h3>
                        MWS Authorization
                        <img src={checked} alt="checked"/>
                    </h3>

                    <button className="mws-btn" type="button" onClick={() => onUntieAccount('mws')}>
                        <img src={closeIcon} alt=""/>
                        <span>Remove</span>
                    </button>
                </div>}

                {ppcConnected && <div className="login-wrap">
                    <h3>
                        Seller Central Log In
                        <img src={checked} alt="checked"/>
                    </h3>

                    <button className="mws-btn" type="button" onClick={() => onUntieAccount('ppc')}>
                        <img src={closeIcon} alt=""/>
                        <span>Remove</span>
                    </button>
                </div>}

                {mwsConnected && ppcConnected && <p className="approved-text">Approved</p>}
            </div>
            }
            <div className="add-wrapper">
                {!mwsConnected && <div className="add-amazon-wrap">
                    <h2 className="add-amazon-title">NEW STOREFRONT - ADD MWS ACCESS</h2>

                    <div className="choice-wrap">
                        <div className="connect-group">
                            <Cascader
                                allowClear={false}
                                defaultValue={['USACAMX']}
                                options={options}
                            />

                            <a href={mwsLink} target="_blank" className="connect-btn">
                                Connect Account
                            </a>
                        </div>

                        <div className="line"></div>

                        <div className="confirm-group">
                            <div className="form-group">
                                <span>Amazon Seller ID</span>
                                <Input
                                    className="form-control"
                                    type="text"
                                    name="merchant_id"
                                    placeholder="This will look like A1BCDE23F4GHIJ"
                                    onChange={handleChangeInput}
                                />
                            </div>

                            <div className="form-group">
                                <span>MWS Auth Token</span>
                                <Input
                                    className="form-control"
                                    type="text"
                                    name="mws_auth_token"
                                    placeholder="This will look like amzn.mws. 01234567"
                                    onChange={handleChangeInput}
                                />
                            </div>

                            <button
                                className="btn green-btn confirm-btn"
                                type="button"
                                onClick={handleSaveMws}
                                disabled={amazonTokensValue.mws_auth_token.length < 5 || amazonTokensValue.merchant_id.length < 5}
                            >
                                Confirm MWS
                            </button>
                        </div>
                    </div>

                    <span className="add-amazon-text">
                        Click to authorize Amazon MWS Access and paste the results below
                    </span>
                </div>
                }
                {!ppcConnected && <div className="login-amazon-wrap">
                    <h2 className="login-amazon-title">ADD ADVERTISING ACCESS</h2>
                    <div className="connect-amazon">
                        <span className="connect-amazon-text">
                            Click to authorize Amazon MWS Access and paste the results below:
                        </span>

                        <a className="login-amazon-btn" href={redirectLink}>
                            <img className="login-amazon-img" src={amazon} alt="LWA-GOld"/>
                        </a>
                        <button className="connect-another-btn" type="button">
                            Need another Storefront?
                        </button>
                    </div>
                </div>
                }            </div>
        </div>
    );
};

export default Amazon;
