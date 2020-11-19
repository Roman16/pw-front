// import {BidsProviderServiceConfig} from '../../../../src/infrastructure/services/bids-provider-service'
// import {BidsTemplate, PPCPlan, BudgetsTemplate} from '../../../../src/shared'

const CampaignType = {
    // Campaign types for 'Compact' compression

    Auto: 'Auto',
    ExactPhrase: 'ExactPhrase',
    PAT: 'PAT',

    // Base campaign types
    // Auto
    AutoCTA: 'AutoCTA',
    AutoNegative: 'AutoNegative',

    // Keywords
    TPK: 'TPK',
    DPK: 'DPK',
    Broad: 'Broad',
    CloseVariants: 'CloseVariants',
    Variations: 'Variations',
    ExactSimple: 'ExactSimple',
    ExactOther: 'ExactOther',
    STESTP: 'STESTP',
    Misspellings: 'Misspellings',
    Brands: 'Brands',

    // PATs
    TPA: 'TPA',
    ASINs: 'ASINs',
    Categories: 'Categories',

    // SD
    SDRemarketing: 'SDRemarketing',
    SDTPA: 'SDTPA',
    SDPA: 'SDPA',
    SDRA: 'SDRA',
    SDSA: 'SDSA',
    SDCategories: 'SDCategories',
}

const AdGroupType = {
    // Auto
    AutoTargeting: 'AutoTargeting',

    // Keywords
    RelevantExact: 'RelevantExact',
    SemiRelevantExact: 'SemiRelevantExact',
    LooseRelevantExact: 'LooseRelevantExact',
    Broad: 'Broad',
    // STE / STP Keywords
    ExactLowAcos: 'ExactLowAcos',
    ExactMediumAcos: 'ExactMediumAcos',
    ExactHighAcos: 'ExactHighAcos',
    PhraseLowAcos: 'PhraseLowAcos',
    PhraseMediumAcos: 'PhraseMediumAcos',
    PhraseHighAcos: 'PhraseHighAcos',

    // Brands
    MyBrand: 'MyBrand',
    CompetingBrands: 'CompetingBrands',
    KeywordsWithBrands: 'KeywordsWithBrands',

    // PATs
    TopPerformingASINs: 'TopPerformingASINs',
    PerformingASINs: 'PerformingASINs',
    RiskASINs: 'RiskASINs',
    SuggestedASINs: 'SuggestedASINs',
    SuggestedCategories: 'SuggestedCategories',

    // SD
    SDRemarketing: 'SDRemarketing',
    SDTopPerformingASINs: 'SDTopPerformingASINs',
    SDPerformingASINs: 'SDPerformingASINs',
    SDRiskASINs: 'SDRiskASINs',
    SDSuggestedASINs: 'SDSuggestedASINs',
    SDSuggestedCategories: 'SDSuggestedCategories',
}


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

function getBudgetsTemplateForExactBid(exactBid, ppcPlan, budgetMultiplier = 1) {
    const baseBudget = this._config.baseBudgetsCoefficients[ppcPlan] * exactBid
    return this._getBudgetsTemplate(baseBudget, budgetMultiplier)
}

function _getBudgetsTemplate(baseBudget, budgetMultiplier) {
    // force creation of empty bids template to fill it later
    // const newTemplate = {} as BudgetsTemplate
    const newTemplate = {}

    Object.keys(CampaignType).forEach((x) => {
        const rawBudgetForCampaign = baseBudget * this._config.budgetsTemplate[x] * budgetMultiplier
        const normalizedCampaignBudget = this._roundByDivider(this._roundTo(rawBudgetForCampaign, 0), this._config.roundBudgetsTo)
        newTemplate[x] = normalizedCampaignBudget <= 0 ? this._config.roundBudgetsTo : normalizedCampaignBudget
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
