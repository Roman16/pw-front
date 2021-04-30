import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../Campaigns/CreateCampaignWindow/WindowHeader"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {useDispatch, useSelector} from "react-redux"
import {Select} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import '../../Campaigns/CreateCampaignWindow/CreateSteps/TargetingsDetails/TargetingsDetails.less'
import NegativeKeywords from "../../Campaigns/CreateCampaignWindow/CreateSteps/TargetingsDetails/NegativeKeywords"
import './CreateTargetingsWindow.less'
import {analyticsServices} from "../../../../services/analytics.services"

const Option = Select.Option

const CreateTargetingsWindow = () => {
    const [createData, setCreateData] = useState({
            keyword_targetings: [],
            negative_pats: [],
            negative_keywords: [],
            advertisingType: undefined,
            campaignId: undefined,
            adGroupId: undefined
        }),
        [campaigns, setCampaigns] = useState([]),
        [adGroups, setAdGroups] = useState([])

    const dispatch = useDispatch()

    const visibleWindow = useSelector(state => state.analytics.visibleCreationWindows.targetings),
        mainState = useSelector(state => state.analytics.mainState)

    const closeWindowHandler = () => {
        dispatch(analyticsActions.setVisibleCreateWindow({targetings: false}))
    }

    const changeCreateDataHandler = (value) => {
        setCreateData(prevState => ({...prevState, ...value}))
    }

    const onCreate = () => {

    }

    useEffect(() => {
        if (mainState.adGroupId) setCreateData(prevState => ({
            ...prevState,
            advertisingType: '444',
            selected_campaign: 'rrf',
            selected_ad_group: 'ttt'
        }))
        else if (mainState.campaignId) setCreateData(prevState => ({
            ...prevState,
            advertisingType: '444',
            selected_campaign: 'rrf',
        }))
    }, [mainState])

    const getCampaigns = async (type) => {
        try {
            const res = await analyticsServices.fetchCampaignsForTargeting({
                page: 1,
                type
            })

            setCampaigns(res.result)
        } catch (e) {
            console.log(e)
        }
    }

    const getAdGroups = async (id) => {
        try {
            const res = await analyticsServices.fetchAdGroupsForTargeting({
                page: 1,
                id
            })

            setAdGroups(res.result)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (createData.advertisingType) getCampaigns(createData.advertisingType)
    }, [createData.advertisingType])

    useEffect(() => {
        if (createData.campaignId) getAdGroups(createData.campaignId)
    }, [createData.campaignId])

    return (<ModalWindow
            className={'create-campaign-window create-portfolio-window create-campaign-window create-targetings-window'}
            visible={visibleWindow}
            footer={false}
            handleCancel={closeWindowHandler}
        >
            <WindowHeader
                title={'Create Targetings'}
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
                                        placeholder={'Select type'}
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
                                        <Option value={'SponsoredBrands'}>
                                            Sponsored Brands
                                        </Option>
                                    </CustomSelect>
                                </div>

                            </div>

                            <div className="col description">

                            </div>
                        </div>

                        <div className={`row`}>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="">Campaign</label>

                                    <CustomSelect
                                        showSearch
                                        placeholder={'Select campaign'}
                                        getPopupContainer={trigger => trigger.parentNode}
                                        value={createData.campaignId}
                                        onChange={(value) => changeCreateDataHandler({campaignId: value})}
                                        optionFilterProp="children"
                                        disabled={!createData.advertisingType}
                                    >
                                        {campaigns.map(i => <Option value={i.campaignId}>
                                            {i.name}
                                        </Option>)}
                                    </CustomSelect>
                                </div>
                            </div>

                            <div className="col description">

                            </div>
                        </div>
                    </>}

                    <div className={`row`}>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="">Ad Group</label>
                                <CustomSelect
                                    showSearch
                                    placeholder={'Select ad group'}
                                    getPopupContainer={trigger => trigger.parentNode}
                                    value={createData.adGroupId}
                                    onChange={(value) => changeCreateDataHandler({adGroupId: value})}
                                    optionFilterProp="children"
                                    disabled={!createData.campaignId}
                                >
                                    {adGroups.map(i => <Option value={i.adGroupId}>
                                        {i.name}
                                    </Option>)}
                                </CustomSelect>
                            </div>
                        </div>

                        <div className="col description">

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
                        disabled={!createData.adGroupId}
                        keywords={createData.negative_keywords}
                        onUpdate={changeCreateDataHandler}
                        confirmRemove={false}
                        title={'Keywords'}
                    />

                </div>
            </div>

            <div className="window-footer">
                <button
                    className="btn default"
                    onClick={onCreate}
                    disabled={createData.negative_keywords.length === 0}
                >
                    Create Targetings
                </button>
            </div>
        </ModalWindow>
    )
}

export default CreateTargetingsWindow
