import React, {Fragment} from "react";
import notDataImage from '../../../assets/img/not-data-image.svg';
import {history} from "../../../utils/history";
import {Pagination, Select} from "antd";
import CustomSelect from "../../../components/Select/Select";

const pageSizeOptions = ['50', '100', '200'];
const Option = Select.Option;

const MistakeTerminal = ({mistakeList, totalSize, page, pageSize, onChangePagination}) => {

    return (
        <section className='mistake-terminal'>
            <div className="header-block">
                <h3>Mistakes Terminal</h3>

                <div className="actions">
                    {mistakeList.length > 0 &&
                    <button className='btn default' onClick={() => {
                        history.push('/ppc/automation')
                    }}>
                        Fix It
                    </button>}

                    {mistakeList.length > 0 && <div className="total-count">
                        Total Mistakes
                        <div>
                            {totalSize}
                        </div>
                    </div>}
                </div>
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
                <div className='not-data'>
                    <img src={notDataImage} alt=""/>
                    <p>No data to show</p>
                </div>
            }

            <div className='pagination'>
                {totalSize > 50 && (
                    <Fragment>
                        <div className="desk">
                            <Pagination
                                defaultCurrent={1}
                                pageSize={pageSize}
                                showLessItems={false}
                                current={page}
                                total={+totalSize}
                                responsive={true}
                                onChange={(page) => onChangePagination({page})}
                            />
                        </div>

                        <div className="mob">
                            <Pagination
                                defaultCurrent={1}
                                pageSize={pageSize}
                                showLessItems={true}
                                current={page}
                                total={+totalSize}
                                responsive={true}
                                onChange={(page) => onChangePagination({page})}
                            />
                        </div>
                    </Fragment>
                )}

                {totalSize > 50 &&
                <CustomSelect onChange={(pageSize) => onChangePagination({pageSize})} value={pageSize}>
                    {pageSizeOptions.map(size => (
                        <Option value={size} key={size}>{size}</Option>
                    ))}
                </CustomSelect>
                }
            </div>

        </section>
    )
};

export default MistakeTerminal;