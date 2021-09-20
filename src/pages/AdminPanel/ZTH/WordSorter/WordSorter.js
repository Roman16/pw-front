import React, {useState} from "react"
import Input from "./Input"
import Output from "./Output"
import Phrases from "./Phrases"
import Exacts from "./Exacts"
import './WordSorter.less'

const WordSorter = () => {
    const
        [inputFields, setInputFields] = useState({
            relevant: '',
            negative: ''
        }),
        [outputList, setOutputList] = useState([]),
        [negativePhrasesList, setNegativePhrasesList] = useState([]),
        [negativeExactsList, setNegativeExactsList] = useState([]),
        [disabledInput, setDisabledInput] = useState(false)

    const changeInputFieldHandler = (key, value) => setInputFields({...inputFields, [key]: value})

    const addDefaultListHandler = () => {
        setDisabledInput(true)

        setOutputList(inputFields.relevant
            .split('\n')
            .filter(i => i && i.length > 0)
            .map(i => i.toLowerCase())
            .map((phrase, index) => ({
                phrase,
                id: index,
                keywords: phrase.split(" "),
                visible: true,
            })))

        setNegativeExactsList(inputFields.negative.split('\n').filter(i => i && i.length > 0))
    }

    const addNegativePhraseHandler = (keyword) => {
        setNegativePhrasesList([...new Set([...negativePhrasesList, keyword])])
    }
    const addNegativeExactHandler = (keyword) => {
        setNegativeExactsList([...negativeExactsList, keyword])
    }

    const resetAllHandler = () => {
        setDisabledInput(false)
        setOutputList([])
        setNegativePhrasesList([])
        setNegativeExactsList([])
    }

    const copyListHandler = (list, type) => {
        navigator.clipboard.writeText(list.map(i => type === 'output' ? i.phrase : i).join('\n'))
    }

    return (
        <section className={'word-sorter'}>
            <div className="filters">
                <button className="btn default reset" onClick={resetAllHandler}>
                    Reset All
                </button>
            </div>

            <div className="work-area">
                <Input
                    inputFields={inputFields}
                    disabled={disabledInput}

                    onChange={changeInputFieldHandler}
                    onAddKeywords={addDefaultListHandler}
                />

                <Output
                    phrasesList={outputList}

                    onCopy={() => copyListHandler(outputList, 'output')}
                    onAddPhrase={addNegativePhraseHandler}
                    onAddExact={addNegativeExactHandler}
                />

                <Phrases
                    phrasesList={negativePhrasesList}

                    onCopy={() => copyListHandler(negativePhrasesList)}
                />

                <Exacts
                    phrasesList={negativeExactsList}

                    onCopy={() => copyListHandler(negativeExactsList)}
                />
            </div>
        </section>
    )
}

export default WordSorter