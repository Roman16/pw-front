import React, {useState, useRef, useEffect} from "react"
import {SVG} from "../../utils/icons"
import {Input, Popover, Switch} from "antd"
import './SearchField.less'

const {TextArea} = Input

export const SearchField = ({
                                placeholder,
                                onSearch,
                                value
                            }) => {
    const [multiSearch, setMultiSearch] = useState(false),
        [strictSearch, setStrictSearch] = useState(false),
        [searchValue, setSearchValue] = useState()

    const textAreaRef = useRef(null)

    const addNevLine = () => {
        setSearchValue((prevState = '') => prevState + '\r\n')
        textAreaRef.current.focus()
    }

    const searchHandler = () => {
        onSearch({
            strictSearch: strictSearch,
            multiSearch: multiSearch,
            value: multiSearch ? searchValue.split('\n').map(i => i.trim()).filter(item => item !== '') : searchValue
        })
    }

    const keydownHandler = (e) => {
        if (e.keyCode === 13 && e.ctrlKey) searchHandler()
    }

    const changeInputTypeHandler = (value) => {
        setSearchValue()
        setMultiSearch(value)
    }

    useEffect(() => {

        if (value?.strictSearch) {
            setStrictSearch(true)
        }
        if (value?.multiSearch) {
            setMultiSearch(true)
        }

        value = value?.value || ''

        if (value) {
            if (typeof value === 'string') {
                setSearchValue(value)
            } else {
                setSearchValue(value.join('\r\n'))
                setMultiSearch(true)
            }
        } else {
            setSearchValue()
            setMultiSearch(false)
        }
    }, [value])

    useEffect(() => {
        document.removeEventListener('keydown', keydownHandler)
        document.addEventListener('keydown', keydownHandler)

        return (() => document.removeEventListener('keydown', keydownHandler))
    }, [searchValue])


    return (<div className={`form-group multi-search-field ${multiSearch ? 'multi-search' : ''}`}>
        {multiSearch ?
            <TextArea
                rows={3}
                ref={textAreaRef}
                placeholder={placeholder}
                value={searchValue}

                onChange={e => setSearchValue(e.target.value)}
            />
            :
            <Input
                placeholder={placeholder}
                value={searchValue}

                onChange={e => setSearchValue(e.target.value)}
                onPressEnter={searchHandler}
                // onBlur={searchHandler}
            />}

        {<button className="btn icon on-search-btn" onClick={searchHandler}><SVG id={'search'}/></button>}

        <Popover
            trigger="click"
            placement="bottomRight"
            overlayClassName={'search-field-options-popover'}
            getPopupContainer={(node) => node.parentNode}
            content={<div className="switches">
                <div className='switch-block optimization-switch'>
                    <Switch
                        checked={multiSearch}
                        onChange={() => changeInputTypeHandler(!multiSearch)}
                    />
                    <span>Multisearch</span>
                </div>

                <div className='switch-block optimization-switch'>
                    <Switch
                        checked={strictSearch}
                        onChange={() => setStrictSearch(prevState => !prevState)}
                    />
                    <span>Strict search</span>
                </div>
            </div>}
        >
            <button className={`btn icon switch-multi-search ${(multiSearch || strictSearch) ? 'active' : ''}`}>
                <SVG id={'multi-search-icon'}/>
            </button>
        </Popover>


        {multiSearch && <button className="btn icon line-break" onClick={addNevLine}><SVG id={'line-break'}/></button>}
    </div>)
}