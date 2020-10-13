import React from "react"
import {Input, Select, Checkbox} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import Variations from "./Variations"

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

const SemanticCore = () => {

    return (
        <div className={'semantic-core'}>
            <div className="container-fluid semantic-core">
                <div className="form-group product-name">
                    <label>Product name:</label>
                    <Input
                        placeholder="Enter product name"
                        id="{{'product-name-' + sheetData.id}}"
                        type="text"
                        className="form-control"
                    />
                </div>

                {/*<div className="form-group checkbox">*/}
                {/*    <label> Create "Misspellings" campaign</label>*/}
                {/*    <Input id="{{'createMisspellingsCampaign-' + sheetData.id}}" type="checkbox"/>*/}
                {/*</div>*/}

                {/*<div className=" form-group checkbox">*/}
                {/*    <label> Save "Misspellings" as separate bulk upload file</label>*/}
                {/*    <Input*/}
                {/*        id="{{'saveMisspellingsAsSeparateBulkUpload-' + sheetData.id}}"*/}
                {/*        type="checkbox"*/}
                {/*    />*/}

                {/*</div>*/}

                <div className="form-group campaign-strategy">
                    <label htmlFor="campaignsCompressionStrategy">Choose campaign compression strategy:</label>

                    <CustomSelect className="form-control">
                        <Option value={'wide'}>Wide</Option>
                        <Option value={'simple'}>Simple</Option>
                        <Option value={'compact'}>Compact</Option>
                    </CustomSelect>
                </div>
            </div>

            <h3> Bids:</h3>

            <div className="bids-fields">
                <div className="row">
                    <div className="form-group checkbox">
                        <Checkbox>Set exact bid manually</Checkbox>
                    </div>
                </div>

                <div className="row cols-4">
                    <div className="form-group">
                        <label htmlFor="{{'exactBidNumber-' +sheetData.id}}">Exact bid:</label>
                        <Input
                            placeholder=" Enter number"
                            id="{{'exactBidNumber-' +sheetData.id}}"
                            type="text"
                            className="form-control"
                        />
                    </div>

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
                </div>
                <div className="row">
                    <div className="form-group">
                        <div className="checkbox">
                            <Checkbox>Set bids and budgets manually</Checkbox>
                        </div>
                    </div>
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

            <Variations/>

            <div className="themes">
                <h2>Themes</h2>
                <button className={'btn default'}>Add new theme</button>
            </div>


            <h2>Generate bulk upload for campaign types:</h2>

            <button className={'btn default'}>
                Convert semantics
            </button>

        </div>
    )
}

export default SemanticCore
