import React from "react";
import {Popover} from 'antd';
import './Tooltips.less';

import {string} from 'prop-types';
import informationIcon from '../../assets/img/icons/information.svg';
import warningIcon from "../../assets/img/icons/warningSmall.svg";

const InformationTooltip = ({title, description, position, type}) => (
    <div className='custom-tooltip information-tooltip'>
        <Popover
            content={
                <span
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            }
            title={title || false}
            placement={position}
        >
            {type === 'info' && <img src={informationIcon} alt="" className='info-icon'/>}
            {type === 'warning' && <img src={warningIcon} alt="" className='warning-icon'/>}
        </Popover>
    </div>

);

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
};

InformationTooltip.defaultProps = {
    type: 'info',
    title: '',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
        ' Aspernatur cumque deleniti eum illum nostrum, quibusdam saepe.',
    position: 'bottom',

};

export default InformationTooltip;