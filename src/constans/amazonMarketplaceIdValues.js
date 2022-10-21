import {countryFlags} from "../assets/img/flags"
import _ from 'lodash'

export const marketplaceIdValues = _.mapValues({
    //North America region
    'ATVPDKIKX0DER': {
        countryCode: 'US',
        country: 'US',
        countryName: 'USA',
        domain: 'com',
    },
    'A2EUQ1WTGCTBG2': {
        countryCode: 'CA',
        country: 'Canada',
        countryName: 'Canada',
        domain: 'ca',
    },

    'A1AM78C64UM0Y8': {
        countryCode: 'MX',
        country: 'Mexico',
        countryName: 'Mexico',
        domain: 'com.mx',
    },
    'A2Q3Y263D00KWC': {
        countryCode: 'BR',
        country: 'Brazil',
        countryName: 'Brazil',
        domain: 'com',
        listingDomain: 'com.br'
    },

    //Europe region
    'A1F83G8C2ARO7P': {
        countryCode: 'UK',
        country: 'UK',
        countryName: 'United Kingdom',
        domain: 'com',
        listingDomain: 'co.uk'
    },
    'A1RKKUPIHCS9HS': {
        countryCode: 'ES',
        country: 'Spain',
        countryName: 'Spain',
        domain: 'com',
        listingDomain: 'es'
    },
    'A13V1IB3VIYZZH': {
        countryCode: 'FR',
        country: 'France',
        countryName: 'France',
        domain: 'com',
        listingDomain: 'fr'
    },
    'A1PA6795UKMFR9': {
        countryCode: 'DE',
        country: 'Germany',
        countryName: 'Germany',
        domain: 'com',
        listingDomain: 'de'
    },
    'APJ6JRA9NG5V4': {
        countryCode: 'IT',
        country: 'Italy',
        countryName: 'Italy',
        domain: 'com',
        listingDomain: 'it'
    },
    'AMEN7PMS3EDWL': {
        countryCode: 'BE',
        country: 'Belgium',
        countryName: 'Belgium',
        domain: 'com',
        listingDomain: 'com.be'
    },
    'A1805IZSGTT6HS': {
        countryCode: 'NL',
        country: 'Netherlands',
        countryName: 'Netherlands',
        domain: 'com',
        listingDomain: 'nl'
    },
    'A2NODRKZP88ZB9': {
        countryCode: 'SE',
        country: 'Sweden',
        countryName: 'Sweden',
        domain: 'com',
        listingDomain: 'se'
    },
    'A1C3SOZRARQ6R3': {
        countryCode: 'PL',
        country: 'Poland',
        countryName: 'Poland',
        domain: 'com',
        listingDomain: 'pl'
    },
    'ARBP9OOSHTCHU': {
        countryCode: 'EG',
        country: 'Egypt',
        countryName: 'Egypt',
        domain: 'com',
        listingDomain: 'eg'
    },
    'A33AVAJ2PDY3EV': {
        countryCode: 'TR',
        country: 'Turkey',
        countryName: 'Turkey',
        domain: 'com',
        listingDomain: 'com.tr'
    },
    'A17E79C6D8DWNP': {
        countryCode: 'SA',
        country: 'Saudi Arabia',
        countryName: 'Saudi Arabia',
        domain: 'com',
        listingDomain: 'sa'
    },
    'A2VIGQ35RCS4UG': {
        countryCode: 'AE',
        country: 'United Arab Emirates (U.A.E.)',
        countryName: 'United Arab Emirates',
        domain: 'ae',
    },
    'A21TJRUUN4KGV': {
        countryCode: 'IN',
        country: 'India',
        countryName: 'India',
        domain: 'in',
    },

    //Far East region
    'A1VC38T7YXB528': {
        countryCode: 'JP',
        country: 'Japan',
        countryName: 'Japan',
        domain: 'jp',
        listingDomain: 'co.jp'
    },
    'A39IBJ37TRP1C6': {
        countryCode: 'AU',
        country: 'Australia',
        countryName: 'Australia',
        domain: 'com.au',
    },
    'A19VAU5U5O7RUS': {
        countryCode: 'SG',
        country: 'Singapore',
        countryName: 'Singapore',
        domain: 'com',
        listingDomain: 'sg'
    },
}, (v) => {
    return ({
        ...v,
        flag: countryFlags[v.country]
    })
})

