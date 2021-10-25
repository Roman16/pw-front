import React, {useEffect} from "react"
import successImage from '../../../../../assets/img/success-connect.svg'
import './SuccessPage.less'
import {history} from "../../../../../utils/history"
import _ from "lodash"
import {defaultImportStatus} from "../../../../../reducers/user.reducer"
import {userService} from "../../../../../services/user.services"
import {userActions} from "../../../../../actions/user.actions"
import {useDispatch} from "react-redux"

const SuccessPage = () => {
    const dispatch = useDispatch()

    const checkStatus = async () => {
        try {
            const importStatus = await userService.checkImportStatus()
            dispatch(userActions.updateUser({importStatus: importStatus.result}))
        } catch (e) {

        }
    }
    useEffect(() => {
        checkStatus()
    }, [])

    return (
        <div className='success-section'>
            <img src={successImage} alt=""/>
            <h2>Success!</h2>

            <p>
                You have succesfully connected your <br/> Amazon Account with Sponsoreds
            </p>

            <div className="actions">
                <button className='btn default' onClick={() => history.push('/')}>Finish</button>
            </div>
        </div>
    )
}

export default SuccessPage