import {keyColumn, textColumn} from "react-datasheet-grid"

export const columns = {
    mainKeywords: [
        {...keyColumn('text', textColumn), title: 'Keyword text', width: 4},
        {...keyColumn('searchVolume', textColumn), title: 'Search volume', width: 3},
    ],
    baseKeywords: [
        {...keyColumn('text', textColumn), title: 'Keyword text', width: 4},
        {...keyColumn('searchVolume', textColumn), title: 'Search volume', width: 3},
    ],
    negativePhrases: [
        {...keyColumn('text', textColumn), title: 'Keyword text', width: 1},
    ],
    negativeExacts: [
        {...keyColumn('text', textColumn), title: 'Keyword text'},
    ],
    negativeAsins: [
        {...keyColumn('text', textColumn), title: 'ASIN'},
    ],
    // globalNegativePhrases: [
    //     {...keyColumn('text', textColumn), title: 'Keyword text'},
    // ],
    // globalNegativeExacts: [
    //     {...keyColumn('text', textColumn), title: 'Keyword text'},
    // ],
}

