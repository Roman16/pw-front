import React, {useEffect, useState} from "react"
import {Checkbox, Input, Select} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import {adminServices} from "../../../../services/admin.services"
import {getBidsTemplate} from './bidsProviderService'

const Option = Select.Option


const campaignBidsKeys = [
    'AutoCTA',
    'AutoNegative',
    'TPK',
    'DPK',
    'Broad',
    'CloseVariants',
    'Variations',
    'ExactSimple',
    'ExactOther',
    'Misspellings',
]

const adGroupBidsKeys = [
    'ExactLowAcos',
    'ExactMediumAcos',
    'ExactHighAcos',
    'PhraseLowAcos',
    'PhraseMediumAcos',
    'PhraseHighAcos',
    'MyBrand',
    'CompetingBrands',
    'KeywordsWithBrands',
    'TopPerformingASINs',
    'PerformingASINs',
    'RiskASINs',
    'SuggestedASINs',
    'SuggestedCategories',
]

const campaignBudgetsKeys = [
    'AutoCTA',
    'AutoNegative',
    'TPK',
    'DPK',
    'Broad',
    'CloseVariants',
    'Variations',
    'ExactSimple',
    'ExactOther',
    'STESTP',
    'Misspellings',
    'Brands',
    'TPA',
    'ASINs',
    'Categories',
]


const CampaignsBids = () => {
    const [bidsConfig, setBidsConfig] = useState(),
        [exactBid, setExactBid] = useState(),
        [bidsTemplate, setBidsTemplate] = useState({
            campaigns: {},
            adGroups: {}
        })

    const loadExactBidVariations = async () => {
        try {
            const res = await adminServices.fetchExactBids()

            setBidsConfig(res)
            setExactBid(1)
        } catch (e) {
            console.log(e)
        }
    }

    const mapBidsTemplate = () => {
        setBidsTemplate(getBidsTemplate(exactBid, bidsConfig))
    }

    useEffect(() => {
        loadExactBidVariations()
    }, [])

    useEffect(() => {
        if(bidsConfig) mapBidsTemplate()
    }, [exactBid])

    return (
        <div>
            <h2>Campaigns Bids and Budgets</h2>
            <Checkbox>Set bids manually</Checkbox>
            <br/>
            <br/>
            <div className="row cols-4">
                <div className="form-group">
                    <label htmlFor="{{'exactBidSelect-' + sheetData.id}}">Choose base exact bid:</label>
                    <CustomSelect
                        value={exactBid}
                        onChange={value => setExactBid(value)}
                        getPopupContainer={trigger => trigger.parentNode}
                        className="form-control"
                    >
                        {bidsConfig && bidsConfig.predefinedExactBids.map(bid => <Option value={bid}>{bid}</Option>)}
                    </CustomSelect>
                </div>

                <div className="form-group">
                    <label htmlFor="{{'ppcPlan-' + sheetData.id}}">Choose PPC plan for campaign budgets:</label>
                    <CustomSelect
                        getPopupContainer={trigger => trigger.parentNode}
                        className="form-control"
                    >
                        <Option value={'Low'}>Low</Option>
                        <Option value={'Medium'}>Medium</Option>
                        <Option value={'High'}>High</Option>
                    </CustomSelect>
                </div>

                <div className="form-group">
                    <label htmlFor="{{'exactBidNumber-' +sheetData.id}}">Multiply budgets</label>
                    <Input
                        placeholder=" Enter number"
                        id="{{'exactBidNumber-' +sheetData.id}}"
                        type="text"
                        className="form-control"
                    />
                </div>
            </div>


            <h3>Campaign bids:</h3>

            <div className="bids-fields-list">
                {campaignBidsKeys.map(key => (
                    <div className="col-sm-3 form-group">
                        <label>
                            {key}:
                        </label>
                        <Input
                            disabled={true}
                            placeholder="Enter number"
                            type=" number"
                            className=" form-control"
                            value={bidsTemplate.campaigns[key] && bidsTemplate.campaigns[key].bid}
                        />
                    </div>
                ))}
            </div>

            <h3>Ad group bids:</h3>

            <div className="bids-fields-list">
                {adGroupBidsKeys.map(key => (
                    <div className="col-sm-3 form-group">
                        <label>
                            {key}:
                        </label>
                        <Input
                            disabled={true}
                            placeholder="Enter number"
                            type=" number"
                            className=" form-control"
                            value={bidsTemplate.adGroups[key] && bidsTemplate.adGroups[key].bid}
                        />
                    </div>
                ))}
            </div>

            <h3>Campaign daily budgets:</h3>

            <div className="bids-fields-list">
                {campaignBudgetsKeys.map(key => (
                    <div className="col-sm-3 form-group">
                        <label>
                            {key}:
                        </label>
                        <Input
                            placeholder="Enter number"
                            type=" number"
                            className=" form-control"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CampaignsBids
