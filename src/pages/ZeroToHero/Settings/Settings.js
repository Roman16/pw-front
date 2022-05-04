import React, {useEffect, useState} from "react"
import './Settings.less'
import {Input} from "antd"
import ProductsList from "./ProductsList"
import {SVG} from "../../../utils/icons"
import {debounce} from "throttle-debounce"
import {zthServices} from "../../../services/zth.services"
import axios from "axios"
import CreateSuccessWindow from "./CreateSuccessWindow"
import {history} from "../../../utils/history"
import PaymentSuccessWindow from "./PaymentSuccessWindow"
import {Link} from "react-router-dom"
import {notification} from "../../../components/Notification"

const CancelToken = axios.CancelToken
let source = null

const {Search} = Input

let intervalId = null

let pagination = {
        page: 1,
        pageSize: 10
    },
    search = ''

const Settings = (props) => {
    const [selectedTab, setTab] = useState('zth-products'),
        [productsList, setList] = useState([]),
        [processing, setProcessing] = useState(false),
        [deleteProcessing, setDeleteProcessing] = useState(false),
        [searchStr, setSearchStr] = useState(''),
        [tokens, setTokens] = useState(null),
        [totalSize, setTotalSize] = useState(0),
        [visibleSuccessCreateWindow, setVisibleSuccessCreateWindow] = useState(props.match.params.status === 'create-success'),
        [visibleSuccessPaymentWindow, setVisibleSuccessPaymentWindow] = useState(props.match.params.status === 'payment-success'),
        [paginationOptions, setPaginationOptions] = useState({
            page: 1,
            pageSize: 10,
        })


    const changeSearchHandler = debounce(500, false, str => {
        setSearchStr(str)
        search = str
        setPaginationOptions({
            ...paginationOptions,
            page: 1
        })
    })


    const changePaginationHandler = (params) => {
        pagination = params
        setPaginationOptions(params)
    }

    const onDeleteJob = async (id) => {
        setDeleteProcessing(true)

        try {
            await zthServices.deleteCreatedJob(id)
            console.log(id)
        } catch (e) {

        }
        setDeleteProcessing(false)
    }

    function changeTabHandler(tab) {
        setList([])

        setTab(tab)
        setSearchStr('')
        setPaginationOptions({
            ...paginationOptions,
            page: 1
        })
    }

    const getProductsList = async () => {
        setProcessing(true)
        source && source.cancel()
        source = CancelToken.source()

        try {
            setProcessing(true)
            const res = await zthServices[selectedTab === 'zth-products' ? 'getZthProducts' : 'getAllProducts']({
                ...pagination,
                searchStr: searchStr || search,
                ungroupVariations: 0,
                cancelToken: source.token
            })

            setList(res.result.products || [])
            setTotalSize(res.result.totalSize)

            setProcessing(false)

        } catch (e) {
            setList([])
        }
    }


    useEffect(() => {
        getProductsList()
    }, [paginationOptions])


    useEffect(() => {
        if (selectedTab === 'zth-products') {
            notification.warning({description: 'Make sure you paused the SKU’s with Zero to Hero campaigns in other Sponsored Products Ad Campaigns that weren’t created by our software to prevent the competition.'})

            intervalId = setInterval(() => {
                getProductsList()
            }, 30000)
        } else {
            clearInterval(intervalId)
        }
    }, [selectedTab])

    useEffect(() => {
        return (() => clearInterval(intervalId))
    }, [])

    return (
        <div className="zth-settings">
            <ul className="tabs">
                <li
                    className={`tab ${selectedTab === 'zth-products' ? 'active' : ''}`}
                    onClick={() => changeTabHandler('zth-products')}
                >
                    Zero to Hero Products

                    <div className="border"/>
                </li>

                <li
                    className={`tab ${selectedTab === 'other-products' ? 'active' : ''}`}
                    onClick={() => changeTabHandler('other-products')}
                >
                    Other Products

                    <div className="border"/>
                </li>
            </ul>

            <div className="filters">
                <div className="form-group">
                    <Search
                        className="search-field"
                        placeholder={'Search'}
                        onChange={e => changeSearchHandler(e.target.value)}
                        data-intercom-target='search-field'
                        suffix={<SVG id={'search'}/>}
                    />
                </div>

                {selectedTab === 'zth-products' && <Link to={'/zero-to-hero/campaign'} className="sds-btn default">
                    <SVG id={'plus-white'}/>
                    Create New
                </Link>}
            </div>

            <ProductsList
                productsList={productsList}
                selectedTab={selectedTab}
                processing={processing}
                deleteProcessing={deleteProcessing}
                paginationOptions={paginationOptions}
                totalSize={totalSize}

                onChangePagination={changePaginationHandler}
                onDeleteJob={onDeleteJob}
            />

            <CreateSuccessWindow
                visible={visibleSuccessCreateWindow}
                onClose={() => {
                    setVisibleSuccessCreateWindow(false)
                    history.push('/zero-to-hero/settings')
                }}
            />

            <PaymentSuccessWindow
                visible={visibleSuccessPaymentWindow}
                onClose={() => {
                    setVisibleSuccessPaymentWindow(false)
                    history.push('/zero-to-hero/settings')
                }}
            />
        </div>
    )
}

export default Settings