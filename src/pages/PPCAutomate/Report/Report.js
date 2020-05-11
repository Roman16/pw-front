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
import {allReports} from "./ReportTable/Tables/AllReports";
import {keywordsOptimization} from "./ReportTable/Tables/KeywordsOptimization";
import {patsOptimization} from "./ReportTable/Tables/PATsOptimization";
import {dateField} from "./ReportTable/Tables/const";
import {allColumnsOrder} from "./ReportTable/Tables/allColumnsOrder";
import CustomTable from "../../../components/Table/CustomTable";

function Report() {
    const [currentTab, setCurrentTab] = useState('allReports'),
        [reportsList, setReportsList] = useState([]),
        [processing, setProcessing] = useState(false),
        [filters, setFilters] = useState([]),
        [paginationParams, setPaginationParams] = useState({
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

    const sortChangeHandler = (params) => {
        console.log(params);
    }

    const addFilterHandler = (filter) => {
        setFilters([
            ...filters,
            filter
        ])
    }

    const resetFiltersHandler = () => setFilters([]);

    const removeFilterHandler = (index) => setFilters(prevState => prevState.filter((item, itemIndex) => itemIndex !== index));

    const fetchReportsList = async () => {
        setProcessing(true);

        try {
            const res = await reportsServices.getAllReports();
            setReportsList(res);
        } catch (e) {
            console.log(e);
        }

        setProcessing(false);
    }

    useEffect(() => {
        fetchReportsList();
    }, [])

    const mainTabs = {
        'allReports': allReports(),
        "targetingImprovements": keywordsOptimization(),
        "searchTerms": patsOptimization(),
    };

    return (
        <div className="product-main basic-container reports-page">
            <FreeTrial product={'ppc'}/>

            <Tabs
                currentTab={currentTab}
                onChangeTab={changeTabHandler}
            />

            <Filters
                filters={filters}
                columns={[
                    ...allColumnsOrder
                        .map(column => (mainTabs[currentTab].find(item => item.key === column.key)))
                        .filter(column => column != null)
                ]}

                onAddFilter={addFilterHandler}
                onReset={resetFiltersHandler}
                onRemove={removeFilterHandler}
            />

            <ReportTable
                currentTab={currentTab}
                reportsList={reportsList}
                processing={processing}
                paginationParams={paginationParams}
                columns={[
                    ...allColumnsOrder
                        .map(column => (mainTabs[currentTab].find(item => item.key === column.key)))
                        .filter(column => column != null)
                ]}

                paginationChangeHandler={paginationChangeHandler}
                sortChangeHandler={sortChangeHandler}
            />

            <SubscriptionNotificationWindow product={'ppc'}/>
            <LoadingAmazonAccount/>
        </div>
    );
}

export default React.memo(Report);
