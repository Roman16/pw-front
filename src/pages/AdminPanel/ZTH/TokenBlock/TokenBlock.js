import React, {useEffect, useState} from "react"
import {Input} from "antd"
import {adminServices} from "../../../../services/admin.services"

const TokenBlock = () => {
    const [token, setToken] = useState(localStorage.getItem('zthToken') !== null ? localStorage.getItem('zthToken') : ''),
        [version, setVersion] = useState()


    const getVersionInformation = async () => {
        try {
            const res = await adminServices.zthVersionInformation()

            setVersion(res.version)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        localStorage.setItem('zthToken', token)
    }, [token])

    useEffect(() => {
        getVersionInformation()

    }, [])

    return (
        <>
            <div className="version-description">
                <p>Zero to Hero version: <b>{version}</b></p>
                <p>Latest markup version: <b>28</b></p>
                <p>Lowest compatible version: <b>28</b></p>

                <a href="#">Link to latest template</a>
            </div>

            <div className="api-token form-group">
                <label htmlFor="">API Token</label>

                <Input
                    placeholder={'Enter API Token'}
                    value={token || ''}
                    onChange={e => setToken(e.target.value)}
                />
            </div>
        </>
    )
}

export default TokenBlock
