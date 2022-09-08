import React, {useEffect, useState} from "react"
import MultiTextArea, {MainKeyword} from "../../../components/MultiTextArea/MultiTextArea"
import {Spin} from "antd"
import InformationTooltip from "../../../../../components/Tooltip/Tooltip"
import _ from "lodash"
import axios from "axios"
import {SVG} from "../../../../../utils/icons"
import './SeedKeywords.less'
import {
    cleanMainKeyword, findExistingDuplicateOfNewMainKeyword, isLongTail,
    isMainKeywordValid, isTooShort,
    keywordHasMeaningfulWords
} from "../../../components/MultiTextArea/isMainKeywordValid"
import {zthServices} from "../../../../../services/zth.services"
import {notification} from "../../../../../components/Notification"


let prevCheckKeywords = []

export const SeedKeywords = ({onUpdate, campaigns, name}) => {
    const [mainKeywords, setMainKeywords] = useState([]),
        [newKeyword, setNewKeyword] = useState('')

    const changeMainKeywordsHandler = (list) => {
        onUpdate({
            campaigns: {
                ...campaigns,
                main_keywords: list
            }
        }, 'mainKeywords')


        mainKeywords.forEach(i => {
            if (_.find(list, {value: i.value})) {

            } else {
                i.cancel.cancel()
                prevCheckKeywords = [...prevCheckKeywords.filter(text => text !== i.value)]
            }
        })

        setMainKeywords(list
            .map(i => {
                i.cancel = i.cancel || axios.CancelToken.source()
                i.processing = !(i.estimate && i.estimate.success)
                i.estimate = {
                    lowResultsCountRounded: 0,
                    highResultsCountRounded: 0,
                    ...mainKeywords.find(key => key.value === i.value) ? mainKeywords.find(key => key.value === i.value).estimate : {}
                }
                return i
            }))
    }

    const addKeywordHandler = () => {
        const value = campaigns.main_keywords

        changeMainKeywordsHandler([...value, ...[...new Set(newKeyword.split('\n'))]
            .filter(word => {
                const clearKeyword = cleanMainKeyword(word)
                return (clearKeyword !== '' && !value.find(item => item.value === clearKeyword))
            })
            .map(word => {
                    const clearKeyword = cleanMainKeyword(word)
                    return ({
                        value: clearKeyword,
                        hasMeaningfulWords: keywordHasMeaningfulWords(clearKeyword),
                        isMainKeywordValid: isMainKeywordValid(clearKeyword, name),
                        isLongTail: isLongTail(clearKeyword),
                        isTooShort: isTooShort(clearKeyword)
                    })
                }
            )]
        )


        setNewKeyword('')
    }

    const getKeysEstimation = async (item) => {
        try {
            prevCheckKeywords = [...prevCheckKeywords, item.value]


            const {result} = await zthServices.getKeysCount([item.value], item.cancel.token)

            const estimate = result.keywordEstimations[0]

            setMainKeywords(prevState =>
                [...prevState.map(keyword => {
                    if (keyword.value === estimate.keywordText && estimate.success) {
                        keyword.estimate = estimate
                    }

                    if (keyword.value === item.value) keyword.processing = false

                    return keyword
                })])
        } catch (e) {
            setMainKeywords(prevState => [...prevState.map(keyword => {
                if (keyword.value === item.value) {
                    keyword.processing = false
                }
                return keyword
            })])

        }
    }

    useEffect(() => {
        mainKeywords.map((i) => {
            if (!prevCheckKeywords.includes(i.value) && i.isDuplicate === undefined) getKeysEstimation(i)

            return i
        })
    }, [mainKeywords])


    useEffect(() => {
        let validList = [...campaigns.main_keywords.map(item => {
            delete item.isDuplicate

            return item
        })]

        for (let i = validList.length - 1; i >= 0; i--) {
            const clearKeyword = cleanMainKeyword(validList[i].value)
            validList.find(findItem => findItem.value === validList[i].value).isDuplicate = findExistingDuplicateOfNewMainKeyword(clearKeyword, validList.filter(item => !item.isDuplicate && item.value !== clearKeyword).map(item => item.value))
        }

        setMainKeywords(validList)

        validList = []
    }, [campaigns.main_keywords])

    const clearKeywordsListHandler = () => {
        changeMainKeywordsHandler([])
    }

    const removeKeywordHandler = (index) => {
        changeMainKeywordsHandler([...mainKeywords.filter((i, itemIndex) => itemIndex !== index)])
    }

    return (
        <div className={`col text-area-group edit-block main_keywords seed-keywords`}>
            <div className="row description">
                <div className="col">
                    <label>
                        Add Seed Keywords
                        <InformationTooltip
                            description={' That’s the most critical part of creating Zero to Hero campaigns for your product.' +
                            ' You need to enter up to 5 most popular keywords that people use to find your product on the Amazon marketplace.' +
                            ' You can analyze your competitor’s Titles to find these keywords. That action will help us to create campaigns with the relevant keywords to your product.'}
                        />
                    </label>

                    <p> Seed keywords are basic keywords used to describe your product.</p>
                </div>
            </div>
            <div className="row header">
                <div className="col">
                    <p>
                        Please enter 3-5 keywords.
                    </p>
                </div>

                <div className="col">
                    <div className="row">
                        <div className="count"><b>{[...campaigns.main_keywords
                            .filter(item => item.hasMeaningfulWords !== false)
                            .filter(item => {
                                const clearKeyword = cleanMainKeyword(item.value)
                                return !findExistingDuplicateOfNewMainKeyword(clearKeyword, campaigns.main_keywords.filter(item => !item.isDuplicate && item.value !== clearKeyword).map(item => item.value))
                            })].length || 0}</b> keywords added
                        </div>
                        <button onClick={clearKeywordsListHandler}>Remove All</button>
                    </div>
                </div>
            </div>

            <div className="row body">
                <div className="form-group">
                        <textarea
                            value={newKeyword}
                            onChange={({target: {value}}) => setNewKeyword(value)}
                            required
                            placeholder={'Type here'}
                        />
                </div>

                <div className="col added-keywords">
                    <div className="keywords-list">
                        <div className="header">Keywords</div>
                        <ul>
                            {mainKeywords.map((keyword, index) => (
                                <li>
                                    <MainKeyword
                                        index={index}
                                        item={keyword}
                                        value={campaigns.main_keywords}

                                        removeKeywordHandler={removeKeywordHandler}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="row footer">
                <div className="col">
                    <button className={'sds-btn blue p15'} onClick={addKeywordHandler}>
                        <SVG id={'plus-icon'}/>
                        Add keywords
                    </button>
                </div>

                <div className="col">
                    {[
                        ...campaigns.main_keywords
                            .filter(item => item.hasMeaningfulWords !== false)
                            .filter(item => {
                                const clearKeyword = cleanMainKeyword(item.value)
                                return !findExistingDuplicateOfNewMainKeyword(clearKeyword, campaigns.main_keywords.filter(item => !item.isDuplicate && item.value !== clearKeyword).map(item => item.value))
                            })
                    ].length > 5 && <div className="length-error">
                        Please input no more than 5 keywords. Use estimation tool below to leave keywords with best yield.
                    </div>}

                    <div className="estimated-info">
                        <p>
                            Estimated amount of keywords in your <br/> campaigns yielded by the seed keywords
                        </p>

                        <div className="count">

                            {mainKeywords.some(i => i.processing) ?
                                <Spin size={'small'}/> : mainKeywords.length === 0 ?
                                    <InformationTooltip
                                        type={'custom'}
                                        description={'Add Seed Keywords to get an estimated amount of keywords that your campaigns will have.'}>
                                        <span>0</span>
                                    </InformationTooltip>
                                    :

                                    mainKeywords.some(i => i.estimate.success === true) ?
                                        <InformationTooltip
                                            type={'custom'}
                                            overlayClassName={'estimate-description'}
                                            description={<div className={''}>
                                                This is an estimated amount of keywords we will be able to
                                                gather
                                                based
                                                on provided Seed Keywords. Contributions by each keyword:

                                                <ul>
                                                    {mainKeywords.map(i => (
                                                        <li>
                                                            <span>{i.value}</span>: {i.estimate.success ? `${i.estimate.lowResultsCountRounded} - ${i.estimate.highResultsCountRounded}` : '-'}
                                                        </li>))}
                                                </ul>

                                                Note that amount of keywords for product will be capped at 5000
                                                to
                                                prevent overextension on campaigns with low-performing keywords.
                                            </div>}>

                                            <span className={'border'}>
                                                {mainKeywords.reduce((sum, currentValue) => sum + currentValue.estimate.lowResultsCountRounded, 0) > 2500 ? '2500' : mainKeywords.reduce((sum, currentValue) => sum + currentValue.estimate.lowResultsCountRounded, 0)}
                                                -
                                                {mainKeywords.reduce((sum, currentValue) => sum + currentValue.estimate.highResultsCountRounded, 0) > 5000 ? '5000' : mainKeywords.reduce((sum, currentValue) => sum + currentValue.estimate.highResultsCountRounded, 0)}
                                            </span>
                                        </InformationTooltip> : <div className="no-result"/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}