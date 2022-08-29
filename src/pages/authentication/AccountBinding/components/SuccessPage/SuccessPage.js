import React from "react"
import successImage from '../../../../../assets/img/success-connect.svg'
import './SuccessPage.less'
import {history} from "../../../../../utils/history"

const SuccessPage = () => {
    return (
        <div className='success-section'>
            <img src={successImage} alt=""/>
            <h2>Success!</h2>

            <p>
                You have succesfully connected your <br/> Amazon Account with Sponsoreds
            </p>

            <div className="actions">
                <button className='btn default' onClick={() => history.push('/account/api-connections')}>Finish</button>
            </div>
        </div>
    )
}

export default SuccessPage