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

    const
        [relevantInput, setRelevantInput] = useState(''),
        [negativeInput, setNegativeInput] = useState(''),
        [outputList, setOutputList] = useState([]),
        [negativePhrasesList, setNegativePhrasesList] = useState([]),
        [negativeExactsList, setNegativeExactsList] = useState([]),
        [currentLanguage, setCurrentLanguage] = useState('en'),
        [currentMarketplace, setCurrentMarketplace] = useState('amazon.com')

    const changeInputFieldHandler = (key, value) => {
        if (key === 'relevant') setRelevantInput(value)
        else setNegativeInput(value)
    }

    const addDefaultListHandler = () => {
        const relevantList = [...new Set([...relevantInput.split('\n').map(i => i.trim()).filter(i => i && i.length > 0).map(i => i.toLowerCase())])]

        setOutputList(relevantList)

        negativeInput
            .split('\n')
            .filter(i => i && i.length > 0)
            .forEach(negativePhrase => {
                setNegativePhrasesList(prevState => [...new Set([...prevState, negativePhrase])])

                setNegativeExactsList(prevState => [...prevState, ...filteringNegativeExactList(negativePhrase, relevantList)])
            })
    }

    const addNegativePhraseHandler = (negativePhrase, arr, negativeList, outputListLocal) => {
        setNegativePhrasesList(negativeList || [...new Set([...negativePhrasesList, negativePhrase])])

        const negativeExactArr = [...negativeExactsList, ...filteringNegativeExactList(negativePhrase, [...[...outputListLocal || outputList].filter(i => !negativeExactsList.includes(i))])]

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
        setRelevantInput('')
        setNegativeInput('')
        setOutputList([])
        setNegativePhrasesList([])
        setNegativeExactsList([])

        localStorage.removeItem('wordSorter')
    }

    const copyListHandler = (list, type) => {
        if (type === 'output') {
            navigator.clipboard.writeText(list.filter(i => !negativeExactsList.includes(i)).join('\n'))
        } else if (type === 'input') {
            navigator.clipboard.writeText(list)
        } else {
            navigator.clipboard.writeText(list.map(i => type === 'output' ? i : i).join('\n'))
        }
    }

    useEffect(() => {
        if (localStorage.getItem('wordSorter')) {
            const paramsFromLocale = JSON.parse(localStorage.getItem('wordSorter'))

            setRelevantInput(paramsFromLocale.relevantInput)
            setNegativeInput(paramsFromLocale.negativeInput)
            setOutputList(paramsFromLocale.outputList)
            setNegativePhrasesList(paramsFromLocale.negativePhrasesList)
            setNegativeExactsList(paramsFromLocale.negativeExactsList)
        }
    }, [])

    useEffect(() => {
       if(relevantInput) localStorage.setItem('wordSorter', JSON.stringify({
           relevantInput: relevantInput,
           negativeInput: negativeInput,
           outputList: outputList,
           negativePhrasesList: negativePhrasesList,
           negativeExactsList: negativeExactsList
       }))
    }, [relevantInput, negativeInput, outputList, negativePhrasesList, negativeExactsList])


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
                    inputFields={{
                        relevant: relevantInput,
                        negative: negativeInput
                    }}
                    disabled={outputList.length > 0}
                    onCopy={copyListHandler}

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