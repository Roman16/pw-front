import React, {useEffect} from "react"
import {Input} from "antd"
import {NavLink, Route} from "react-router-dom"
import {history} from "../../../utils/history"
import './ZTH.less'
import ConvertSemanticCore from "./ConvertSemanticCore/ConvertSemanticCore"
import Jobs from "./Jobs/Jobs"
import {adminServices} from "../../../services/admin.services"
import TokenBlock from "./TokenBlock/TokenBlock"

const ZTH = () => {

    const getVersionInformation = async () => {
        try {
            const res = await adminServices.zthVersionInformation()
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if(history.location.pathname === '/admin-panel/zth' || history.location.pathname === '/admin-panel/zth/') {
            history.push('/admin-panel/zth/convert')
        }

        getVersionInformation()
    }, [])

    return (
        <section className={'user-products-section zth'}>
            <TokenBlock/>

            <div className="tabs">
                <NavLink to={'/admin-panel/zth/convert'}>
                    Convert Semantic Core
                </NavLink>

                <NavLink to={'/admin-panel/zth/jobs'}>
                    Zero to Hero Jobs
                </NavLink>
            </div>

            <Route path="/admin-panel/zth/convert" component={ConvertSemanticCore}/>
            <Route path="/admin-panel/zth/jobs" component={Jobs}/>
        </section>
    )
}

export default ZTH
