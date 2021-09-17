import React, {useState} from "react"
import Input from "./Input"
import Output from "./Output"
import Phrases from "./Phrases"
import Exacts from "./Exacts"
import './WordSorter.less'

const WordSorter = () => {
    const [outputList, setOutputList] = useState([]),
        [negativePhrasesList, setNegativePhrasesList] = useState([]),
        [disabledInput, setDisabledInput] = useState(false)


    const addDefaultListHandler = ({output}) => {
        setDisabledInput(true)
        setOutputList(output)
    }

    const addNegativePhraseHandler = (keyword) => {
        setNegativePhrasesList([...new Set([...negativePhrasesList, keyword])])
    }

    const resetAllHandler = () => {
        setDisabledInput(false)
        setOutputList([])
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
                    disabled={disabledInput}
                    onAddKeywords={addDefaultListHandler}
                />

                <Output
                    phrasesList={outputList}

                    onAddPhrase={addNegativePhraseHandler}
                />

                <Phrases
                    phrasesList={negativePhrasesList}
                />

                <Exacts/>
            </div>
        </section>
    )
}

export default WordSorter