import React from "react";
import notDataImage from '../../../assets/img/not-data-image.svg';

const MistakeTerminal = ({mistakeList}) => {
    console.log(mistakeList);
    return (
        <section className='mistake-terminal'>
            <div className="header-block">
                <h3>Mistakes Terminal</h3>
            </div>

            {mistakeList.length > 0 ?
                <div className='mistake-list'>
                    {mistakeList.map((item, index) => (
                        <div>
                            <span className='index'>{index + 1}</span>
                            <span className='description'>{item}</span>
                        </div>
                    ))}
                </div>
                :
                <div className="not-data">
                    <img src={notDataImage} alt=""/>
                </div>
            }


        </section>
    )
};

export default MistakeTerminal;