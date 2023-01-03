import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import WindowHeader from "../../Campaigns/CreateCampaignWindow/WindowHeader"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {useDispatch, useSelector} from "react-redux"
import CreateProcessing from "../../Campaigns/CreateCampaignWindow/CreateProcessing"
import WindowFooter from "../../Campaigns/CreateCampaignWindow/WindowFooter"
import ProductAdsDetails from "../../Campaigns/CreateCampaignWindow/CreateSteps/ProductAdsDetails/ProductAdsDetails"
import TargetingsDetails from "../../Campaigns/CreateCampaignWindow/CreateSteps/TargetingsDetails/TargetingsDetails"
import CreateCampaignOverview from "../../Campaigns/CreateCampaignWindow/CreateSteps/CreateCampaignOverview"
import AdGroupDetails from "./AdGroupDetails"
import {analyticsServices} from "../../../../services/analytics.services"
import {notification} from "../../../../components/Notification"


const CreateAdGroupWindow = () => {
    const [createAdGroupData, setCreateAdGroupData] = useState({
            advertisingType: undefined,
            name: '',
            defaultBid: 0,
            campaignId: undefined,
            state: 'enabled',
            calculatedTargetingType: 'auto',
            //product ads
            create_product_ads: true,
            selectedProductAds: [],
            //targetings
            create_targetings: true,
            negative_keywords: [],
            negative_pats: [],
            keyword_targetings: [],
            t_targeting_type: 'keyword',
            targeting_bid: 0,
            enabled_target_close_match: true,
            target_close_match: 0,
            enabled_target_loose_match: true,
            target_loose_match: 0,
            enabled_target_substitutes: true,
            target_substitutes: 0,
            enabled_target_complements: true,
            target_complements: 0,
        }),
        [currentStep, setCurrentStep] = useState(0),
        [skippedSteps, setSkippedSteps] = useState([]),
        [processSteps, setProcessSteps] = useState([]),
        [finishedSteps, setFinishedSteps] = useState([]),
        [campaigns, setCampaigns] = useState([])

    const steps = [
        'Ad Group',
        'Product Ads',
        'Targetings',
        'Overview',
    ]


    const dispatch = useDispatch()

    const visibleWindow = useSelector(state => state.analytics.visibleCreationWindows.adGroup),
        mainState = useSelector(state => state.analytics.mainState)

    const closeWindowHandler = () => {
        dispatch(analyticsActions.setVisibleCreateWindow({adGroup: false}))
    }

    const goToSelectStep = (step) => {
        if (finishedSteps.includes(step) || processSteps.includes(step)) {
            setProcessSteps(prevState => [...prevState, currentStep])
            setCurrentStep(step)
        }
    }

    const goToNextStepHandler = () => {
        setFinishedSteps(prevState => [...prevState, currentStep])
        setCurrentStep(prevState => prevState + 1)
    }

    const goToPreviousStepHandler = () => {
        setProcessSteps(prevState => [...prevState, currentStep])

        const checkStep = (step) => {
            if (skippedSteps.includes(step)) {
                checkStep(step - 1)
            } else {
                setCurrentStep(step)
            }
        }

        checkStep(currentStep - 1)
    }

    const changeCreateDataHandler = (value) => {
        setCreateAdGroupData(prevState => ({...prevState, ...value}))
    }

    const createAdGroupHandler = async () => {
        try {
            await analyticsServices.exactCreate('ad-groups', {
                advertisingType: createAdGroupData.advertisingType,
                name: createAdGroupData.name,
                defaultBid: createAdGroupData.defaultBid,
                campaignId: createAdGroupData.campaignId,
                state: createAdGroupData.state,
            })
            closeWindowHandler()
            notification.success({title: 'Ad Group created'})
        } catch (e) {
            console.log(e)
        }
    }

    const getCampaigns = async (type, page = 1, cb, searchStr = undefined) => {
        if (createAdGroupData.advertisingType) {
            try {
                const res = await analyticsServices.fetchCampaignsForTargeting({
                    page,
                    type: createAdGroupData.advertisingType,
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

    useEffect(() => {
        getCampaigns()
    }, [createAdGroupData.advertisingType])

    useEffect(() => {
        if (mainState.campaignId) setCreateAdGroupData(prevState => ({...prevState, campaignId: '444'}))
    }, [mainState])

    return (<ModalWindow
            className={'create-campaign-window create-ad-group-window'}
            visible={visibleWindow}
            footer={false}
            handleCancel={closeWindowHandler}
        >
            <WindowHeader
                title={'Create Ad Group'}
                onClose={closeWindowHandler}
            />

            <CreateProcessing
                steps={steps}
                step={currentStep}
                skippedSteps={skippedSteps}
                finishedSteps={finishedSteps}
                processSteps={processSteps}
                setStep={goToSelectStep}
            />

            <div className="create-steps">
                {currentStep === 0 &&
                <AdGroupDetails
                    selectedCampaign={mainState.campaignId}
                    createData={createAdGroupData}
                    campaigns={campaigns}

                    getCampaigns={getCampaigns}
                    onChange={changeCreateDataHandler}
                />}

                {currentStep === 1 &&
                <ProductAdsDetails
                    createData={createAdGroupData}
                    onChange={changeCreateDataHandler}
                />}

                {currentStep === 2 &&
                <TargetingsDetails
                    createData={createAdGroupData}
                    onChange={changeCreateDataHandler}
                />}

                {currentStep === 3 &&
                <CreateCampaignOverview
                    createData={createAdGroupData}
                    overviewType={'adGroups'}
                />}
            </div>

            <WindowFooter
                steps={steps}
                currentStep={currentStep}
                goNext={goToNextStepHandler}
                goPrevious={goToPreviousStepHandler}
                onCreate={createAdGroupHandler}
                createButtonTitle={'Create Ad Group'}
            />
        </ModalWindow>
    )
}

export default CreateAdGroupWindow
