import React, {useEffect, useState} from "react"
import './JungleScoutReport.less'
import {AccountStatistic} from "../../JungleScoutReport/AccountStatistic/AccountStatistic"
import {AdsStatistic} from "../../JungleScoutReport/AdsStatistic/AdsStatistic"
import {JungleScoutStatistic} from "../../JungleScoutReport/JungleScoutStatistic/JungleScoutStatistic"
import '../../JungleScoutReport/JungleScoutReport.less'
import {SelectSegment} from "./SelectSegment/SelectSegment"
import {jungleScoutReportServices} from "../../../services/jungle.scout.report.services"
import RouteLoader from "../../../components/RouteLoader/RouteLoader"
import {Actions} from "./Actions/Actions"
import {notification} from "../../../components/Notification"

export const JungleScoutReport = () => {
    const [reportData, setReportData] = useState({
            //1 section
            loaded: false,
            common_metrics: {
                metrics: [],
                previous_month_metrics: [],
                chart: []
            },
            product_distribution: {
                total_orders_count: [],
                total_sales: [],
            },
            //2 section
            advertising_metrics: {
                metrics: [],
                previous_month_metrics: [],
                chart: []
            },
            advertising_type_distribution: [],
            top_sales_campaigns: [],
            //3 section
            revenue_trend: [],
            brand_sales: [],
            products_revenue: [],
            //-------------------------------------------------
            comments: {
                advertising_metrics_comment: '',
                advertising_type_distribution_comment: '',
                brand_sales_comment: '',
                common_metrics_comment: '',
                product_distribution_comment: '',
                products_revenue_comment: '',
                revenue_trend_comment: '',
                top_sales_campaigns_comment: ''
            }
        }),
        [selectedReportId, setSelectedReportId] = useState(),
        [selectedReportStatus, setSelectedReportStatus] = useState(),
        [processing, setProcessing] = useState(false),
        [saveProcessing, setSaveProcessing] = useState(false),
        [approveProcessing, setApproveProcessing] = useState(false),
        [attributionWindow, setAttributionWindow] = useState(7)

    const getReportData = async () => {
        setProcessing(true)

        try {
            const {result} = await jungleScoutReportServices.getUserReportData(selectedReportId, attributionWindow)
            setReportData({...result, loaded: true})
        } catch (e) {

        }

        setProcessing(false)
    }

    const changeReportDataHandler = (data) => {
        setReportData(prevState => ({
            ...prevState,
            comments: {
                ...prevState.comments,
                ...data
            }
        }))
    }

    const saveReportHandler = async () => {
        setSaveProcessing(true)

        try {
            await jungleScoutReportServices.saveUserReport(selectedReportId, {...reportData.comments})
            notification.success({title: 'Rule success saved'})
        } catch (e) {
            console.log(e)
        }

        setSaveProcessing(false)
    }
    const approveReportHandler = async () => {
        setApproveProcessing(true)

        try {
            await jungleScoutReportServices.saveUserReport(selectedReportId, {approved: true})
            setSelectedReportStatus('approved')
            notification.success({title: 'Rule success approved'})
        } catch (e) {
            console.log(e)
        }

        setApproveProcessing(false)
    }

    const disapproveReportHandler = async () => {
        setApproveProcessing(true)

        try {
            await jungleScoutReportServices.saveUserReport(selectedReportId, {approved: false})
            setSelectedReportStatus('disapproved')
            notification.success({title: 'Rule success disapproved'})
        } catch (e) {

        }

        setApproveProcessing(false)
    }

    useEffect(() => {
        selectedReportId && getReportData()
    }, [selectedReportId, attributionWindow])

    return (<div className={'jungle-scout-report-page monthly-report-page'}>
        <SelectSegment
            reportId={selectedReportId}
            attributionWindow={attributionWindow}

            onChangeId={(id, status) => {
                setSelectedReportId(id)
                setSelectedReportStatus(status)
            }}
            onChangeAW={setAttributionWindow}
        />

        <div className="work-section">
            {reportData.loaded && <div className="container">
                <AccountStatistic
                    editable={true}
                    data={{
                        ...reportData.common_metrics, ...reportData.product_distribution,
                        advertising_type_distribution: reportData.advertising_type_distribution
                    }}
                    comments={reportData.comments}

                    onChange={changeReportDataHandler}
                />

                <AdsStatistic
                    editable={true}

                    data={{...reportData.advertising_metrics, ...reportData}}
                    comments={reportData.comments}

                    onChange={changeReportDataHandler}
                />

                <JungleScoutStatistic
                    editable={true}

                    data={reportData}
                    comments={reportData.comments}

                    onChange={changeReportDataHandler}
                />

                <Actions
                    status={selectedReportStatus}
                    saveProcessing={saveProcessing}
                    approveProcessing={approveProcessing}

                    onSave={saveReportHandler}
                    onApprove={approveReportHandler}
                    onDisapprove={disapproveReportHandler}
                />
            </div>}

            {processing && <RouteLoader/>}
        </div>
    </div>)
}