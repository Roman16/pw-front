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
    const [disconnectObj, setDisconnectObj] = useState({}),
        [visibleWindow, setVisibleWindow] = useState(false),
        [deleteProcessing, setDeleteProcessing] = useState(false),
        [activeAccountIndex, setActiveAccountIndex] = useState()

    const dispatch = useDispatch()

    const user = useSelector(state => state.user),
        connectedAmazonAccounts = useSelector(state => state.user.amazonRegionAccounts)


    const disconnectHandler = (data) => {
        setDisconnectObj(data)
        setVisibleWindow(true)
    }

    const deleteApiHandler = async () => {
        setDeleteProcessing(disconnectObj.type)
        setVisibleWindow(false)

        try {
           const {result} =  await userService[disconnectObj.type === 'amazon_ads_api' ? 'unsetAdsApi' : 'unsetMWS'](disconnectObj.id)

            dispatch(userActions.setAmazonRegionAccounts(result))
        } catch (e) {
            console.log(e)
        }

        setDeleteProcessing(false)
    }

    const reconnectHandler = async (account) => {
        if (!account.is_mws_attached && !account.is_amazon_ads_api_attached) {
            history.push('/connect-amazon-account')
        } else if (!account.is_mws_attached && account.is_amazon_ads_api_attached) {
            history.push('/connect-mws-account')
        } else if (account.is_mws_attached && !account.is_amazon_ads_api_attached) {
            history.push('/connect-ppc-account')
        }
    }

    useEffect(() => {
        if (connectedAmazonAccounts[0]) setActiveAccountIndex(0)
    }, [connectedAmazonAccounts])

    useEffect(() => {
        userService.getAmazonRegionAccounts()
            .then(({result}) => {
                dispatch(userActions.setAmazonRegionAccounts(result))
            })
    }, [])

    return (
        <Fragment>
            <div className="api-connection">
                <ConnectedAccounts
                    accounts={connectedAmazonAccounts}
                    onSelectAccount={setActiveAccountIndex}
                />

                {activeAccountIndex !== undefined &&
                <div className="api-connection-block">
                    <div className={'connections-list'}>
                        <SellerAccount
                            sellerName={user.user.name}
                            account={connectedAmazonAccounts[activeAccountIndex]}
                            deleteProcessing={deleteProcessing}

                            onDisconnect={disconnectHandler}
                            onReconnect={reconnectHandler}
                        />
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