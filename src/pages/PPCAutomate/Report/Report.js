import React, {useEffect, useState} from 'react';
import ReportTable from './ReportTable/ReportTable';
import SubscriptionNotificationWindow
    from "../../../components/ModalWindow/InformationWindows/SubscriptionNotificationWindow";
import LoadingAmazonAccount from "../../../components/ModalWindow/InformationWindows/LoadingAmazonAccountWindow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tabs from "./Tabs/Tabs";
import FreeTrial from "../../../components/FreeTrial/FreeTrial";
import Filters from "./Filters/Filters";
import {reportsServices} from "../../../services/reports.services";

function Report() {
    const [currentTab, setCurrentTab] = useState('allReports');
    const [reportsList, setReportsList] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [paginationParams, setPaginationParams] = useState({
        page: 1,
        pageSize: 10,
        totalSize: 0
    })

    const paginationChangeHandler = (params) => setPaginationParams(params)
    const changeTabHandler = (tab) => {
        setCurrentTab(tab);
        setPaginationParams({
            ...paginationParams,
            page: 1,
            totalSize: 0
        })
    }

    const fetchReportsList = async () => {
        setProcessing(true);

        try {
            const res = await reportsServices.getAllReports();
            setReportsList(res);
            console.log(res);
        } catch (e) {
            console.log(e);
        }

        setProcessing(false);
    }

    useEffect(() => {
        fetchReportsList();
    }, [])

    return (
        <div className="product-main basic-container reports-page">
            <FreeTrial product={'ppc'}/>

            <Tabs
                currentTab={currentTab}
                onChangeTab={changeTabHandler}
            />

            <Filters/>

            <ReportTable
                currentTab={currentTab}
                reportsList={reportsList}
                processing={processing}
                paginationParams={paginationParams}

                paginationChangeHandler={paginationChangeHandler}
            />

            <SubscriptionNotificationWindow product={'ppc'}/>
            <LoadingAmazonAccount/>
        </div>
    );
}

export default React.memo(Report);
