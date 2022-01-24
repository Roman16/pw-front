import React from "react"
import {NavLink, Route} from "react-router-dom"
import {history} from "../../../utils/history"
import './ZTH.less'
import ConvertSemanticCore from "./ConvertSemanticCore/ConvertSemanticCore"
import Jobs from "./Jobs/Jobs"
import TokenBlock from "./TokenBlock/TokenBlock"
import AsinsSorter from "./AsinsSorter/AsinsSorter"
import Templates from "./Templates/Templates"
import CreationJobs from "./CreationJobs/CreationJobs"
import CreateSemanticCore from "./CreateSemanticCore/CreateSemanticCore"
import WordSorter from "./WordSorter/WordSorter"
import STReportAnalyzer from "./STReportAnalyzer/STReportAnalyzer"

const ZTH = () => {
    if (history.location.pathname === '/admin-panel/zth' || history.location.pathname === '/admin-panel/zth/') {
        history.push('/admin-panel/zth/create')
    }

    const token = localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : localStorage.getItem('token')

    return (
        <section className={'user-products-section zth'}>
            <TokenBlock/>

            <div className="tabs">
                <NavLink to={'/admin-panel/zth/create'}>
                    Create Semantic Core
                </NavLink>

                <NavLink to={'/admin-panel/zth/convert'}>
                    Convert Semantic Core
                </NavLink>

                <NavLink to={'/admin-panel/zth/creation-jobs'}>
                    ZTH Creation Jobs
                </NavLink>

                <NavLink to={'/admin-panel/zth/jobs'}>
                    ZTH Upload Jobs
                </NavLink>

                <NavLink to={'/admin-panel/zth/templates'}>
                    ZTH Templates
                </NavLink>

                <NavLink to={'/admin-panel/zth/asins-filtering'}>
                    ASINs Filtering
                </NavLink>

                <NavLink to={`/admin-panel/zth/word-sorter`}>
                    WordSorter
                </NavLink>

                <NavLink to={`/admin-panel/zth/st-report-analyzer`}>
                    ST Report Analyzer
                </NavLink>
            </div>

            <Route path="/admin-panel/zth/convert" component={ConvertSemanticCore}/>
            <Route path="/admin-panel/zth/jobs" component={Jobs}/>
            <Route path="/admin-panel/zth/asins-filtering" component={AsinsSorter}/>
            <Route path="/admin-panel/zth/word-sorter" component={WordSorter}/>
            <Route path="/admin-panel/zth/templates" component={Templates}/>
            <Route path="/admin-panel/zth/creation-jobs" component={CreationJobs}/>
            <Route path="/admin-panel/zth/create" component={CreateSemanticCore}/>
            <Route path="/admin-panel/zth/st-report-analyzer" component={STReportAnalyzer}/>
        </section>
    )
}

export default ZTH
