import {countryFlags} from "../assets/img/flags"
import _ from 'lodash'

export const marketplaceIdValues = _.mapValues({
    //North America region
    'ATVPDKIKX0DER': {
        countryCode: 'US',
        country: 'US',
        domain: 'com',
    },
    'A2EUQ1WTGCTBG2': {
        countryCode: 'CA',
        country: 'Canada',
        domain: 'ca',
    },

    'A1AM78C64UM0Y8': {
        countryCode: 'MX',
        country: 'Mexico',
        domain: 'com.mx',
    },
    'A2Q3Y263D00KWC': {
        countryCode: 'BR',
        country: 'Brazil',
        domain: 'com',
    },

    //Europe region
    'A1F83G8C2ARO7P': {
        countryCode: 'GB',
        country: 'UK',
        domain: 'com'
    },
    'A1RKKUPIHCS9HS': {
        countryCode: 'ES',
        country: 'Spain',
        domain: 'com'
    },
    'A13V1IB3VIYZZH': {
        countryCode: 'FR',
        country: 'France',
        domain: 'com'
    },
    'A1PA6795UKMFR9': {
        countryCode: 'DE',
        country: 'Germany',
        domain: 'com'
    },
    'APJ6JRA9NG5V4': {
        countryCode: 'IT',
        country: 'Italy',
        domain: 'com'
    },
    'AMEN7PMS3EDWL': {
        countryCode: 'BE',
        country: 'Belgium',
        domain: 'com'
    },
    'A1805IZSGTT6HS': {
        countryCode: 'NL',
        country: 'Netherlands',
        domain: 'com'
    },
    'A2NODRKZP88ZB9': {
        countryCode: 'SE',
        country: 'Sweden',
        domain: 'com'
    },
    'A1C3SOZRARQ6R3': {
        countryCode: 'PL',
        country: 'Poland',
        domain: 'com'
    },
    'ARBP9OOSHTCHU': {
        countryCode: 'EG',
        country: 'Egypt',
        domain: 'com'
    },
    'A33AVAJ2PDY3EV': {
        countryCode: 'TR',
        country: 'Turkey',
        domain: 'com'
    },
    'A17E79C6D8DWNP': {
        countryCode: 'SA',
        country: 'Saudi Arabia',
        domain: 'com'
    },
    'A2VIGQ35RCS4UG': {
        countryCode: 'AE',
        country: 'United Arab Emirates (U.A.E.)',
        domain: 'ae'
    },
    'A21TJRUUN4KGV': {
        countryCode: 'IN',
        country: 'India',
        domain: 'in'
    },

    //Far East region
    'A1VC38T7YXB528': {
        countryCode: 'JP',
        country: 'Japan',
        domain: 'jp'
    },
    'A39IBJ37TRP1C6': {
        countryCode: 'AU',
        country: 'Australia',
        domain: 'com.au'
    },
    'A19VAU5U5O7RUS': {
        countryCode: 'SG',
        country: 'Singapore',
        domain: 'com'
    },
}, (v) => {
    return ({
        ...v,
        flag: countryFlags[v.country]
    })
})

