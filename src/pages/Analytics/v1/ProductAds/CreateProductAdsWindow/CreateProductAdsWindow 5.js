import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../Campaigns/CreateCampaignWindow/WindowHeader"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {useDispatch, useSelector} from "react-redux"
import {Select} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import AllProducts from "../../Campaigns/CreateCampaignWindow/CreateSteps/ProductAdsDetails/AllProducts"
import SelectedProduct from "../../Campaigns/CreateCampaignWindow/CreateSteps/ProductAdsDetails/SelectedProduct"
import '../../Campaigns/CreateCampaignWindow/CreateSteps/ProductAdsDetails/ProductAdsDetails.less'
import './CreateProductAdsWindow.less'

const Option = Select.Option

const CreateProductAdsWindow = () => {
    const [createData, setCreateData] = useState({
        selectedProductAds: []
    })

    const dispatch = useDispatch()

    const visibleWindow = useSelector(state => state.analytics.visibleCreationWindows.productAds),
        mainState = useSelector(state => state.analytics.mainState)

    const closeWindowHandler = () => {
        dispatch(analyticsActions.setVisibleCreateWindow({productAds: false}))
    }

    const changeCreateDataHandler = (value) => {
        setCreateData(prevState => ({...prevState, ...value}))
    }

    const onCreate = () => {

    }

    useEffect(() => {
        if (mainState.adGroupId) setCreateData(prevState => ({
            ...prevState,
            advertising_type: '444',
            selected_campaign: 'rrf',
            selected_ad_group: 'ttt'
        }))
        else if (mainState.campaignId) setCreateData(prevState => ({
            ...prevState,
            advertising_type: '444',
            selected_campaign: 'rrf',
        }))
    }, [mainState])

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
                                        onChange={(value) => changeCreateDataHandler({advertising_type: value})}
                                        value={createData.advertising_type}
                                    >
                                        <Option value={'sponsored_products'}>
                                            Sponsored Products
                                        </Option>

                                        <Option value={'sponsored_display'}>
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
                                    <label htmlFor="">Select Campaign</label>
                                    <CustomSelect
                                        placeholder={'Select by'}
                                        getPopupContainer={trigger => trigger.parentNode}
                                        onChange={(value) => changeCreateDataHandler({selected_campaign: value})}
                                        value={createData.selected_campaign}
                                        disabled={!createData.advertising_type}
                                    >
                                        <Option value={'445'}>
                                            Campaign
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
                    </>}

                    <div className={`row`}>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="">Select Ad Group</label>
                                <CustomSelect
                                    placeholder={'Select by'}
                                    getPopupContainer={trigger => trigger.parentNode}
                                    onChange={(value) => changeCreateDataHandler({selected_ad_group: value})}
                                    value={createData.selected_ad_group}
                                    disabled={!createData.selected_campaign}
                                >
                                    <Option value={'445'}>
                                        Ad Group
                                    </Option>
                                </CustomSelect>
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

                    <div className={`row  ${!createData.selected_ad_group ? 'disabled' : ''}`}>
                        <AllProducts
                            createData={createData}
                            disabledBlock={!createData.selected_ad_group}

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
                >
                    Create Product Ads
                </button>
            </div>
        </ModalWindow>
    )
}

export default CreateProductAdsWindow
