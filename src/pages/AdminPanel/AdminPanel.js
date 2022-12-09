import React, {useState} from "react"
import './AdminPanel.less'
import {adminServices} from "../../services/admin.services"
import GeneralUserInformation from "./GeneralInformation/UserInformation"
import AccountLinks from "./GeneralInformation/AccountLinks"
import OptimizationJobs from "./GeneralInformation/OptimizationJobs"
import OptimizationChanges from "./GeneralInformation/OptimizationChanges"
import OptimizationCondition from "./GeneralInformation/OptimizationCondition"
import Reports from "./Reports/Reports"
import Products from "./Products/Products"
import ChangePassword from "./ChangePassword/ChangePassword"
import Impersonations from "./Impersonations/Impersonations"
import Campaigns from "../Analytics/Campaigns/Campaigns"
import {NavLink, Route, Redirect} from "react-router-dom"
import ZTH from "./ZTH/ZTH"
import AgencyUsers from "./AgencyUsers/AgencyUsers"
import {AgencyDashboard} from "./AgencyDashboard/AgencyDashboard"

const AdminPanel = ({admin = true}) => {
    const [selectedTab, setSelectedTab] = useState('genInfo')
    const [userInformation, setUserInformation] = useState(undefined)
    const [accountLinks, setAccountLinks] = useState(undefined)
    const [optimizationJobs, setOptimizationJobs] = useState(undefined)
    const [optimizationChanges, setOptimizationChanges] = useState(undefined)
    const [userReports, setUserReports] = useState({})

    const [adGroupsList, setAdGroupsList] = useState(undefined)
    const [adGroupsCanBeOptimized, setAdGroupsCanBeOptimized] = useState(undefined)
    const [patsList, setPatsList] = useState(undefined)

    const checkUserEmail = (email) => {
        adminServices.checkUserEmail(email)
            .then(res => {
                setUserInformation(res.data.user)
                checkAccountLinks({id: res.data.user.id})
                checkOptimizationJobs({userId: res.data.user.id})
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setUserInformation(error.response.data.message)
                }
            })
    }

    const checkAccountLinks = (data) => {
        adminServices.checkAccountLinks(data)
            .then(res => {
                setAccountLinks(res.data['linked-accounts'])
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setAccountLinks(error.response.data.message)
                }
            })
    }

    const checkOptimizationJobs = (data) => {
        adminServices.checkOptimizationJobs(data)
            .then(res => {
                setOptimizationJobs(res.data)
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setOptimizationJobs(error.response.data.message)
                }
            })
    }

    const checkOptimizationChanges = (productId, asin, marketplace_id) => {
        adminServices.checkOptimizationChanges({
            userId: userInformation.id,
            productId,
            asin,
            marketplace_id
        })
            .then(res => {
                setOptimizationChanges(res)
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setOptimizationChanges(error.response.data.message)
                }
            })
    }

    const checkOptimizationConditions = (data) => {
        adminServices.checkAdGroupsList({
            userId: data.userId || userInformation.id,
            profile_id: data.profileId || accountLinks[0].lwa_profile_id,
            sku: data.sku
        })
            .then(res => {
                setAdGroupsList(res.data)

                if (res.status === 'SUCCESS') {
                    adminServices.checkAdGroupsCanBeOptimized({
                        userId: data.userId || userInformation.id,
                        profile_id: data.profileId || accountLinks[0].lwa_profile_id,
                        sku: data.sku
                    })
                        .then(res => {
                            setAdGroupsCanBeOptimized(res.data && res.data.result)
                        })
                        .catch(error => {
                            if (error.response && error.response.data) {
                                setAdGroupsCanBeOptimized(error.response.data.message)
                            }
                        })
                }
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setAdGroupsList(error.response.data.message)
                }
            })
    }

    return (
        <div className="admin-panel">
            {admin && <div className="tabs">
                <NavLink
                    to={'/admin-panel/general'}
                >
                    General Information
                </NavLink>

                <NavLink
                    to={'/admin-panel/reports'}
                >
                    Reports
                </NavLink>

                <NavLink
                    to={'/admin-panel/password'}
                >
                    Password
                </NavLink>
                <NavLink
                    to={'/admin-panel/registration-links'}
                >
                    AGENCY REGISTRATION
                </NavLink>

                <NavLink
                    to={'/admin-panel/impersonate'}
                >
                    Impersonations
                </NavLink>

                <NavLink
                    to={'/admin-panel/zth'}
                >
                    Zero to Hero
                </NavLink>

                {/*<NavLink*/}
                {/*    to={'/admin-panel/dashboard'}*/}
                {/*>*/}
                {/*    Dashboard*/}
                {/*</NavLink>*/}

                {/*<button*/}
                {/*    className={`${selectedTab === 'products' ? 'active' : ''}`}*/}
                {/*    onClick={() => setSelectedTab('products')}>*/}
                {/*    Products*/}
                {/*</button>*/}
            </div>}

            {/*{selectedTab === 'products' && <Products/>}*/}

            {admin && <Route exact path="/admin-panel" render={() => <Redirect to={'/admin-panel/general'}/>}/>}


            {admin && <Route exact path="/admin-panel/general" render={() => <>
                <GeneralUserInformation
                    data={userInformation}
                    onCheck={checkUserEmail}
                />

                <AccountLinks
                    data={accountLinks}
                    onCheck={checkAccountLinks}
                    userId={userInformation && userInformation.id}
                />

                <OptimizationJobs
                    data={optimizationJobs}
                    onCheck={checkOptimizationJobs}
                    onCheckChanges={checkOptimizationChanges}
                    onCheckConditions={checkOptimizationConditions}
                    userId={userInformation && userInformation.id}
                />

                {optimizationChanges && <OptimizationChanges
                    data={optimizationChanges}
                />}

                <OptimizationCondition
                    adGroupsList={adGroupsList}
                    adGroupsCanBeOptimized={adGroupsCanBeOptimized}
                    patsList={patsList}
                    userId={userInformation && userInformation.id}
                    profileId={accountLinks && accountLinks[0] && accountLinks[0].lwa_profile_id}

                    onCheck={checkOptimizationConditions}
                />
            </>}/>}

            {admin && <Route path="/admin-panel/reports" render={() => <Reports
                userId={userInformation && userInformation.id}
            />}/>}

            {admin && <Route path="/admin-panel/password" component={ChangePassword}/>}
            {admin && <Route path="/admin-panel/impersonate" component={Impersonations}/>}
            {admin && <Route path="/admin-panel/zth" render={() => <ZTH admin={true}/>}/>}
            <Route path="/advanced/zth" render={() => <ZTH admin={admin}/>}/>
            {admin && <Route path="/admin-panel/registration-links" component={AgencyUsers}/>}
            {admin && <Route path="/admin-panel/dashboard" component={AgencyDashboard}/>}
        </div>
    )
}


export default AdminPanel
