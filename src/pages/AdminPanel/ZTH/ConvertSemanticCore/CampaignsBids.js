import React from "react"
import {Checkbox, Input, Select} from "antd"
import CustomSelect from "../../../../components/Select/Select"

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

    return (
        <div>
            <h2>Campaigns Bids and Budgets</h2>
            <Checkbox>Set bids manually</Checkbox>
            <br/>
            <br/>
            <div className="row cols-4">
                <div className="form-group">
                    <label htmlFor="{{'exactBidSelect-' + sheetData.id}}">Choose base exact bid:</label>
                    <CustomSelect className="form-control">
                        <Option value={'wide'}>Wide</Option>
                        <Option value={'simple'}>Simple</Option>
                        <Option value={'compact'}>Compact</Option>
                    </CustomSelect>
                </div>

                <div className="form-group">
                    <label htmlFor="{{'ppcPlan-' + sheetData.id}}">Choose PPC plan for campaign budgets:</label>
                    <CustomSelect className="form-control">
                        <Option value={'wide'}>Wide</Option>
                        <Option value={'simple'}>Simple</Option>
                        <Option value={'compact'}>Compact</Option>
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
                            placeholder="Enter number"
                            type=" number"
                            className=" form-control"
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
                            placeholder="Enter number"
                            type=" number"
                            className=" form-control"
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
