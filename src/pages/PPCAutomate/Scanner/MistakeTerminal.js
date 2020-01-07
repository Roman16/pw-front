import React from "react";
import notDataImage from '../../../assets/img/not-data-image.svg';
import {history} from "../../../utils/history";
import {Pagination, Select} from "antd";

const pageSizeOptions = ['50', '100', '200'];
const Option = Select.Option;

const MistakeTerminal = ({mistakeList, totalSize, page, pageSize, onChangePagination}) => {

    return (
        <section className='mistake-terminal'>
            <div className="header-block">
                <h3>Mistakes Terminal</h3>

                {mistakeList.length > 0 &&
                <button className='btn default' onClick={() => {history.push('/ppc/optimization')}}>
                    Fix It
                </button>}

                {mistakeList.length > 0 && <div className="total-count">
                    Total Mistakes
                    <div>
                        {totalSize}
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

            <div className='pagination'>
                {totalSize > 50 && (
                    <Pagination
                        defaultCurrent={1}
                        pageSize={50}
                        current={page}
                        total={+totalSize}
                        onChange={(page) => onChangePagination({page})}
                    />
                )}

                {totalSize > 50 &&
                <Select onChange={(pageSize) => onChangePagination({pageSize})} value={pageSize}>
                    {pageSizeOptions.map(size => (
                        <Option value={size} key={size}>{size}</Option>
                    ))}
                </Select>
                }
            </div>

        </section>
    )
};

export default MistakeTerminal;