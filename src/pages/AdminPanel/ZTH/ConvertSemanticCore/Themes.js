import React, {useState} from "react"
import {Tabs} from "antd"

const {TabPane} = Tabs

let newTabIndex = 0
const Themes = () => {
    const [tabs, setTabs] = useState([
            {
                title: 'Tab 1',
                content: 'Content of Tab 1',
                key: 0,
                closable: false,
            },
        ]),
        [activeKey, setActiveKey] = useState('0')

    const onEdit = (targetKey, action) => {
        if (action === 'remove') {
            remove(targetKey)
        }
    }

    const add = () => {
        newTabIndex++
        setTabs([...tabs, {title: 'New Tab', content: 'Content of new Tab', key: `${newTabIndex}`}])
    }

    const remove = targetKey => {
        setActiveKey('0')
        setTabs(tabs.filter((item) => item.key !== targetKey))
    }

    return (
        <div className="themes">
            <h2>Themes</h2>
            <button className={'btn default'} onClick={add}>Add new theme</button>
            <br/>

            <Tabs
                type="editable-card"
                onChange={(key) => setActiveKey(key)}
                onEdit={onEdit}
                activeKey={`${activeKey}`}
                hideAdd
            >
                {tabs.map(pane => (
                    <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                        {pane.content}
                    </TabPane>
                ))}
            </Tabs>

        </div>
    )
}

export default Themes
