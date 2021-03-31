import React from "react"
import {metricsKeysWithoutOrganic} from "../components/MainMetrics/metricsList"
import CreateProductAdsWindow from "./CreateProductAdsWindow/CreateProductAdsWindow"
import RenderPageParts from "../componentsV2/RenderPageParts/RenderPageParts"
import OpenCreateWindowButton from "../components/OpenCreateWindowButton/OpenCreateWindowButton"
import {useDispatch, useSelector} from "react-redux"
import {analyticsActions} from "../../../actions/analytics.actions"
import {columnList} from "./tableComponents/columnList"

const ProductAds = () => {
    const availableMetrics = [...metricsKeysWithoutOrganic]
    const location = 'product-ads'

    const {selectedCampaign, selectedAdGroup} = useSelector(state => ({
        selectedCampaign: state.analytics.mainState.campaignId,
        selectedAdGroup: state.analytics.mainState.adGroupId,
    }))

    const dispatch = useDispatch()

    const setStateHandler = (location, state) => {
        dispatch(analyticsActions.setLocation(location))
        dispatch(analyticsActions.setMainState(state))
    }

    return (
        <div className={'product-ads-workplace'}>
            <RenderPageParts
                location={location}
                availableMetrics={availableMetrics}
                availableParts={['metrics', 'chart', 'table']}
                fixedColumns={[0, 1]}

                columns={columnList(setStateHandler, selectedCampaign, selectedAdGroup)}
                moreActions={<OpenCreateWindowButton title={'Add Product Ads'} window={'productAds'}/>}
                showRowSelection={true}
                rowKey={'adId'}
            />

            <CreateProductAdsWindow/>
        </div>
    )
}

export default ProductAds
