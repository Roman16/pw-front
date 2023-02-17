import React, {useEffect, useState} from "react"
import {Checkbox, Input, Select} from "antd"
import CustomSelect from "../../../../components/Select/Select"
import {adminServices} from "../../../../services/admin.services"
import {getBidsTemplate, getBudgetsTemplateForExactBid} from './bidsProviderService'

const Option = Select.Option

const CampaignsBids = ({onChange, semanticData, zthEnums}) => {
    const [bidsConfig, setBidsConfig] = useState()

    const AdGroupType = zthEnums.enums.AdGroupType,
        CampaignType = zthEnums.enums.CampaignType

    const loadExactBidVariations = async () => {
        try {
            const res = await adminServices.fetchExactBids()

            setBidsConfig(res)
        } catch (e) {
            console.log(e)
        }
    }

    const mapBidsTemplates = () => {
        onChange((prevValue) => ({
            ...prevValue,
            conversionOptions: {
                ...prevValue.conversionOptions,
                upload: {
                    ...prevValue.conversionOptions.upload,
                    bidsTemplate: {...getBidsTemplate(prevValue.settings.exactBid, bidsConfig, CampaignType, AdGroupType)}
                }
            }
        }))
    }

    const changeBidHandler = (type, key, value) => {
        onChange((prevValue) => ({
            ...prevValue,
            conversionOptions: {
                ...prevValue.conversionOptions,
                upload: {
                    ...prevValue.conversionOptions.upload,

                    bidsTemplate: {
                        ...prevValue.conversionOptions.upload.bidsTemplate,
                        [type]: {
                            ...prevValue.conversionOptions.upload.bidsTemplate[type],
                            [key]: {
                                shouldBeApplied: true,
                                bid: value
                            }
                        }
                    }
                }
            }
        }))
    }

    const mapBudgetsTemplates = () => {
        onChange((prevValue) => ({
            ...prevValue,
            conversionOptions: {
                ...prevValue.conversionOptions,
                upload: {
                    ...prevValue.conversionOptions.upload,
                    budgetsTemplate: {...getBudgetsTemplateForExactBid(prevValue.settings.exactBid, prevValue.settings.ppcPlan, prevValue.settings.budgetMultiplier, bidsConfig)}
                }
            }
        }))
    }

    const changeBudgetHandler = (key, value) => {
        onChange((prevValue) => ({
            ...prevValue,
            conversionOptions: {
                ...prevValue.conversionOptions,
                upload: {
                    ...prevValue.conversionOptions.upload,
                    budgetsTemplate: {
                        ...prevValue.conversionOptions.upload.budgetsTemplate,
                        [key]: +value
                    }
                }
            }
        }))
    }

    const changeSettingsHandler = (key, value) => {
        onChange({
            ...semanticData,
            settings: {...semanticData.settings, [key]: value}
        })
    }

    useEffect(() => {
        loadExactBidVariations()
    }, [])

    useEffect(() => {
        if (bidsConfig) {
            mapBidsTemplates()
            mapBudgetsTemplates()
        }
    }, [semanticData.settings.exactBid])

    useEffect(() => {
        if (bidsConfig) {
            mapBudgetsTemplates()
        }
    }, [semanticData.settings.ppcPlan, semanticData.settings.budgetMultiplier])

    useEffect(() => {
        if (bidsConfig && !semanticData.settings.manuallyBudgets) {
            mapBidsTemplates()
            mapBudgetsTemplates()
        }
    }, [bidsConfig])

    return (
        <div className={'bids-budgets-section'}>
            <h2>Campaigns Bids and Budgets</h2>

            <Checkbox
                checked={semanticData.settings.manuallySetExactBid}
                onChange={({target: {checked}}) => changeSettingsHandler('manuallySetExactBid', checked)}
            >
                Set bids manually
            </Checkbox>

            <div className="row cols-4">
                {semanticData.settings.manuallySetExactBid ? <div className="form-group">
                        <label htmlFor="{{'exactBidSelect-' + sheetData.id}}">Exact bid:</label>
                        <Input
                            placeholder=" Enter number"
                            id="{{'exactBidNumber-' +sheetData.id}}"
                            type="number"
                            className="form-control"
                            onChange={({target: {value}}) => changeSettingsHandler('exactBid', +value)}
                            value={semanticData.settings.exactBid}
                        />
                    </div>
                    :
                    <div className="form-group">
                        <label htmlFor="{{'exactBidSelect-' + sheetData.id}}">Choose base exact bid:</label>
                        <CustomSelect
                            value={semanticData.settings.exactBid}
                            onChange={value => changeSettingsHandler('exactBid', +value)}
                            getPopupContainer={trigger => trigger}
                            className="form-control"
                        >
                            {bidsConfig && bidsConfig.predefinedExactBids.map(bid => <Option
                                value={bid}>
                                {bid}
                            </Option>)}
                        </CustomSelect>
                    </div>}

                <div className="form-group">
                    <label htmlFor="{{'ppcPlan-' + sheetData.id}}">Choose PPC plan for campaign budgets:</label>
                    <CustomSelect
                        getPopupContainer={trigger => trigger}
                        onChange={value => changeSettingsHandler('ppcPlan', value)}
                        value={semanticData.settings.ppcPlan}
                        className="form-control"
                    >
                        {zthEnums.enums.PPCPlan.map(item => (
                            <Option value={item}>{item}</Option>
                        ))}
                    </CustomSelect>
                </div>

                <div className="form-group">
                    <label htmlFor="{{'exactBidNumber-' +sheetData.id}}">Multiply budgets</label>
                    <Input
                        placeholder=" Enter number"
                        id="{{'exactBidNumber-' +sheetData.id}}"
                        type="number"
                        className="form-control"
                        onChange={({target: {value}}) => changeSettingsHandler('budgetMultiplier', +value)}
                        value={semanticData.settings.budgetMultiplier}
                    />
                </div>
            </div>

            <Checkbox
                checked={semanticData.settings.manuallyBudgets}
                onChange={({target: {checked}}) => changeSettingsHandler('manuallyBudgets', checked)}
            >
                Set bids and budgets manually
            </Checkbox>

            <h3>Campaign bids:</h3>

            <div className="bids-fields-list">
                {zthEnums.aggregates.campaignTypesOrdered.map(key => (
                    semanticData.conversionOptions.upload.bidsTemplate.campaigns[key] && semanticData.conversionOptions.upload.bidsTemplate.campaigns[key].shouldBeApplied &&
                    <div className="col-sm-3 form-group">
                        <label>
                            {key}:
                        </label>
                        <Input
                            placeholder="Enter number"
                            type="number"
                            className=" form-control"
                            disabled={!semanticData.settings.manuallyBudgets}
                            value={semanticData.conversionOptions.upload.bidsTemplate.campaigns[key].bid}
                            onChange={({target: {value}}) => changeBidHandler('campaigns', key, +value)}
                        />
                    </div>
                ))}
            </div>

            <h3>Ad group bids:</h3>

            <div className="bids-fields-list">
                {zthEnums.aggregates.adGroupTypesOrdered.map(key => (
                    semanticData.conversionOptions.upload.bidsTemplate.adGroups[key] && semanticData.conversionOptions.upload.bidsTemplate.adGroups[key].shouldBeApplied &&
                    <div className="col-sm-3 form-group">
                        <label>
                            {key}:
                        </label>
                        <Input
                            placeholder="Enter number"
                            type="number"
                            className=" form-control"
                            disabled={!semanticData.settings.manuallyBudgets}
                            value={semanticData.conversionOptions.upload.bidsTemplate.adGroups[key].bid}
                            onChange={({target: {value}}) => changeBidHandler('adGroups', key, +value)}
                        />
                    </div>
                ))}
            </div>

            <h3>Campaign daily budgets:</h3>

            <div className="bids-fields-list">
                {zthEnums.aggregates.campaignTypesForCompressionStrategy[semanticData.conversionOptions.zeroToHero.campaignsCompressionStrategy] && zthEnums.aggregates.campaignTypesForCompressionStrategy[semanticData.conversionOptions.zeroToHero.campaignsCompressionStrategy]
                    .map(key => (
                        <div className="col-sm-3 form-group">
                            <label>
                                {key}:
                            </label>

                            <Input
                                placeholder="Enter number"
                                type="number"
                                className=" form-control"
                                disabled={!semanticData.settings.manuallyBudgets}
                                value={semanticData.conversionOptions.upload.budgetsTemplate[key]}
                                onChange={({target: {value}}) => changeBudgetHandler(key, value)}
                            />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default React.memo(CampaignsBids)
