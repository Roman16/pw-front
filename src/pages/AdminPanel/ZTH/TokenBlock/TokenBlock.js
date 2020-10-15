import React, {useEffect, useState} from "react"
import {Input} from "antd"

const TokenBlock = () => {
    const [token, setToken] = useState(localStorage.getItem('zthToken'))

    useEffect(() => {
        localStorage.setItem('zthToken', token)
    }, [token])

    return (
        <>
            <div className="version-description">
                <p>Zero to Hero version: <b>2020-09-18</b></p>
                <p>Latest markup version: <b>28</b></p>
                <p>Lowest compatible version: <b>28</b></p>

                <a href="#">Link to latest template</a>
            </div>

            <div className="api-token form-group">
                <label htmlFor="">API Token</label>

                <Input
                    placeholder={'Enter API Token'}
                    value={token}
                    onChange={e => setToken(e.target.value)}
                />
            </div>
        </>
    )
}

export default TokenBlock
