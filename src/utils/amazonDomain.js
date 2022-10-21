import {marketplaceIdValues} from "../constans/amazonMarketplaceIdValues"

export const amazonDomain = () => {
    const marketplace = localStorage.getItem('activeMarketplace') && localStorage.getItem('activeMarketplace') !== 'undefined' ? JSON.parse(localStorage.getItem('activeMarketplace')) : null

    return marketplaceIdValues[marketplace.marketplace_id].listingDomain || marketplaceIdValues[marketplace.marketplace_id].domain || 'com'
}