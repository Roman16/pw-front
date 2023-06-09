import React, {useEffect, useState} from "react"
import {Input} from "antd"
import {SVG} from "../../../../utils/icons"
import CustomTable from "../../../../components/Table/CustomTable"
import ExcelTable from "../../../../components/ExcelTable/ExcelTable"
import {keyColumn, textColumn} from "react-datasheet-grid"

const Themes = ({themes = [], setThemes, variationIndex}) => {
    const [activeThemeIndex, setActiveThemeIndex] = useState(0)

    const add = () => {
        setThemes([...themes, {theme: '', value: '', relatedValues: []}])
    }

    const removeThemeHandler = (e, index) => {
        e.stopPropagation()

        if (index === activeThemeIndex) setActiveThemeIndex(0)
        setThemes([...themes.filter((item, i) => i !== index)])
    }

    const changeThemeRelatedValue = (data) => {
        setThemes(themes.map((theme, i) => {
            if (activeThemeIndex === i) {
                theme.relatedValues = data.map(item => item.value)
            }

            return theme
        }))
    }

    const changeThemeHandler = (name, value) => {
        setThemes(themes.map((theme, index) => {
            if (activeThemeIndex === index) {
                theme[name] = value
            }
            return theme
        }))
    }

    useEffect(() => {
        setActiveThemeIndex(0)
    }, [variationIndex])

    const columns = [
        {...keyColumn('value', textColumn), title: 'Value'},
    ]

    return (
        <div className="themes">
            <h3>Themes</h3>
            <button className={'btn default'} onClick={add}>Add new theme</button>
            <br/>

            <ul className="themes-list list-tabs">
                {themes.map((theme, index) => (<li
                    onClick={() => setActiveThemeIndex(index)}
                    className={index === activeThemeIndex && 'active'}
                >
                    {theme.theme ? `${theme.theme}${theme.value && ':'} ${theme.value}` : 'New Theme'}

                    <button onClick={(e) => removeThemeHandler(e, index)}>
                        <SVG id={'close-icon'}/>
                    </button>
                </li>))}
            </ul>


            {themes[activeThemeIndex] && <>
                <div className="row">
                    <div className="form-group">
                        <label htmlFor="">Theme name:</label>
                        <Input
                            placeholder={'Enter theme name'}
                            value={themes[activeThemeIndex].theme}
                            onChange={({target: {value}}) => changeThemeHandler('theme', value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Theme value:</label>
                        <Input
                            placeholder={'Enter theme value'}
                            value={themes[activeThemeIndex].value}
                            onChange={({target: {value}}) => changeThemeHandler('value', value)}
                        />
                    </div>
                </div>

                <h4>Related theme values:</h4>
                <ExcelTable
                    data={themes[activeThemeIndex].relatedValues.length > 0 ? themes[activeThemeIndex].relatedValues.map(value => ({value})) : [{value: ''}]}
                    columns={columns}
                    onChange={changeThemeRelatedValue}
                />
            </>}
        </div>
    )
}

export default React.memo(Themes)
