import React, {useEffect} from "react"
import successImage from '../../../../../assets/img/success-connect.svg'
import './SuccessPage.less'
import {history} from "../../../../../utils/history"
import _ from "lodash"
import {defaultImportStatus} from "../../../../../reducers/user.reducer"

const SuccessPage = () => {
    useEffect(() => {
        localStorage.setItem('importStatus', JSON.stringify(_.mapValues(defaultImportStatus, () => ({required_parts_ready: false}))))
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