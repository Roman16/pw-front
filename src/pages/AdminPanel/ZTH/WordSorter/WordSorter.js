import React, {useEffect, useState} from "react"
import Input from "./Input"
import Output from "./Output"
import Phrases from "./Phrases"
import Exacts from "./Exacts"
import './WordSorter.less'
import Filters from "./Filters"
import pluralize from "pluralize"

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

const WordSorter = () => {
    let paramsFromLocale
    paramsFromLocale = localStorage.getItem('wordSorter') ? JSON.parse(localStorage.getItem('wordSorter')) : undefined

    const [inputFields, setInputFields] = useState(paramsFromLocale ? paramsFromLocale.inputFields : {
            relevant: '',
            negative: ''
        }),
        [outputList, setOutputList] = useState(paramsFromLocale ? paramsFromLocale.outputList : []),
        [negativePhrasesList, setNegativePhrasesList] = useState(paramsFromLocale ? paramsFromLocale.negativePhrasesList : []),
        [negativeExactsList, setNegativeExactsList] = useState(paramsFromLocale ? paramsFromLocale.negativeExactsList : []),
        [currentLanguage, setCurrentLanguage] = useState('en'),
        [currentMarketplace, setCurrentMarketplace] = useState('amazon.com')

    const changeInputFieldHandler = (key, value) => setInputFields({...inputFields, [key]: value})

    const addDefaultListHandler = () => {
        const relevantList = inputFields.relevant
            .split('\n')
            .map(i => i.trim())
            .filter(i => i && i.length > 0)
            .map(i => i.toLowerCase())
            .map((phrase, index) => ({
                phrase,
                id: index,
                keywords: phrase.split(" "),
            }))

        setOutputList(relevantList)

        inputFields.negative
            .split('\n')
            .filter(i => i && i.length > 0)
            .forEach(keyword => {
                setNegativePhrasesList([...new Set([...negativePhrasesList, keyword])])

                setNegativeExactsList([...negativeExactsList, ...relevantList
                    .filter(i => !negativeExactsList.includes(i.phrase))
                    .filter(i => {
                        console.log(i)

                        let re = new RegExp('(\\s|^)+' + keyword + '+(\\s|$)', 'gm')
                        return i.phrase.search(re) !== -1
                    })
                    .map(i => i.phrase)]
                )
            })
    }

    const addNegativePhraseHandler = (keyword) => {
        setNegativePhrasesList([...new Set([...negativePhrasesList, keyword])])

        setNegativeExactsList([...negativeExactsList, ...outputList
            .filter(i => !negativeExactsList.includes(i.phrase))
            .filter(i => {
                let re = new RegExp('(\\s|^)+' + keyword + '+(\\s|$)', 'gm')
                return i.phrase.search(re) !== -1
            })
            .map(i => i.phrase)]
        )
    }

    const addNegativeExactHandler = (keyword) => {
        setNegativeExactsList([...negativeExactsList, keyword])
    }

    const removeExactHandler = (index) => setNegativeExactsList([...negativeExactsList.filter((item, i) => i !== index)])
    const removePhraseHandler = (index) => setNegativePhrasesList([...negativePhrasesList.filter((item, i) => i !== index)])
    const removePhraseWithExactsHandler = (keyword) => {
        setNegativePhrasesList([...negativePhrasesList.filter(i => i !== keyword)])
        setNegativeExactsList([...negativeExactsList.filter(i => {
            let re = new RegExp('(\\s|^)+' + keyword + '+(\\s|$)', 'gm')
            return i.search(re) === -1
        })])
    }

    const resetAllHandler = () => {
        setInputFields({relevant: '', negative: ''})
        setOutputList([])
        setNegativePhrasesList([])
        setNegativeExactsList([])
    }

    const copyListHandler = (list, type) => {
        navigator.clipboard.writeText(list.map(i => type === 'output' ? i.phrase : i).join('\n'))
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