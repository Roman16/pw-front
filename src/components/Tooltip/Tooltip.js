import React from 'react'
import {Popover} from 'antd'
import {string} from 'prop-types'

import './Tooltips.less'
import {SVG} from "../../utils/icons"

const InformationTooltip = (props) => {
    const {title, description, position, type, className = ''} = props

    return (
        <div className={`${className} custom-tooltip information-tooltip`} onClick={e => e.stopPropagation()}>
            <Popover
                {...props}
                content={typeof description === 'object' ? description :
                    <span dangerouslySetInnerHTML={{__html: description}}/>}
                title={title || false}
                placement={position}
            >
                {type === 'info' && (
                    <span className="info-icon">
                        <SVG id='information'/>
                    </span>
                )}
                {type === 'warning' && (
                    <span className="warning-icon">
                        <SVG id='warningsmall'/>
                    </span>
                )}
                {type === 'custom' && (
                    React.cloneElement(props.children)
                )}
            </Popover>
        </div>
    )
}

//position variables
/*-------------------*/
/*
-topLeft
-top
-topRight
-leftTop
-left
-leftBottom
-rightTop
-right
-rightBottom
-bottomLeft
-bottom
-bottomRight
*/
/*-------------------*/

InformationTooltip.propTypes = {
    title: string,
    description: string,
    position: string,
    type: string
}

InformationTooltip.defaultProps = {
    type: 'info',
    title: '',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
        ' Aspernatur cumque deleniti eum illum nostrum, quibusdam saepe.',
    position: 'bottom'
}

export default InformationTooltip
