import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../Campaigns/CreateCampaignWindow/WindowHeader"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {useDispatch, useSelector} from "react-redux"
import {Select, Spin} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import AllProducts from "../../Campaigns/CreateCampaignWindow/CreateSteps/ProductAdsDetails/AllProducts"
import SelectedProduct from "../../Campaigns/CreateCampaignWindow/CreateSteps/ProductAdsDetails/SelectedProduct"
import '../../Campaigns/CreateCampaignWindow/CreateSteps/ProductAdsDetails/ProductAdsDetails.less'
import './CreateProductAdsWindow.less'
import {analyticsServices} from "../../../../services/analytics.services"
import {InfinitySelect} from "../../Targetings/CreateTargetingsWindow/CreateTargetingsWindow"
import {notification} from "../../../../components/Notification"

const Option = Select.Option

const CreateProductAdsWindow = ({location, onReloadList}) => {
    const [createData, setCreateData] = useState({
            selectedProductAds: [],
            campaignId: undefined,
            adGroupId: undefined,
            advertisingType: undefined
        }),
        [campaigns, setCampaigns] = useState([]),
        [adGroups, setAdGroups] = useState([]),
        [createProcessing, setCreateProcessing] = useState(false)

    const dispatch = useDispatch()

    const visibleWindow = useSelector(state => state.analytics.visibleCreationWindows.productAds),
        mainState = useSelector(state => state.analytics.mainState),
        stateDetails = useSelector(state => state.analytics.stateDetails)

    const closeWindowHandler = () => {
        dispatch(analyticsActions.setVisibleCreateWindow({productAds: false}))
    }

    const changeCreateDataHandler = (value) => {
        setCreateData(prevState => ({...prevState, ...value}))
    }

    const onCreate = async () => {
        setCreateProcessing(true)

        try {
            await analyticsServices.exactCreate(location, {
                campaignId: createData.campaignId,
                adGroupId: createData.adGroupId,
                advertisingType: createData.advertisingType,
                sku: createData.selectedProductAds[0].sku,
                state: 'enabled'
            })

            closeWindowHandler()
            onReloadList()
            notification.success({title: 'Product Ads created'})
        } catch (e) {
            console.log(e)
        }

        setCreateProcessing(false)
    }

    const changeCampaignHandler = value => {
        setAdGroups([])
        setCreateData(prevState => ({
            ...prevState,
            campaignId: value,
            adGroupId: undefined
        }))
    }
    const changeAdGroupHandler = value => {
        setCreateData(prevState => ({
            ...prevState,
            adGroupId: value
        }))
    }

    const getCampaigns = async (type, page = 1, cb, searchStr = undefined) => {
        if (createData.advertisingType) {
            try {
                const res = await analyticsServices.fetchCampaignsForTargeting({
                    page,
                    type: type || createData.advertisingType,
                    name: searchStr
                })

                if (page === 1) setCampaigns([...res.result])
                else setCampaigns([...campaigns, ...res.result])
                cb && cb(res.result.length !== 0)
            } catch (e) {
                console.log(e)
            }
        } else {
            setCampaigns([])
        }
    }

    const getAdGroups = async (id, page = 1, cb, searchStr = undefined) => {
        if (createData.campaignId) {
            try {
                const res = await analyticsServices.fetchAdGroupsForTargeting({
                    page,
                    id: id || createData.campaignId,
                    name: searchStr
                })

                setAdGroups(res.result)

                if (page === 1) setAdGroups([...res.result])
                else setAdGroups([...adGroups, ...res.result])
                cb && cb(res.result.length !== 0)
            } catch (e) {
                console.log(e)
            }
        } else {
            setAdGroups([])
        }
    }


    useEffect(() => {
        if (mainState.adGroupId) setCreateData(prevState => ({
            ...prevState,
            advertisingType: stateDetails.advertisingType,
            campaignId: mainState.campaignId,
            adGroupId: mainState.adGroupId
        }))
        else if (mainState.campaignId) setCreateData(prevState => ({
            ...prevState,
            advertisingType: stateDetails.advertisingType,
            campaignId: mainState.campaignId,
        }))
    }, [mainState])

    useEffect(() => {
        getCampaigns()
    }, [createData.advertisingType])

    useEffect(() => {
        getAdGroups()
    }, [createData.campaignId])

    return (<ModalWindow
            className={'create-campaign-window create-portfolio-window create-product-ads-window'}
            visible={visibleWindow}
            footer={false}
            handleCancel={closeWindowHandler}
        >
            <WindowHeader
                title={'Create Product Ads'}
                onClose={closeWindowHandler}
            />

            <div className="create-steps">
                {!mainState.adGroupId && <>
                    {!mainState.campaignId && <>
                        <div className={`row`}>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="">Advertising Type</label>
                                    <CustomSelect
                                        placeholder={'Select by'}
                                        getPopupContainer={trigger => trigger.parentNode}
                                        onChange={(value) => changeCreateDataHandler({advertisingType: value})}
                                        value={createData.advertisingType}
                                    >
                                        <Option value={'SponsoredProducts'}>
                                            Sponsored Products
                                        </Option>

                                        <Option value={'SponsoredDisplay'}>
                                            Sponsored Display
                                        </Option>
                                    </CustomSelect>
                                </div>

                            </div>

                            <div className="col description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus
                                consequat ornare laoreet duis tellus dignissim nisl rhoncus. Adipiscing at dis a id
                                urna.
                                Aliquam
                                massa
                                faucibus blandit justo. Sed et orci tortor pellentesque sed
                            </div>
                        </div>

                        <div className={`row`}>
                            <div className="col">
                                <div className="form-group">
                                    <InfinitySelect
                                        label={'Select Campaign'}
                                        placeholder={'Select campaign'}
                                        value={createData.campaignId}
                                        onChange={changeCampaignHandler}
                                        disabled={!createData.advertisingType}
                                        children={campaigns}
                                        onLoadMore={(page, cb, searchStr) => getCampaigns(createData.advertisingType, page, cb, searchStr)}
                                        reloadPage={createData.advertisingType}
                                        dataKey={'campaignId'}
                                        notFoundContent={'No campaigns'}
                                    />
                                </div>
                            </div>

                            <div className="col description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus
                                consequat ornare laoreet duis tellus dignissim nisl rhoncus. Adipiscing at dis a id
                                urna.
                                Aliquam
                                massa
                                faucibus blandit justo. Sed et orci tortor pellentesque sed
                            </div>
                        </div>
                    </>}

                    <div className={`row`}>
                        <div className="col">
                            <div className="form-group">
                                <InfinitySelect
                                    label={'Ad Group'}
                                    placeholder={'Select ad group'}
                                    value={createData.adGroupId}
                                    onChange={changeAdGroupHandler}
                                    disabled={!createData.campaignId}
                                    reloadPage={createData.campaignId}
                                    children={adGroups}
                                    onLoadMore={(page, cb, searchStr) => getAdGroups(createData.campaignId, page, cb, searchStr)}
                                    dataKey={'adGroupId'}
                                    notFoundContent={'No ad groups'}
                                />
                            </div>
                        </div>

                        <div className="col description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna netus
                            consequat ornare laoreet duis tellus dignissim nisl rhoncus. Adipiscing at dis a id urna.
                            Aliquam
                            massa
                            faucibus blandit justo. Sed et orci tortor pellentesque sed
                        </div>
                    </div>
                </>}

                <div className="product-ads-details-step">
                    <h3>Products</h3>

                    <div className={`row  ${!createData.adGroupId ? 'disabled' : ''}`}>
                        <AllProducts
                            createData={createData}
                            disabledBlock={!createData.adGroupId}

                            onChange={changeCreateDataHandler}
                        />

                        <SelectedProduct
                            selectedProducts={createData.selectedProductAds}

                            onChange={changeCreateDataHandler}
                        />
                    </div>
                </div>
            </div>

            <div className="window-footer">
                <button
                    className="btn default"
                    onClick={onCreate}
                    disabled={createProcessing || createData.selectedProductAds.length === 0}
                >
                    Create Product Ads

                    {createProcessing && <Spin size={'small'}/>}
                </button>
            </div>
        </ModalWindow>
    )
}

export default CreateProductAdsWindow
