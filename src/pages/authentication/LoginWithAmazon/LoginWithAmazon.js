import React, {useEffect, Fragment} from "react"
import {useDispatch} from 'react-redux'
import {userActions} from '../../../actions/user.actions'
import './LoginWithAmazon.less'

const LoginWithAmazon = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code'),
            scope = urlParams.get('scope'),
            state = urlParams.get('state')


        dispatch(userActions.loginWithAmazon({
            code,
            scope,
            state
        }))
    }, [])

    return (
        <Fragment>
            <div className="bar">
                <p>Loading ...</p>
            </div>
        </Fragment>
    )
}

export default LoginWithAmazon