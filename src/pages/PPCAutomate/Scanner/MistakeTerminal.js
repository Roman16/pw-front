import React from "react";
import notDataImage from '../../../assets/img/not-data-image.svg';

const MistakeTerminal = ({mistakeList}) => {

    return (
        <section className='mistake-terminal'>
            <div className="header-block">
                <h3>Mistakes Terminal</h3>

                {/*{mistakeList.length > 0 &&*/}
                {/*<button className='btn default' disabled>*/}
                {/*    Fix It*/}
                {/*</button>}*/}

                {mistakeList.length > 0 && <div className="total-count">
                    Total Mistakes
                    <div>
                        {mistakeList.length}
                    </div>
                </div>
                }
            </div>

            {mistakeList.length > 0 ?
                <div className='mistake-list'>
                    {mistakeList.map((item) => (
                        <div key={item.id}>
                            <span className='index'>{item.number + 1}</span>
                            <span className='description' dangerouslySetInnerHTML={{__html: item.message}}/>
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