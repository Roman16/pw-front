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
import {allReports} from "./ReportTable/Tables/allReports";
import {targetingImprovements} from "./ReportTable/Tables/targetingImprovements";
import {searchTerms} from "./ReportTable/Tables/searchTerms";
import {useSelector} from "react-redux";
import axios from 'axios';


const CancelToken = axios.CancelToken;
let source = null;

function Report() {
    const [currentTab, setCurrentTab] = useState('all-reports'),
        [reportsList, setReportsList] = useState([]),
        [changesCounts, setChangesCounts] = useState({}),
        [processing, setProcessing] = useState(false),
        [filters, setFilters] = useState([]),
        [sorterColumn, setSorterColumn] = useState({
            column: 'datetime',
            type: 'desc'
        }),
        [totalSize, setTotalSize] = useState(0),
        [paginationParams, setPaginationParams] = useState({
            page: 1,
            pageSize: 10,
        });

    const {productId, selectedAll, productsFetching} = useSelector(state => ({
        productId: state.products.selectedProduct.id || null,
        selectedAll: state.products.selectedAll,
        productsFetching: state.products.fetching,
    }))

    const paginationChangeHandler = (params) => setPaginationParams(params);

    const changeTabHandler = (tab) => {
        setCurrentTab(tab);
        setPaginationParams({
            ...paginationParams,
            page: 1,
            totalSize: 0
        });
        setFilters([]);
        setTotalSize(0);
        setReportsList([]);
        setSorterColumn({
            column: 'datetime',
            type: 'desc'
        });

        document.querySelector('.table-overflow').scroll(0, 0);
    }

    const sortChangeHandler = (column) => {
        if (sorterColumn && sorterColumn.column === column) {
            if (sorterColumn.type === 'desc') {
                setSorterColumn({
                    column: column,
                    type: 'asc'
                })
            } else if (sorterColumn.type === 'asc') {
                setSorterColumn({
                    column: null,
                    type: 'desc'
                })
            }
        } else {
            setSorterColumn({
                column: column,
                type: 'desc'
            })
        }
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
        source && source.cancel();
        source = CancelToken.source();

        try {
            const res = await reportsServices.getAllReports(
                currentTab,
                {
                    id: selectedAll ? 'all' : productId,
                    ...paginationParams,
                    sorterColumn,
                    filters
                },
                source.token
            );

            setReportsList(res.data);
            setChangesCounts(res.counts);

            if(currentTab === 'all-reports') {
                setTotalSize(res.counts.all.total_count)
            } else if(currentTab === 'targeting-improvements') {
                setTotalSize(res.counts.targeting_improvements.total_count)
            }else if(currentTab === 'search-terms') {
                setTotalSize(res.counts.search_term.total_count)
            }
        } catch (e) {
            console.log(e);
        }

        setProcessing(false);
    }

    useEffect(() => {
        if ((productId !== null || selectedAll) && !productsFetching)
            fetchReportsList();
    }, [productId, currentTab, selectedAll, paginationParams, sorterColumn, filters])

    const mainTabs = {
        'all-reports': allReports(),
        "targeting-improvements": targetingImprovements(),
        "search-terms": searchTerms(),
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
                columns={mainTabs[currentTab]}
                currentTab={currentTab}

                onAddFilter={addFilterHandler}
                onReset={resetFiltersHandler}
                onRemove={removeFilterHandler}
            />

            <ReportTable
                currentTab={currentTab}
                reportsList={reportsList}
                processing={processing}
                paginationParams={paginationParams}
                columns={mainTabs[currentTab]}
                sorterColumn={sorterColumn}
                totalSize={totalSize}

                paginationChangeHandler={paginationChangeHandler}
                sortChangeHandler={sortChangeHandler}
                addFilterHandler={addFilterHandler}
            />

            <SubscriptionNotificationWindow product={'ppc'}/>
            <LoadingAmazonAccount/>
        </div>
    );
}

export default React.memo(Report);
