import React, {useState} from "react"
import {Input} from "antd"
import {SVG} from "../../../../utils/icons"
import CustomTable from "../../../../components/Table/CustomTable"

const Themes = ({themes = [], setThemes}) => {
    const [activeThemeIndex, setActiveThemeIndex] = useState(0)

    const add = () => {
        setThemes([...themes, {theme: '', value: '', relatedValues: []}])
    }

    const removeThemeHandler = (e, index) => {
        e.stopPropagation()

        if (index === activeThemeIndex) setActiveThemeIndex(0)
        setThemes([...themes.filter((item, i) => i !== index)])
    }

    const changeThemeRelatedValue = (index, value) => {
        setThemes(themes.map((theme, i) => {
            if (activeThemeIndex === i) {
                theme.relatedValues[index] = value
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

    const columns = [
        {
            title: '',
            dataIndex: 'index',
            key: 'index',
            width: '50px',
            render: (i, item, index) => index + 1
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            render: (url, item, index) => <Input
                value={url}
                onChange={({target: {value}}) => changeThemeRelatedValue(index, value)}
            />
        },
    ]

    return (
        <div className="themes">
            <h2>Themes</h2>
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
                <CustomTable
                    columns={columns}
                    dataSource={[...themes[activeThemeIndex].relatedValues, ''].map(value => ({value}))}
                />
            </>}
        </div>
    )
}

export default React.memo(Themes)
