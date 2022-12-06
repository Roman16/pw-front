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

const ZTH = ({admin}) => {
    if (history.location.pathname === '/admin-panel/zth' || history.location.pathname === '/admin-panel/zth/') {
        history.push('/admin-panel/zth/create')
    }


    if (history.location.pathname === '/advanced/zth' || history.location.pathname === '/advanced/zth/') {
        history.push('/advanced/zth/create')
    }


    const baseUrl = admin ? 'admin-panel' : 'advanced'

    const token = localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : localStorage.getItem('token')

    return (
        <section className={'user-products-section zth'}>
            <TokenBlock/>

            <div className="tabs">
                <NavLink to={`/${baseUrl}/zth/create`}>
                    Create Semantic Core
                </NavLink>

                <NavLink to={`/${baseUrl}/zth/convert`}>
                    Convert Semantic Core
                </NavLink>

                <NavLink to={`/${baseUrl}/zth/creation-jobs`}>
                    ZTH Creation Jobs
                </NavLink>

                {admin && <NavLink to={`/${baseUrl}/zth/jobs`}>
                    ZTH Upload Jobs
                </NavLink>}

                {admin && <NavLink to={`/${baseUrl}/zth/templates`}>
                    ZTH Templates
                </NavLink>}

                <NavLink to={`/${baseUrl}/zth/asins-filtering`}>
                    ASINs Filtering
                </NavLink>

                <NavLink to={`/${baseUrl}/zth/word-sorter`}>
                    WordSorter
                </NavLink>

                <NavLink to={`/${baseUrl}/zth/st-report-analyzer`}>
                    ST Report Analyzer
                </NavLink>
            </div>

            <Route path={`/${baseUrl}/zth/convert`} render={() => <ConvertSemanticCore admin={admin}/>}/>
            {admin && <Route path={`/${baseUrl}/zth/jobs`} component={Jobs}/>}
            {admin && <Route path={`/${baseUrl}/zth/templates`} component={Templates}/>}
            <Route path={`/${baseUrl}/zth/asins-filtering`} component={AsinsSorter}/>
            <Route path={`/${baseUrl}/zth/word-sorter`} component={WordSorter}/>
            <Route path={`/${baseUrl}/zth/creation-jobs`} component={CreationJobs}/>
            <Route path={`/${baseUrl}/zth/create`} component={CreateSemanticCore}/>
            <Route path={`/${baseUrl}/zth/st-report-analyzer`} component={STReportAnalyzer}/>
        </section>
    )
}

export default ZTH
