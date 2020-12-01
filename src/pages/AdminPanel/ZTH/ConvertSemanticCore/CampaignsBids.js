import React, {useEffect, useState} from "react"
import {Checkbox, Input, Select} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import {adminServices} from "../../../../services/admin.services"
import {getBidsTemplate, getBudgetsTemplateForExactBid} from './bidsProviderService'
import {AdGroupType, CampaignType} from './constans'

const Option = Select.Option

const CampaignsBids = ({onChange}) => {
    const [bidsConfig, setBidsConfig] = useState(),
        [exactBid, setExactBid] = useState(),
        [ppcPlan, setPpcPlan] = useState('High'),
        [budgetMultiplier, setBudgetMultiplier] = useState(1),
        [bidsTemplate, setBidsTemplate] = useState({campaigns: {}, adGroups: {}}),
        [budgetsTemplate, setBudgetsTemplate] = useState({}),
        [manuallyExactBid, setManuallyExactBid] = useState(false),
        [manuallyBudgets, setManuallyBudgets] = useState(false)

    const loadExactBidVariations = async () => {
        try {
            const res = await adminServices.fetchExactBids()

            setBidsConfig(res)
            setExactBid(1)
        } catch (e) {
            console.log(e)
        }
    }

    const mapBidsTemplates = () => {
        setBidsTemplate(getBidsTemplate(exactBid, bidsConfig))
    }

    const mapBudgetsTemplates = () => {
        setBudgetsTemplate(getBudgetsTemplateForExactBid(exactBid, ppcPlan, budgetMultiplier, bidsConfig))
    }

    const changeBidHandler = (type, key, value) => {
        setBidsTemplate(prevState => ({
            ...prevState,
            [type]: {
                ...prevState[type],
                [key]: {
                    shouldBeApplied: true,
                    bid: value
                }
            }
        }))
    }

    useEffect(() => {
        loadExactBidVariations()
    }, [])

    useEffect(() => {
        if (bidsConfig) {
            mapBidsTemplates()
            mapBudgetsTemplates()
        }
    }, [exactBid])

    useEffect(() => {
        if (bidsConfig) {
            mapBudgetsTemplates()
        }
    }, [ppcPlan, budgetMultiplier])

    useEffect(() => {
        onChange({
            bidsTemplate,
            budgetsTemplate
        })
    }, [bidsTemplate, budgetsTemplate])

    return (
        <div className={'bids-budgets-section'}>
            <h2>Campaigns Bids and Budgets</h2>
            <Checkbox onChange={({target: {checked}}) => setManuallyExactBid(checked)}>
                Set bids manually
            </Checkbox>

            <div className="row cols-4">
                {manuallyExactBid ? <div className="form-group">
                        <label htmlFor="{{'exactBidSelect-' + sheetData.id}}">Exact bid:</label>
                        <Input
                            placeholder=" Enter number"
                            id="{{'exactBidNumber-' +sheetData.id}}"
                            type="number"
                            className="form-control"
                            onChange={({target: {value}}) => setExactBid(+value)}
                            value={exactBid}
                        />
                    </div>
                    :
                    <div className="form-group">
                        <label htmlFor="{{'exactBidSelect-' + sheetData.id}}">Choose base exact bid:</label>
                        <CustomSelect
                            value={exactBid}
                            onChange={value => setExactBid(value)}
                            getPopupContainer={trigger => trigger.parentNode}
                            className="form-control"
                        >
                            {bidsConfig && bidsConfig.predefinedExactBids.map(bid => <Option
                                value={bid}>{bid}</Option>)}
                        </CustomSelect>
                    </div>}

                <div className="form-group">
                    <label htmlFor="{{'ppcPlan-' + sheetData.id}}">Choose PPC plan for campaign budgets:</label>
                    <CustomSelect
                        getPopupContainer={trigger => trigger.parentNode}
                        onChange={value => setPpcPlan(value)}
                        value={ppcPlan}
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
                        type="number"
                        className="form-control"
                        onChange={({target: {value}}) => setBudgetMultiplier(+value)}
                        value={budgetMultiplier}
                    />
                </div>
            </div>

            <Checkbox onChange={({target: {checked}}) => setManuallyBudgets(checked)}>
                Set bids and budgets manually
            </Checkbox>

            <h3>Campaign bids:</h3>

            <div className="bids-fields-list">
                {Object.keys(CampaignType).map(key => (
                    bidsTemplate.campaigns[key] && bidsTemplate.campaigns[key].shouldBeApplied &&
                    <div className="col-sm-3 form-group">
                        <label>
                            {key}:
                        </label>
                        <Input
                            placeholder="Enter number"
                            type="number"
                            className=" form-control"
                            disabled={!manuallyBudgets}
                            value={bidsTemplate.campaigns[key].bid}
                            onChange={({target: {value}}) => changeBidHandler('campaigns', key, +value)}
                        />
                    </div>
                ))}
            </div>

            <h3>Ad group bids:</h3>

            <div className="bids-fields-list">
                {Object.keys(AdGroupType).map(key => (
                    bidsTemplate.adGroups[key] && bidsTemplate.adGroups[key].shouldBeApplied &&
                    <div className="col-sm-3 form-group">
                        <label>
                            {key}:
                        </label>
                        <Input
                            placeholder="Enter number"
                            type="number"
                            className=" form-control"
                            disabled={!manuallyBudgets}
                            value={bidsTemplate.adGroups[key].bid}
                            onChange={({target: {value}}) => changeBidHandler('adGroups', key, +value)}
                        />
                    </div>
                ))}
            </div>

            <h3>Campaign daily budgets:</h3>

            <div className="bids-fields-list">
                {Object.keys(CampaignType).map(key => (
                    <div className="col-sm-3 form-group">
                        <label>
                            {key}:
                        </label>
                        <Input
                            placeholder="Enter number"
                            type="number"
                            className=" form-control"
                            disabled={!manuallyBudgets}
                            value={budgetsTemplate[key]}
                            onChange={({target: {value}}) => setBudgetsTemplate(prevState => ({
                                ...prevState,
                                [key]: +value
                            }))}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default React.memo(CampaignsBids)
