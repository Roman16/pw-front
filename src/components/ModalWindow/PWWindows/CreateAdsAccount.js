import React, {useEffect, useRef} from "react"
import ModalWindow from "../ModalWindow"
import {marketplaceIdValues} from "../../../constans/amazonMarketplaceIdValues"
import {userService} from "../../../services/user.services"
import {userActions} from "../../../actions/user.actions"
import {useDispatch} from "react-redux"

let intervalId = null


export const CreateAdsAccount = ({visible, container, marketplace}) => {
    const marketplaceName = marketplace?.marketplace_id ? marketplaceIdValues[marketplace.marketplace_id].countryName : ''
    const prevVisibleRef = useRef()
    const dispatch = useDispatch()

    const checkStatus = async () => {
        try {
            const importStatus = await userService.checkImportStatus(marketplace.id)
            dispatch(userActions.updateUser({importStatus: importStatus.result}))
        } catch (e) {

        }
    }


    useEffect(() => {
        if (prevVisibleRef.current && !visible) document.location.reload()

        prevVisibleRef.current = visible

        visible && checkStatus()

        intervalId = setInterval(() => {
            if (visible) {
                checkStatus()
            } else {
                clearInterval(intervalId)
            }
        }, 10000)

        return (() => {
            clearInterval(intervalId)
        })
    }, [visible])


    return (
        <ModalWindow
            className={'amazon-loading-window create-ads-account'}
            wrapClassName="import-status-window-wrap"
            visible={visible}
            container={!container}
            getContainer={container}
            maskStyle={container && {
                width: '100%',
                right: 'inherit',
                left: 'inherit',
                top: '0',
                zIndex: '11'
            }}
        >
            <h2>Welcome!</h2>

            <p>
                You haven't created Advertising account for {marketplaceName} marketplace on this Seller account yet.
                All Sponsoreds
                services are Advertising based, and we are unable to provide them without a registered Advertising
                account.
                Please select another marketplace or create an Advertising account for {marketplaceName} marketplace.
                <br/>
                <br/>
                To create an Advertising account, login to your Seller Central, select {marketplaceName} marketplace,
                and go to Advertising
                Console at <b>Advertising -> Campaign Manager</b>. Follow steps provided by Amazon to create your first
                advertising
                campaign and Advertising account for the {marketplaceName} marketplace.
                <br/>
                <br/>
                When you are done, our system will automatically sync with your new Advertising account and you will be
                able
                to use Sponsoreds services in {marketplaceName} marketplace.
            </p>
        </ModalWindow>)
}