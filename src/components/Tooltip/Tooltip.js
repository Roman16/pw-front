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
                        <InfoIcon/>
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

const InfoIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM8.66498 6.40759C8.2776 6.72854 8.00024 7.26122 8.00024 7.99756C8.00024 8.54985 7.55253 8.99756 7.00024 8.99756C6.44796 8.99756 6.00024 8.54985 6.00024 7.99756C6.00024 6.7339 6.49294 5.6099 7.38899 4.86751C8.28565 4.12461 9.49264 3.84095 10.7727 4.07367C12.3398 4.35858 13.4671 5.26409 13.858 6.5077C14.2456 7.74097 13.8286 9.06847 12.8066 9.99751C12.3745 10.3903 12.0113 10.6502 11.7185 10.8456C11.6059 10.9207 11.5194 10.977 11.4503 11.022L11.4501 11.0221L11.4499 11.0222L11.4499 11.0223C11.3155 11.1097 11.2476 11.154 11.1827 11.2099L11.1797 11.2125C11.1647 11.2254 11.1577 11.2315 11.153 11.2389C11.1489 11.2454 11.1466 11.253 11.1423 11.2672L11.1423 11.2672L11.1406 11.2725C11.1135 11.361 11.0805 11.5567 11.0805 11.9976C11.0805 12.5499 10.6327 12.9976 10.0805 12.9976C9.52817 12.9976 9.08046 12.5499 9.08046 11.9976C9.08046 11.5052 9.11163 11.0667 9.22882 10.6852C9.36182 10.2523 9.58852 9.9437 9.8766 9.69527C10.0516 9.5444 10.2816 9.39494 10.4678 9.27401L10.4678 9.274L10.4678 9.274L10.4678 9.27399C10.5186 9.24104 10.566 9.21022 10.6082 9.18205C10.8448 9.02411 11.1233 8.82482 11.4613 8.51758C11.9794 8.04663 12.0757 7.50746 11.95 7.10739C11.8275 6.71767 11.4147 6.22317 10.415 6.04142C9.64153 5.9008 9.05174 6.08715 8.66498 6.40759ZM10.0002 15.999C10.5525 15.999 11.0002 15.5513 11.0002 14.999C11.0002 14.4467 10.5525 13.999 10.0002 13.999C9.44796 13.999 9.00024 14.4467 9.00024 14.999C9.00024 15.5513 9.44796 15.999 10.0002 15.999Z"/>
</svg>


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
