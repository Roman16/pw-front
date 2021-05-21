import React from "react"
import {Link, NavLink, Route} from "react-router-dom"
import {history} from "../../../utils/history"
import './ZTH.less'
import ConvertSemanticCore from "./ConvertSemanticCore/ConvertSemanticCore"
import Jobs from "./Jobs/Jobs"
import TokenBlock from "./TokenBlock/TokenBlock"
import {SVG} from "../../../utils/icons"
import AsinsSorter from "./AsinsSorter/AsinsSorter"

const ZTH = () => {
    if (history.location.pathname === '/admin-panel/zth' || history.location.pathname === '/admin-panel/zth/') {
        history.push('/admin-panel/zth/convert')
    }

    const token = localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : localStorage.getItem('token')

    return (
        <section className={'user-products-section zth'}>
            <TokenBlock/>

            <div className="tabs">
                <NavLink to={'/admin-panel/zth/convert'}>
                    Convert Semantic Core
                </NavLink>

                <NavLink to={'/admin-panel/zth/jobs'}>
                    ZTH Upload Jobs
                </NavLink>
                <NavLink to={'/admin-panel/zth/asins-filtering'}>
                    ASINs Filtering
                </NavLink>

                <Link to={`/admin/word-sorter?token=${token}`} target={'_blank'}>
                    WordSorter <SVG id={'outside-link'}/>
                </Link>
            </div>

            <Route path="/admin-panel/zth/convert" component={ConvertSemanticCore}/>
            <Route path="/admin-panel/zth/jobs" component={Jobs}/>
            <Route path="/admin-panel/zth/asins-filtering" component={AsinsSorter}/>
        </section>
    )
}

export default ZTH
