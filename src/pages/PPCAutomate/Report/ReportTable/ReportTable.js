import React from "react"
import {dateField, infoField, sorterByKeywordField} from './Tables/const'
import "./ReportTable.less"
import CustomTable from "../../../../components/Table/CustomTable"
import Pagination from "../../../../components/Pagination/Pagination"

const fakeData = [
    {
        "keyword_id": "21274332188965",
        "bid": null,
        "datetime": "2021-11-04 15:33:06",
        "object": "sweat stomach band women",
        "object_type": "Exact Keyword",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.57,
                "new_bid": 0.53
            }
        },
        "type": "ChangedKeywordBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordMatchType\">exact</span> keyword <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordText\">sweat stomach band women</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Exact Low Acos [r] (ela)</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (ST Exact / Phrase)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.57$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.53$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">down</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.04$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">7.02%</span>) based on keyword ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordACoS\">31.1%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordClicks\">8</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">21.39%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20.73%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">BoostPPCProfit</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">6f552239-5eae-4370-88bf-7b0826b01626</span>",
        "viewed": true
    },
    {
        "keyword_id": "75828085651107",
        "bid": null,
        "datetime": "2021-11-04 14:32:57",
        "object": "sweat bands waist trimmer",
        "object_type": "Exact Keyword",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.75,
                "new_bid": 0.73
            }
        },
        "type": "ChangedKeywordBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordMatchType\">exact</span> keyword <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordText\">sweat bands waist trimmer</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Sweat Waist Band [r] (e)</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (Exact Other)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.75$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.73$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">down</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.02$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">2.67%</span>) based on keyword ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordACoS\">24.4%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordClicks\">9</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">21.4%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20.73%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">BoostPPCProfit</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">62606456-2708-4550-bd50-16940091a39f</span>",
        "viewed": true
    },
    {
        "keyword_id": null,
        "bid": null,
        "datetime": "2021-11-04 09:33:05",
        "object": "B08GS5BLX1",
        "object_type": "ASIN PT",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.66,
                "new_bid": 0.55
            }
        },
        "type": "ChangedPATBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patType\">manual</span> Product Targeting for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patIntentType\">ASIN</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"patValue\">B08GS5BLX1</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Top Asins - Hoplynn [r] (tapt)</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (TPA)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.66$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.55$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">down</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.11$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">16.67%</span>) based on Product Targeting ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"patACoS\">44.95%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"patClicks\">10</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">19.65%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20.73%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">BoostPPCProfit</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">0010f849-4106-4004-8d4d-a8c6c26d6b19</span>",
        "viewed": true
    },
    {
        "keyword_id": null,
        "bid": null,
        "datetime": "2021-11-04 09:33:05",
        "object": "B07X39RHLK",
        "object_type": "ASIN PT",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.48,
                "new_bid": 0.44
            }
        },
        "type": "ChangedPATBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patType\">manual</span> Product Targeting for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patIntentType\">ASIN</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"patValue\">B07X39RHLK</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Risk ASINs</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (Risk ASINs)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.48$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.44$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">down</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.04$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">8.33%</span>) based on Product Targeting ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"patACoS\">32.69%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"patClicks\">9</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">19.65%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20.73%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">BoostPPCProfit</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">193ac953-603c-4329-8f84-746179bcc760</span>",
        "viewed": true
    },
    {
        "keyword_id": "231322481914596",
        "bid": null,
        "datetime": "2021-11-04 07:33:04",
        "object": "velcro waist trainer for women",
        "object_type": "Exact Keyword",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.6,
                "new_bid": 0.59
            }
        },
        "type": "ChangedKeywordBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordMatchType\">exact</span> keyword <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordText\">velcro waist trainer for women</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Exact Low Acos [r] (ela)</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (ST Exact / Phrase)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.6$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.59$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">down</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.01$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">1.67%</span>) based on keyword ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordACoS\">21.98%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordClicks\">9</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">21.42%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20.73%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">BoostPPCProfit</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">19694dd6-4ac1-47ef-a076-7a8224e029c8</span>",
        "viewed": true
    },
    {
        "keyword_id": "202528249478402",
        "bid": null,
        "datetime": "2021-11-04 05:32:54",
        "object": "sweat trainer for women",
        "object_type": "Exact Keyword",
        "action": {
            "type": "PAUSED",
            "data": []
        },
        "type": "PausedKeywordHighACoS",
        "info": "Paused <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordMatchType\">exact</span> keyword <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordText\">sweat trainer for women</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Amazon's Choice</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (Amazon's Choice)</span> because it had too high ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordACoS\">56.51%</span> with <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordClicks\">10</span> clicks, <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordSpend\">7.34$</span> spend and <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordSales\">12.99$</span> sales based on normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">21.47%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">AchieveTargetACoS</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">9081fc09-0abd-4d38-94f5-a29c6d2ec35f</span>",
        "viewed": true
    },
    {
        "keyword_id": null,
        "bid": null,
        "datetime": "2021-11-04 05:32:54",
        "object": "B088M2QLHC",
        "object_type": "ASIN PT",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.66,
                "new_bid": 0.74
            }
        },
        "type": "ChangedPATBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patType\">manual</span> Product Targeting for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patIntentType\">ASIN</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"patValue\">B088M2QLHC</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Top Asins - Hoplynn [r] (tapt)</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (TPA)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.66$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.74$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">up</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.08$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">12.12%</span>) based on Product Targeting ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"patACoS\">7.68%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"patClicks\">8</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">19.67%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">AchieveTargetACoS</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">e4746e88-7d33-4232-a12a-a5601316a7aa</span>",
        "viewed": true
    },
    {
        "keyword_id": "49566036537147",
        "bid": null,
        "datetime": "2021-11-04 05:32:54",
        "object": "fitness belts weight waist trimmer",
        "object_type": "Exact Keyword",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.75,
                "new_bid": 0.68
            }
        },
        "type": "ChangedKeywordBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordMatchType\">exact</span> keyword <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordText\">fitness belts weight waist trimmer</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Belt Trimmer Waist [r] (e)</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (Exact Other)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.75$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.68$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">down</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.07$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">9.33%</span>) based on keyword ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordACoS\">32.79%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordClicks\">6</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">21.47%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">AchieveTargetACoS</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">d3c3f912-7875-43e4-81aa-0ce856867a49</span>",
        "viewed": true
    },
    {
        "keyword_id": "183287924790062",
        "bid": null,
        "datetime": "2021-11-04 05:32:54",
        "object": "perfotek",
        "object_type": "Phrase Keyword",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 1.05,
                "new_bid": 1.11
            }
        },
        "type": "ChangedKeywordBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordMatchType\">phrase</span> keyword <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordText\">perfotek</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">My Brand [r] (mb)</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (Brands)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">1.05$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">1.11$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">up</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.06$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">5.71%</span>) based on keyword ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordACoS\">14.13%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordClicks\">4</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">25.9%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">AchieveTargetACoS</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">cc0c5a3a-3cb9-4ece-b088-98ba273fa96c</span>",
        "viewed": true
    },
    {
        "keyword_id": "83283663509853",
        "bid": null,
        "datetime": "2021-11-04 05:32:54",
        "object": "tummy bands to lose weight",
        "object_type": "Exact Keyword",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.55,
                "new_bid": 0.49
            }
        },
        "type": "ChangedKeywordBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordMatchType\">exact</span> keyword <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordText\">tummy bands to lose weight</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Exact Low Acos [r] (ela)</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (ST Exact / Phrase)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.55$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.49$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">down</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.06$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">10.91%</span>) based on keyword ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordACoS\">34.18%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordClicks\">11</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">21.47%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">AchieveTargetACoS</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">422fed28-5737-4744-b10f-4336e1efc818</span>",
        "viewed": true
    },
    {
        "keyword_id": "251104020202616",
        "bid": null,
        "datetime": "2021-11-04 05:32:54",
        "object": "sweat belt",
        "object_type": "Exact Keyword",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.49,
                "new_bid": 0.46
            }
        },
        "type": "ChangedKeywordBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordMatchType\">exact</span> keyword <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordText\">sweat belt</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Exact Low Acos [r] (ela)</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (ST Exact / Phrase)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.49$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.46$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">down</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.03$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">6.12%</span>) based on keyword ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordACoS\">30.25%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordClicks\">10</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">21.47%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">AchieveTargetACoS</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">26115006-c350-475e-b141-9350bed0355c</span>",
        "viewed": true
    },
    {
        "keyword_id": "66347487257148",
        "bid": null,
        "datetime": "2021-11-04 04:33:16",
        "object": "stomach fat burner wrap",
        "object_type": "Exact Keyword",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.76,
                "new_bid": 0.71
            }
        },
        "type": "ChangedKeywordBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordMatchType\">exact</span> keyword <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordText\">stomach fat burner wrap</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Amazon's Choice</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (Amazon's Choice)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.76$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.71$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">down</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.05$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">6.58%</span>) based on keyword ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordACoS\">30.33%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordClicks\">5</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">21.39%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">AchieveTargetACoS</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">a596406a-31e5-400b-b657-a8ff4cc186f2</span>",
        "viewed": true
    },
    {
        "keyword_id": null,
        "bid": null,
        "datetime": "2021-11-04 04:33:16",
        "object": "B07KYBTY8Y",
        "object_type": "ASIN PT",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.57,
                "new_bid": 0.46
            }
        },
        "type": "ChangedPATBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patType\">manual</span> Product Targeting for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patIntentType\">ASIN</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"patValue\">B07KYBTY8Y</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Top Competitor Asins - Mermaid S Mystery [r] (tcat)</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (TCA)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.57$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.46$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">down</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.11$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">19.3%</span>) based on Product Targeting ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"patACoS\">53.43%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"patClicks\">13</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">19.57%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">AchieveTargetACoS</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">886a3db4-5436-4e99-bda4-123e4e68cb64</span>",
        "viewed": true
    },
    {
        "keyword_id": null,
        "bid": null,
        "datetime": "2021-11-04 04:33:16",
        "object": "B08TH2TQCH",
        "object_type": "ASIN PT",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.9,
                "new_bid": 0.8
            }
        },
        "type": "ChangedPATBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patType\">manual</span> Product Targeting for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patIntentType\">ASIN</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"patValue\">B08TH2TQCH</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Top Asins - Riya [r] (tapt)</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (TPA)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.9$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.8$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">down</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.1$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">11.11%</span>) based on Product Targeting ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"patACoS\">38.34%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"patClicks\">9</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">19.57%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">AchieveTargetACoS</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">d0415bb9-9332-4941-94cd-eee5f4bf264f</span>",
        "viewed": true
    },
    {
        "keyword_id": "191349662351581",
        "bid": null,
        "datetime": "2021-11-04 03:33:02",
        "object": "waist trainer for women",
        "object_type": "Exact Keyword",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.5,
                "new_bid": 0.45
            }
        },
        "type": "ChangedKeywordBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordMatchType\">exact</span> keyword <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordText\">waist trainer for women</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">No Close Variants [r] (e)</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (DPK Exact)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.5$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.45$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">down</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.05$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">10%</span>) based on keyword ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordACoS\">34.49%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordClicks\">9</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">21.4%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">AchieveTargetACoS</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">92eb91db-263c-4306-9a7d-2f72c943fd9e</span>",
        "viewed": true
    },
    {
        "keyword_id": "178047961747304",
        "bid": null,
        "datetime": "2021-11-04 02:32:55",
        "object": "sports research waist trainer",
        "object_type": "Exact Keyword",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.7,
                "new_bid": 0.79
            }
        },
        "type": "ChangedKeywordBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordMatchType\">exact</span> keyword <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordText\">sports research waist trainer</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Exact Low Acos (ela)</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">PW_PARENT-WAIST-5 (ST Exact / Phrase)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.7$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.79$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">up</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.09$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">12.86%</span>) based on keyword ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordACoS\">8.07%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordClicks\">9</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">21.38%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">AchieveTargetACoS</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">a0c622e0-6ba4-44fa-b9fc-c9dd4081c005</span>",
        "viewed": true
    },
    {
        "keyword_id": "132012442821982",
        "bid": null,
        "datetime": "2021-11-04 00:32:57",
        "object": "sports research",
        "object_type": "Phrase Keyword",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.55,
                "new_bid": 0.61
            }
        },
        "type": "ChangedKeywordBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordMatchType\">phrase</span> keyword <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordText\">sports research</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Competing Brands [r] (cb)</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (Brands)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.55$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.61$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">up</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.06$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">10.91%</span>) based on keyword ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordACoS\">9.8%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordClicks\">7</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">27.27%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">AchieveTargetACoS</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">7a1c9f4d-0246-4bd5-a418-5cf1c01b2e53</span>",
        "viewed": true
    },
    {
        "keyword_id": null,
        "bid": null,
        "datetime": "2021-11-04 00:32:57",
        "object": "B07QK5ZGQ5",
        "object_type": "ASIN PT",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.61,
                "new_bid": 0.5
            }
        },
        "type": "ChangedPATBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patType\">manual</span> Product Targeting for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patIntentType\">ASIN</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"patValue\">B07QK5ZGQ5</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Top Competitor Asins - Sports Research [r] (tcat)</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (TCA)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.61$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.5$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">down</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.11$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">18.03%</span>) based on Product Targeting ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"patACoS\">53.58%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"patClicks\">13</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">19.58%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">AchieveTargetACoS</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">4c24ea53-5349-4dff-bd54-dd0992a462e9</span>",
        "viewed": true
    },
    {
        "keyword_id": "249560986463437",
        "bid": null,
        "datetime": "2021-11-03 23:32:48",
        "object": "fat burner waist trainer for women",
        "object_type": "Exact Keyword",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.77,
                "new_bid": 0.73
            }
        },
        "type": "ChangedKeywordBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordMatchType\">exact</span> keyword <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordText\">fat burner waist trainer for women</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Amazon's Choice</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (Amazon's Choice)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.77$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.73$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">down</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.04$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">5.19%</span>) based on keyword ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordACoS\">27.64%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordClicks\">4</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">21.35%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">AchieveTargetACoS</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">3eebf912-c19d-4d15-adcb-c87ae33a17ed</span>",
        "viewed": true
    },
    {
        "keyword_id": null,
        "bid": null,
        "datetime": "2021-11-03 23:32:48",
        "object": "B08TH2TQCH",
        "object_type": "ASIN PT",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.84,
                "new_bid": 0.9
            }
        },
        "type": "ChangedPATBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patType\">manual</span> Product Targeting for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patIntentType\">ASIN</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"patValue\">B08TH2TQCH</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Top Asins - Riya [r] (tapt)</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (TPA)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.84$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.9$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">up</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.06$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">7.14%</span>) based on Product Targeting ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"patACoS\">12.32%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"patClicks\">10</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">19.92%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">AchieveTargetACoS</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">bd3607f4-f5b7-4e69-bc4c-2dd364d96556</span>",
        "viewed": true
    },
    {
        "keyword_id": null,
        "bid": null,
        "datetime": "2021-11-03 19:32:44",
        "object": "B07KY3DLWR",
        "object_type": "ASIN PT",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.5,
                "new_bid": 0.53
            }
        },
        "type": "ChangedPATBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patType\">manual</span> Product Targeting for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patIntentType\">ASIN</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"patValue\">B07KY3DLWR</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Top Competitor Asins - Mermaid S Mystery [r] (tcat)</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (TCA)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.5$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.53$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">up</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.03$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">6%</span>) based on Product Targeting ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"patACoS\">13.52%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"patClicks\">13</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">19.9%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">AchieveTargetACoS</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">22c36ee1-e70e-4dd5-bd36-05e72de1eed4</span>",
        "viewed": true
    },
    {
        "keyword_id": null,
        "bid": null,
        "datetime": "2021-11-03 16:32:48",
        "object": "B08TH2TQCH",
        "object_type": "ASIN PT",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.9,
                "new_bid": 0.84
            }
        },
        "type": "ChangedPATBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patType\">manual</span> Product Targeting for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patIntentType\">ASIN</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"patValue\">B08TH2TQCH</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Top Asins - Riya [r] (tapt)</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (TPA)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.9$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.84$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">down</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.06$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">6.67%</span>) based on Product Targeting ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"patACoS\">31.95%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"patClicks\">6</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">19.91%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">AchieveTargetACoS</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">0a89f3e2-ed04-475e-86da-a097b53c7563</span>",
        "viewed": true
    },
    {
        "keyword_id": null,
        "bid": null,
        "datetime": "2021-11-03 11:32:53",
        "object": "B07QK5ZGQ5",
        "object_type": "ASIN PT",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.56,
                "new_bid": 0.61
            }
        },
        "type": "ChangedPATBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patType\">manual</span> Product Targeting for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patIntentType\">ASIN</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"patValue\">B07QK5ZGQ5</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Top Competitor Asins - Sports Research [r] (tcat)</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (TCA)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.56$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.61$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">up</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.05$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">8.93%</span>) based on Product Targeting ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"patACoS\">11.52%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"patClicks\">9</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">19.85%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">AchieveTargetACoS</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">b263f16e-bbfd-406c-94ac-07b31b399556</span>",
        "viewed": true
    },
    {
        "keyword_id": "82415385819969",
        "bid": null,
        "datetime": "2021-11-03 06:32:54",
        "object": "sweet sweat ointment",
        "object_type": "Exact Keyword",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.55,
                "new_bid": 0.6
            }
        },
        "type": "ChangedKeywordBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordMatchType\">exact</span> keyword <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordText\">sweet sweat ointment</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Exact Low Acos [r] (ela)</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (ST Exact / Phrase)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.55$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.6$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">up</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.05$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">9.09%</span>) based on keyword ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordACoS\">10.96%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"keywordClicks\">8</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">21.43%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">AchieveTargetACoS</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">ac60d706-320e-4f43-8d09-cf756025b61e</span>",
        "viewed": true
    },
    {
        "keyword_id": null,
        "bid": null,
        "datetime": "2021-11-03 04:33:14",
        "object": "B00EIWU2FE",
        "object_type": "ASIN PT",
        "action": {
            "type": "CHANGED",
            "data": {
                "previous_bid": 0.42,
                "new_bid": 0.4
            }
        },
        "type": "ChangedPATBidACoS",
        "info": "Changed bid for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patType\">manual</span> Product Targeting for <span style=\"font-weight: bold; color: #343C5A;\" class=\"patIntentType\">ASIN</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"patValue\">B00EIWU2FE</span> in ad group <span style=\"font-weight: bold; color: #343C5A;\" class=\"adGroupName\">Top Competitor Asins - Sports Research [r] (tcat)</span> in campaign <span style=\"font-weight: bold; color: #343C5A;\" class=\"campaignName\">WT Waist Trimmer (TCA)</span> from <span style=\"font-weight: bold; color: #343C5A;\" class=\"previousBid\">0.42$</span> to <span style=\"font-weight: bold; color: #343C5A;\" class=\"newBid\">0.4$</span> (<span style=\"font-weight: bold; color: #343C5A;\" class=\"changeWord\">down</span> <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangeAbsolute\">0.02$</span> or <span style=\"font-weight: bold; color: #343C5A;\" class=\"bidChangePercentage\">4.76%</span>) based on Product Targeting ACoS <span style=\"font-weight: bold; color: #343C5A;\" class=\"patACoS\">27.1%</span>, <span style=\"font-weight: bold; color: #343C5A;\" class=\"patClicks\">9</span> clicks, normalized conversion rate <span style=\"font-weight: bold; color: #343C5A;\" class=\"averageConversionRate\">19.81%</span> and product target ACoS: <span style=\"font-weight: bold; color: #343C5A;\" class=\"targetACoS\">20%</span> (calculated based on your product margin: <span style=\"font-weight: bold; color: #343C5A;\" class=\"productMargin\">29.61%</span> and selected optimization strategy: <span style=\"font-weight: bold; color: #343C5A;\" class=\"optimizationStrategy\">AchieveTargetACoS</span>). Operation id: <span style=\"font-weight: bold; color: #343C5A;\" class=\"operationId\">ecb5aff0-cf8d-4529-b9a0-c884addb74d2</span>",
        "viewed": true
    }
]

const ReportTable = ({
                         reportsList,
                         processing,
                         paginationParams,
                         paginationChangeHandler,
                         sortChangeHandler,
                         columns,
                         sorterColumn,
                         filters,
                         addFilterHandler,
                         totalSize,
                         filteredById
                     }) => {

    return (
        <div className="ReportTable">
            <div className="content">
                <CustomTable
                    onChangeSorter={sortChangeHandler}
                    loading={processing}
                    dataSource={reportsList}
                    // dataSource={fakeData}
                    sorterColumn={sorterColumn}
                    revertSortingColumns={['datetime']}
                    emptyText={'image'}
                    emptyTitle={'No data found'}
                    emptyDescription={'There’s currently no data to display'}

                    columns={[
                        {...dateField},
                        ...columns,
                        {...infoField},
                        {...sorterByKeywordField(addFilterHandler, filteredById)}
                    ]}
                    rowClassName={(item) => !item.viewed && 'new-report'}
                />
            </div>

            <Pagination
                onChange={paginationChangeHandler}
                page={paginationParams.page}
                pageSizeOptions={[25, 50, 100, 200]}
                pageSize={paginationParams.pageSize}
                totalSize={totalSize}
                listLength={reportsList.length}
                processing={processing}
            />
        </div>
    )
}


export default React.memo(ReportTable)
