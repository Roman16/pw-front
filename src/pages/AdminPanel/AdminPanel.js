import React, {useState, Fragment} from "react";
import './AdminPanel.less';
import {adminServices} from "../../services/admin.services";
import GeneralUserInformation from "./UserInformation";
import AccountLinks from "./AccountLinks";
import OptimizationJobs from "./OptimizationJobs";
import OptimizationChanges from "./OptimizationChanges";
import OptimizationCondition from "./OptimizationCondition";

const AdminPanel = () => {
    const [userInformation, setUserInformation] = useState(undefined);
    const [accountLinks, setAccountLinks] = useState(undefined);
    const [optimizationJobs, setOptimizationJobs] = useState(undefined);
    const [optimizationChanges, setOptimizationChanges] = useState(undefined);
    const [optimizationConditions, setOptimizationConditions] = useState(undefined);

    const checkUserEmail = (email) => {
        adminServices.checkUserEmail(email)
            .then(res => {
                setUserInformation(res.data.user);
                checkAccountLinks({id: res.data.user.id});
                checkOptimizationJobs({userId: res.data.user.id});
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setUserInformation(error.response.data.message);
                }
            })
    };

    const checkAccountLinks = (data) => {
        adminServices.checkAccountLinks(data)
            .then(res => {
                setAccountLinks(res.data['linked-accounts']);
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setAccountLinks(error.response.data.message);
                }
            })
    };

    const checkOptimizationJobs = (data) => {
        adminServices.checkOptimizationJobs(data)
            .then(res => {
                setOptimizationJobs(res.data);
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setOptimizationJobs(error.response.data.message);
                }
            })
    };

    const checkOptimizationChanges = (productId, asin, marketplace_id) => {
        adminServices.checkOptimizationChanges({
            userId: userInformation.id,
            productId,
            asin,
            marketplace_id
        })
            .then(res => {
                setOptimizationChanges(res);
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setOptimizationChanges(error.response.data.message);
                }
            })
    };

    const checkOptimizationConditions = (sku) => {
        adminServices.checkOptimizationConditions({
            userId: userInformation.id,
            profile_id: accountLinks[0].lwa_profile_id,
            sku,
        })
            .then(res => {
                setOptimizationConditions([res]);
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setOptimizationConditions(error.response.data.message);
                }
            })
    };


    return (
        <div className="admin-panel">
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
                data={optimizationConditions}
            />
        </div>
    )
};


export default AdminPanel;