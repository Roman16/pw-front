import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../Campaigns/CreateCampaignWindow/WindowHeader"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {useDispatch, useSelector} from "react-redux"
import {Select} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import AllProducts from "../../Campaigns/CreateCampaignWindow/CreateSteps/ProductAdsDetails/AllProducts"
import SelectedProduct from "../../Campaigns/CreateCampaignWindow/CreateSteps/ProductAdsDetails/SelectedProduct"
import '../../Campaigns/CreateCampaignWindow/CreateSteps/TargetingsDetails/TargetingsDetails.less'
import KeywordTargetingsList
    from "../../Campaigns/CreateCampaignWindow/CreateSteps/TargetingsDetails/KeywordTargetingsList"
import NegativePats from "../../Campaigns/CreateCampaignWindow/CreateSteps/TargetingsDetails/NegativePats"
import NegativeKeywords from "../../Campaigns/CreateCampaignWindow/CreateSteps/TargetingsDetails/NegativeKeywords"
import '../../Targetings/CreateTargetingsWindow/CreateTargetingsWindow.less'
const Option = Select.Option

const CreateNegativeTargetingsWindow = () => {
    const [createData, setCreateData] = useState({
        keyword_targetings: [],
        negative_pats: [],
        negative_keywords: [],
    })

    const dispatch = useDispatch()

    const visibleWindow = useSelector(state => state.analytics.visibleCreationWindows.negativeTargetings),
        mainState = useSelector(state => state.analytics.mainState)

    const closeWindowHandler = () => {
        dispatch(analyticsActions.setVisibleCreateWindow({negativeTargetings: false}))
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
            className={'create-campaign-window create-portfolio-window create-campaign-window create-targetings-window'}
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

                <div className="targetings-details-step">
                    {/*<KeywordTargetingsList*/}
                    {/*    disabled={!createData.selected_ad_group}*/}
                    {/*    keywords={createData.keyword_targetings}*/}
                    {/*    onUpdate={changeCreateDataHandler}*/}
                    {/*    withMatchType={createData.t_targeting_type === 'keyword'}*/}
                    {/*/>*/}

                    <NegativeKeywords
                        disabled={!createData.selected_ad_group}
                        keywords={createData.negative_keywords}
                        onUpdate={changeCreateDataHandler}
                        title={'Negative Keywords'}
                    />

                </div>
            </div>

            <div className="window-footer">
                <button
                    className="btn default"
                    onClick={onCreate}
                >
                    Create Targetings
                </button>
            </div>
        </ModalWindow>
    )
}

export default CreateNegativeTargetingsWindow
