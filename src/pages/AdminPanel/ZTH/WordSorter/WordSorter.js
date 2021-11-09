import React, {useEffect, useState} from "react"
import Input from "./Input"
import Output from "./Output"
import Phrases from "./Phrases"
import Exacts from "./Exacts"
import './WordSorter.less'
import Filters from "./Filters"

const findContiguousArrayIndex = (arr, subarr, fromIndex) => {
    const sl = subarr.length
    const l = arr.length + 1 - sl
    loop: for (let i = Math.trunc(fromIndex); i < l; i++) {
        for (let j = 0; j < sl; j++) {
            if (arr[i + j] !== subarr[j]) {
                continue loop
            }
        }
        return i
    }
    return -1
}

export const filteringNegativeExactList = (negativePhrase, arr, isIncludes = false) => {
    return arr.filter(keyword => {
        if (isIncludes) return findContiguousArrayIndex(keyword.split(' '), negativePhrase.split(' '), 0) === -1
        else return findContiguousArrayIndex(keyword.split(' '), negativePhrase.split(' '), 0) > -1
    })
}

const WordSorter = () => {
    let paramsFromLocale
    paramsFromLocale = localStorage.getItem('wordSorter') ? JSON.parse(localStorage.getItem('wordSorter')) : undefined

    const [inputFields, setInputFields] = useState(paramsFromLocale ? paramsFromLocale.inputFields : {
            relevant: '',
            negative: ''
        }),
        [outputList, setOutputList] = useState(paramsFromLocale ? [...paramsFromLocale.outputList] : []),
        [negativePhrasesList, setNegativePhrasesList] = useState(paramsFromLocale ? [...paramsFromLocale.negativePhrasesList] : []),
        [negativeExactsList, setNegativeExactsList] = useState(paramsFromLocale ? [...paramsFromLocale.negativeExactsList] : []),
        [currentLanguage, setCurrentLanguage] = useState('en'),
        [currentMarketplace, setCurrentMarketplace] = useState('amazon.com')

    const changeInputFieldHandler = (key, value) => setInputFields({...inputFields, [key]: value})

    const addDefaultListHandler = () => {
        const relevantList = [...new Set([...inputFields.relevant.split('\n').map(i => i.trim()).filter(i => i && i.length > 0).map(i => i.toLowerCase())])]

        setOutputList(relevantList)

        inputFields.negative
            .split('\n')
            .filter(i => i && i.length > 0)
            .forEach(negativePhrase => {
                setNegativePhrasesList(prevState => [...new Set([...prevState, negativePhrase])])

                setNegativeExactsList(prevState => [...prevState, ...filteringNegativeExactList(negativePhrase, relevantList)])
            })
    }

    const addNegativePhraseHandler = (negativePhrase, arr, negativeList) => {
        setNegativePhrasesList(negativeList || [...new Set([...negativePhrasesList, negativePhrase])])

        // setNegativeExactsList(arr || [...negativeExactsList, ...outputList
        //     .filter(i => !negativeExactsList.includes(i))
        //     .filter(i => {
        //         let re = new RegExp('(\\s|^)+' + negativePhrase + '+(\\s|$)', 'gm')
        //         return i.search(re) !== -1
        //     })
        //     .map(i => i)
        // ])

        const negativeExactArr = [...negativeExactsList, ...filteringNegativeExactList(negativePhrase, [...outputList.filter(i => !negativeExactsList.includes(i))])]

        setNegativeExactsList([...negativeExactArr])
    }

    const addNegativeExactHandler = (keyword) => {
        setNegativeExactsList([...negativeExactsList, keyword])
    }

    const removeExactHandler = (index) => setNegativeExactsList([...negativeExactsList.filter((item, i) => i !== index)])

    const removePhraseHandler = (index) => setNegativePhrasesList([...negativePhrasesList.filter((item, i) => i !== index)])

    const removePhraseWithExactsHandler = (keyword) => {
        setNegativePhrasesList([...negativePhrasesList.filter(i => i !== keyword)])

        setNegativeExactsList([...filteringNegativeExactList(keyword, negativeExactsList, true)])
    }

    const resetAllHandler = () => {
        setInputFields({relevant: '', negative: ''})
        setOutputList([])
        setNegativePhrasesList([])
        setNegativeExactsList([])

        localStorage.removeItem('wordSorter')
    }

    const copyListHandler = (list, type) => {
        if (type === 'output') {
            navigator.clipboard.writeText(list.filter(i => !negativeExactsList.includes(i)).join('\n'))
        } else {
            navigator.clipboard.writeText(list.map(i => type === 'output' ? i : i).join('\n'))
        }
    }

    useEffect(() => {
        localStorage.setItem('wordSorter', JSON.stringify({
            inputFields: inputFields,
            outputList: outputList,
            negativePhrasesList: negativePhrasesList,
            negativeExactsList: negativeExactsList
        }))
    }, [inputFields, outputList, negativePhrasesList, negativeExactsList])

    useEffect(() => {
        if (localStorage.getItem('wordSorter')) {
            setInputFields(inputFields)
            setOutputList(outputList)
            setNegativePhrasesList(negativePhrasesList)
            setNegativeExactsList(negativeExactsList)
        }
    }, [])


    return (
        <section className={'word-sorter'}>
            <Filters
                language={currentLanguage}
                marketplace={currentMarketplace}

                onChangeLanguage={(value) => setCurrentLanguage(value)}
                onChangeMarketplace={(value) => setCurrentMarketplace(value)}
                onReset={resetAllHandler}
            />

            <div className="work-area">
                <Input
                    inputFields={inputFields}
                    disabled={outputList.length > 0}

                    onChange={changeInputFieldHandler}
                    onAddKeywords={addDefaultListHandler}
                />

                <Output
                    phrasesList={outputList}
                    negativeExactsList={negativeExactsList}
                    language={currentLanguage}
                    marketplace={currentMarketplace}
                    negativePhrasesList={negativePhrasesList}

                    onCopy={() => copyListHandler(outputList, 'output')}
                    onAddPhrase={addNegativePhraseHandler}
                    onAddExact={addNegativeExactHandler}
                />

                <Phrases
                    phrasesList={negativePhrasesList}

                    onRemoveItem={removePhraseHandler}
                    onRemoveWithExacts={removePhraseWithExactsHandler}
                    onCopy={() => copyListHandler(negativePhrasesList)}
                />

                <Exacts
                    phrasesList={negativeExactsList}
                    language={currentLanguage}
                    marketplace={currentMarketplace}

                    onRemove={removeExactHandler}
                    onCopy={() => copyListHandler(negativeExactsList)}
                />
            </div>
        </section>
    )
}

export default WordSorter