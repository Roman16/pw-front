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

const CancelToken = axios.CancelToken
let source = null

const {Search} = Input

const Settings = (props) => {
    const [selectedTab, setTab] = useState('zth-products'),
        [productsList, setList] = useState([]),
        [processing, setProcessing] = useState(false),
        [searchStr, setSearchStr] = useState(''),
        [tokens, setTokens] = useState(null),
        [totalSize, setTotalSize] = useState(0),
        [visibleSuccessCreateWindow, setVisibleSuccessCreateWindow] = useState(false),
        [visibleSuccessPaymentWindow, setVisibleSuccessPaymentWindow] = useState(false),
        [paginationOptions, setPaginationOptions] = useState({
            page: 1,
            pageSize: 10,
        })


    const changeSearchHandler = debounce(500, false, str => {
        setSearchStr(str)
        setPaginationOptions({
            ...paginationOptions,
            page: 1
        })
    })


    const changePaginationHandler = (params) => setPaginationOptions(params)

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
                ...paginationOptions,
                searchStr: searchStr,
                ungroupVariations: 0,
                cancelToken: source.token
            })

            setList(res.result || [])
            setTotalSize(res.totalSize)

            setProcessing(false)

        } catch (e) {
            setList([])
        }
    }


    useEffect(() => {
        getProductsList()
    }, [paginationOptions])


    useEffect(() => {
        zthServices.checkIncompleteBatch()
            .then(res => {
                if (res.result) {
                    setTokens(res.result.available_tokens)
                }
            })

        if (props.match.params.status) {
            if (props.match.params.status === 'create-success' || props.match.params.status === 'payment-success' ) setVisibleSuccessCreateWindow(true)
        }
    }, [])


    return (
        <div className="zth-settings">
            {selectedTab === 'zth-products' && <div className="description">
                Make sure you paused the SKU’s with Zero to Hero campaigns in other Sponsored Products Ad Campaigns that
                weren’t created by our software to prevent the competition.
            </div>}

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

                {tokens > 0 && <div className="credits-count">
                    ZTH Credits Left:

                    <span>{tokens}</span>
                </div>}
            </div>

            <ProductsList
                productsList={productsList}
                selectedTab={selectedTab}
                processing={processing}
                paginationOptions={paginationOptions}
                totalSize={totalSize}
                onChangePagination={changePaginationHandler}
            />

            <CreateSuccessWindow
                visible={visibleSuccessCreateWindow}

                onClose={() => setVisibleSuccessCreateWindow(false)}
            />

            <PaymentSuccessWindow
                visible={visibleSuccessCreateWindow}

                onClose={() => setVisibleSuccessCreateWindow(false)}
            />
        </div>
    )
}

export default Settings