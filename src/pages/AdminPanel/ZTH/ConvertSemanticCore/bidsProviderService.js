// import {BidsProviderServiceConfig} from '../../../../src/infrastructure/services/bids-provider-service'
// import {BidsTemplate, PPCPlan, BudgetsTemplate} from '../../../../src/shared'


import {AdGroupType, CampaignType} from "./constans"

function getDefaultExactBid() {
    return this._config.defaultExactBid
}

function getPredefinedExactBids() {
    return [...this._config.predefinedExactBids]
}

export function getBidsTemplate(exactBid, templates) {
    // force creation of empty bids template to fill it later
    // const newTemplate = {
    //     campaigns: {},
    //     adGroups: {}
    // } as BidsTemplate

    const newTemplate = {
        campaigns: {},
        adGroups: {}
    }

    Object.keys(CampaignType).forEach((x) => {
        const {shouldBeApplied, bidMultiplier} = templates.bidsTemplate.campaigns[x]

        newTemplate.campaigns[x] = {
            shouldBeApplied,
            bid: shouldBeApplied ? _sashiphizeBid(_roundTo(exactBid * bidMultiplier, 2)) : null,
        }
    })

    Object.keys(AdGroupType).forEach((x) => {
        const {shouldBeApplied, bidMultiplier} = templates.bidsTemplate.adGroups[x]

        newTemplate.adGroups[x] = {
            shouldBeApplied,
            bid: shouldBeApplied ? _sashiphizeBid(_roundTo(exactBid * bidMultiplier, 2)) : null,
        }
    })

    return newTemplate
}

export function getBudgetsTemplateForExactBid(exactBid, ppcPlan, budgetMultiplier = 1, config) {
    const baseBudget = config.baseBudgetsCoefficients[ppcPlan] * exactBid
    return _getBudgetsTemplate(baseBudget, budgetMultiplier, config)
}

function _getBudgetsTemplate(baseBudget, budgetMultiplier, config) {
    // force creation of empty bids template to fill it later
    // const newTemplate = {} as BudgetsTemplate
    const newTemplate = {}

    Object.keys(CampaignType).forEach((x) => {
        const rawBudgetForCampaign = baseBudget * config.budgetsTemplate[x] * budgetMultiplier
        const normalizedCampaignBudget = _roundByDivider(_roundTo(rawBudgetForCampaign, 0), config.roundBudgetsTo)
        newTemplate[x] = normalizedCampaignBudget <= 0 ? config.roundBudgetsTo : normalizedCampaignBudget
    })

    return newTemplate
}

function _sashiphizeBid(bid) {
    const fractionMajor = Math.trunc(_roundTo(bid - Math.trunc(bid), 2) * 10)
    let result

    if (fractionMajor === 0) {
        result = Math.trunc(bid) + 0.11
    } else if (fractionMajor === 9) {
        result = Math.trunc(bid) + 1.11
    } else {
        result = Math.trunc(bid) + fractionMajor / 10 + fractionMajor / 100
    }

    return _roundTo(result, 2)
}

function _roundTo(num, digits) {
    return +num.toFixed(digits)
}

function _roundByDivider(num, divider) {
    const mod = num % divider
    if (mod === 0) {
        return num
    }
    if (mod >= divider / 2) {
        return num - mod + divider
    }
    return num - mod
}
