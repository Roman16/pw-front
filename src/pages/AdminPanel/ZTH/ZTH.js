import React, {useEffect} from "react"
import {Input} from "antd"
import {NavLink, Route} from "react-router-dom"
import {history} from "../../../utils/history"
import './ZTH.less'
import ConvertSemanticCore from "./ConvertSemanticCore/ConvertSemanticCore"
import Jobs from "./Jobs/Jobs"

const ZTH = () => {

    useEffect(() => {
        history.push('/admin-panel/zth/convert')
    }, [])

    return (
        <section className={'user-products-section zth'}>
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
                />
            </div>

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
