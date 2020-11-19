import React, {useEffect, useState} from "react"
import {Input} from "antd"
import {adminServices} from "../../../../services/admin.services"

const TokenBlock = () => {
    const [token, setToken] = useState(localStorage.getItem('zthToken') !== null ? localStorage.getItem('zthToken') : ''),
        [versionInfo, setVersionInfo] = useState({
            zeroToHeroServiceVersion: '',
            latestZeroToHeroTemplateVersion: '',
            lowestCompatibleZeroToHeroTemplateVersion: '',
            linkToLatestZeroToHeroTemplate: '',
        })


    const getVersionInformation = async () => {
        try {
            const res = await adminServices.zthVersionInformation()
            setVersionInfo(res)
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
                <p>Zero to Hero version: <b>{versionInfo.zeroToHeroServiceVersion}</b></p>
                <p>Latest markup version: <b>{versionInfo.latestZeroToHeroTemplateVersion}</b></p>
                <p>Lowest compatible version: <b>{versionInfo.lowestCompatibleZeroToHeroTemplateVersion}</b></p>

                <a target={'_blank'} href={versionInfo.linkToLatestZeroToHeroTemplate}>
                    Link to latest template
                </a>
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
