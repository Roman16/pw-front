import {useSelector} from "react-redux"

export const CurrencyWithCode = ({value}) => {
    const currency = useSelector(state => state.user.activeAmazonMarketplace.currency_code) || 'USD'

    switch (currency) {
        // case "USD":
        case "CAD":
        case "MXN":
        case "SGD":
        case "AUD":
            return `$${value}`
            break
        case "USD":
            return `${value}zł`
            break
        case "BRL":
            return `R$${value}`
            break
        case "GBP":
            return `£${value}`
            break
        case "JPY":
            return `¥${value}`
            break
        case "SEK":
            return `${value}kr`
            break
        case "TRY":
            return `${value}₺`
            break
        case "AED":
            return `${value}د.إ`
            break
        case "EUR":
            return `€${value}`
            break

        default:
            return `$${value}`
    }
}

export const currencySymbol = {
    'USD': '$',
    'CAD': '$',
    'MXN': '$',
    'SGD': '$',
    'AUD': '$',
    'PLN': 'zł',
    'BRL': 'R$',
    'GBP': '£',
    'JPY': '¥',
    'SEK': 'kr',
    'TRY': '₺',
    'AED': 'د.إ',
    'EUR': '€',
}
export const currencyName = {
    'USD': 'United States dollar',
    'PLN': 'Polish złoty',
    'CAD': 'Canadian dollar',
    'BRL': 'Brazilian real',
    'GBP': 'Pound sterling',
    'JPY': 'Japanese yen',
    'MXN': 'Mexican peso',
    'SGD': 'Singapore dollar',
    'AUD': 'Australian dollar',
    'SEK': 'Swedish krona',
    'TRY': 'Turkish lira',
    'AED': 'UAE dirham',
    'EUR': 'Euro',
}