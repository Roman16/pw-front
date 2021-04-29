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

const Option = Select.Option

const CreateTargetingsWindow = () => {
    const [createData, setCreateData] = useState({
        keyword_targetings: [],
        negative_pats: [],
        negative_keywords: [],
    })

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

                            </div>
                        </div>

                        <div className={`row`}>
                            <div className="col">
                                <div className="form-group">
                                    <label htmlFor="">Campaign</label>
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

                            </div>
                        </div>
                    </>}

                    <div className={`row`}>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="">Ad Group</label>
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
