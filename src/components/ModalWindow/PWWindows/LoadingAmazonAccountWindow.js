import React, {useEffect} from "react"
import {useDispatch} from "react-redux"
import ModalWindow from "../ModalWindow"
import {userActions} from "../../../actions/user.actions"
import {productsActions} from "../../../actions/products.actions"
import loader from "../../../assets/img/loader.svg"
import {userService} from "../../../services/user.services"

let intervalId = null

const LoadingAmazonAccount = ({visible, pathname, importStatus, firstName, productList}) => {
    const dispatch = useDispatch()

    const checkStatus = async () => {
        try {
            const importStatus = await userService.checkImportStatus()
            dispatch(userActions.updateUser({importStatus: importStatus.result}))
        } catch (e) {

        }
    }

    useEffect(() => {
        intervalId = setInterval(() => {
            if (visible) {
                checkStatus()
            } else {
                if (!productList && productList.length <= 0) {
                    dispatch(productsActions.fetchProducts({
                        size: 10,
                        page: 1,
                        searchStr: '',
                        onlyOptimization: false,
                        selectedAll: false,
                        onlyHasNew: false
                    }))
                }

                clearInterval(intervalId)
            }
        }, 10000)

        return (() => {
            clearInterval(intervalId)
        })
    }, [visible])

    return (
        <ModalWindow
            className={'amazon-loading-window'}
            visible={visible}
            okText={'Check it now'}
            container={true}
        >
            <h2>Welcome {firstName}!</h2>

            <p>
                We’re currently syncing your Amazon Account, which can take up to 24 hours. You’ll get an email when
                sync is done so you can close the app and come back later.
            </p>

            <div className="table">
                <div className="row header">
                    <div className="col">Description</div>
                    <div className="col">Status</div>
                </div>
                <div className="row ">
                    <div className="col">Products</div>
                    <div className="col">In Progress... <ProgressIcon/></div>
                </div>

                {!pathname.includes('/zero-to-hero') && <>
                    <div className="row ">
                        <div className="col">SP Advertising</div>
                        <div className="col">In Progress... <ProgressIcon/></div>
                    </div>
                    <div className="row ">
                        <div className="col">SD Advertising</div>
                        <div className="col">In Progress... <ProgressIcon/></div>
                    </div>
                    <div className="row ">
                        <div className="col">Orders Data</div>
                        <div className="col">In Progress... <ProgressIcon/></div>
                    </div>
                </>}
            </div>
        </ModalWindow>
    )
}


const DoneIcon = () => <i>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="8" fill="#7FD3A1"/>
        <path d="M5 8.55556L7.33333 11L11.5 6" stroke="white" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round"/>
    </svg>
</i>

const ProgressIcon = () => <i><img src={loader} alt=""/></i>

export default LoadingAmazonAccount
