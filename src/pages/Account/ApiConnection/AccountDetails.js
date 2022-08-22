import React, {useEffect, useState} from "react"
import {SVG} from "../../../utils/icons"
import {Popover, Spin} from "antd"
import ModalWindow from "../../../components/ModalWindow/ModalWindow"
import DisconnectWindow from "./DisconnectWindow"
import {history} from "../../../utils/history"

export const AccountDetails = ({account, updateProcessing, onUpdateAlias, onDisconnect}) => {
    return (<div className="account-details">
        <div className={'alias'}>
            <b>Account alias: </b>

            <div className="text">{account.account_alias}</div>

            <AliasEditPopup
                alias={account.account_alias}
                processing={updateProcessing}

                onSubmit={(alias) => onUpdateAlias({account_alias: alias, amazon_region_account_id: account.id})}
            />
        </div>

        <div className={'seller-id'}><b>Seller ID:</b> {account.seller_id}</div>

        <div className="row">
            <ApiAccess
                title={'Amazon SP API access'}
                status={account.amazon_sp_api_access_status}
                isAttached={account.is_amazon_sp_api_attached}

                onDisconnect={() => onDisconnect('sp', account.id)}
                onConnect={() => history.push(`/connect-sp-api/${account.id}`)}
            />

            <ApiAccess
                title={'Amazon Ads API access'}
                status={account.amazon_ads_api_access_status}
                isAttached={account.is_amazon_ads_api_attached}

                onDisconnect={() => onDisconnect('ads', account.id)}
                onConnect={() => history.push(`/connect-ads-api/${account.id}`)}
            />
        </div>
    </div>)
}

const AliasEditPopup = ({alias, onSubmit, processing}) => {
    const [visible, setVisible] = useState(false),
        [value, setValue] = useState(alias)

    const handleVisibleChange = (newVisible) => {
        setVisible(newVisible)
    }

    const submitHandler = () => {
        onSubmit(value)
    }

    useEffect(() => {
        setVisible(false)
        setValue(alias)
    }, [alias])

    useEffect(() => {
        if (!visible) setValue(alias)
    }, [visible])

    return (<Popover
        content={<div>
            <div className="form-group">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={'Set alias'}
                />
            </div>

            <div className="actions">
                <button
                    disabled={processing}
                    className="btn transparent"
                    onClick={() => handleVisibleChange(false)}>
                    Cancel
                </button>
                <button disabled={processing} className="btn default" onClick={submitHandler}>
                    Submit
                    {processing && <Spin size={'small'}/>}
                </button>
            </div>
        </div>}
        trigger="click"
        placement={'bottomLeft'}
        getPopupContainer={trigger => trigger.parentNode}
        visible={visible}
        overlayClassName={'alias-edit-popover'}
        onVisibleChange={handleVisibleChange}
    >
        <button className="btn icon"><SVG id={'edit-pen-icon'}/></button>
    </Popover>)
}

const ApiAccess = ({title, status, isAttached, onDisconnect, onConnect}) => {
    const success = status === 'CREDENTIALS_SUCCESS' && isAttached

    const [visible, setVisible] = useState(false)

    const statusText = () => {
        if (success) {
            return (<span style={{color: '#7FD3A1'}}>Success</span>)
        } else if(!isAttached) {
            return (<span style={{color: '#FF5256'}}>No access granted</span>)
        } else {
            return (<span style={{color: '#FF5256'}}>Failed</span>)
        }
    }

    const actionsBtn = () => {
        if (isAttached) {
            return (<button className="btn grey" onClick={() => setVisible(true)}>Revoke access</button>)
        } else {
            return (<button className="btn default" onClick={onConnect}>Connect</button>)
        }
    }

    useEffect(() => {
        setVisible(false)
    }, [status, isAttached])

    return (<>
            <div className="access">
                <div className="title">{title}</div>

                <div className="row">
                    <div className="status">
                        Status: {statusText()}
                    </div>

                    <div className="actions">
                        {actionsBtn()}
                    </div>
                </div>
            </div>

            <ModalWindow
                visible={visible}
                footer={false}
                destroyOnClose={true}
                handleCancel={() => setVisible(false)}
                className={'disconnect-api-window'}
            >
                <DisconnectWindow
                    onDisconnect={onDisconnect}
                    handleCancel={() => setVisible(false)}
                />
            </ModalWindow>
        </>
    )
}

