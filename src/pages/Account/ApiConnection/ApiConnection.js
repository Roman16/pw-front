import React, {Fragment, useEffect, useState} from "react"
import './ApiConnection.less'
import {useDispatch, useSelector} from "react-redux"
import SellerAccount from "./SellerAccount"
import {userActions} from "../../../actions/user.actions"
import ModalWindow from "../../../components/ModalWindow/ModalWindow"
import DisconnectWindow from "./DisconnectWindow"
import {userService} from "../../../services/user.services"
import {history} from "../../../utils/history"
import ConnectedAccounts from "./ConnectedAccounts"


const ApiConnection = () => {
    const [disconnectObj, setDisconnectObj] = useState({})
    const [visibleWindow, setVisibleWindow] = useState(false)
    const [deleteProcessing, setDeleteProcessing] = useState(false)

    const dispatch = useDispatch()

    const {user} = useSelector(state => ({
        user: state.user
    }))

    useEffect(() => {
        dispatch(userActions.getPersonalUserInfo())
    }, [])


    const disconnectHandler = (data) => {
        setDisconnectObj(data)
        setVisibleWindow(true)
    }

    const deleteApiHandler = async () => {
        setDeleteProcessing(disconnectObj.type)
        setVisibleWindow(false)

        try {
            await userService[disconnectObj.type === 'ppc' ? 'unsetPPC' : 'unsetMWS']({id: disconnectObj.id})
            dispatch(userActions.unsetAccount(disconnectObj.type === 'ppc' ? 'PPC' : 'MWS'))
        } catch (e) {
            console.log(e)
        }

        setDeleteProcessing(false)
    }

    const reconnectHandler = async (account, isFailed, type) => {
        if (isFailed) {
            try {
                await userService[type === 'ppc' ? 'unsetPPC' : 'unsetMWS']({id: account[`amazon_${type}`].id})
                dispatch(userActions.unsetAccount(type === 'ppc' ? 'PPC' : 'MWS'))

                if (!account.amazon_mws.is_connected && type === 'ppc') {
                    history.push('/connect-ppc-account')
                } else if (!account.amazon_ppc.is_connected && type === 'mws') {
                    history.push('/connect-mws-account')
                } else {
                    history.push('/connect-amazon-account')
                }
            } catch (e) {
                console.log(e)
            }
        }

        if (!account.amazon_mws.is_connected && !account.amazon_ppc.is_connected) {
            history.push('/connect-amazon-account')
        } else if (!account.amazon_mws.is_connected && account.amazon_ppc.is_connected) {
            history.push('/connect-mws-account')
        } else if (account.amazon_mws.is_connected && !account.amazon_ppc.is_connected) {
            history.push('/connect-ppc-account')
        }
    }

    return (
        <Fragment>
            <div className="api-connection">
                <ConnectedAccounts
                    accountLinks={user.account_links}
                    accountName={user.default_accounts.amazon_mws.account_name}
                    sellerId={user.default_accounts.amazon_mws.seller_id}
                />

                {(user.account_links[0].amazon_mws.is_connected === true || user.account_links[0].amazon_ppc.is_connected === true) &&
                <div className="api-connection-block">
                    <div className={'connections-list'}>
                        {user.account_links.map((account, index) => (
                            <SellerAccount
                                key={`account_${index}`}
                                sellerName={user.user.name}
                                account={account}

                                accountName={user.default_accounts.amazon_mws.account_name}
                                sellerId={user.default_accounts.amazon_mws.seller_id}
                                onDisconnect={disconnectHandler}
                                onReconnect={reconnectHandler}
                                deleteProcessing={deleteProcessing}
                            />
                        ))}
                    </div>
                </div>}
            </div>

            <ModalWindow
                visible={visibleWindow}
                footer={false}
                handleCancel={() => setVisibleWindow(false)}
                className={'disconnect-api-window'}
            >
                <DisconnectWindow
                    onDisconnect={deleteApiHandler}
                    handleCancel={() => setVisibleWindow(false)}
                />
            </ModalWindow>
        </Fragment>
    )
}

export default ApiConnection