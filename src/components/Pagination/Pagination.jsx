import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Pagination as AntPagination } from 'antd';

import './Pagination.less';


class Pagination extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        const {
            className, onChange, total, defaultPageSize = 10,
        } = this.props;


        return (
            <div className={`Pagination ${className}`}>
                <AntPagination
                    total={total}
                    onChange={onChange}
                    defaultCurrent={1}
                    defaultPageSize={defaultPageSize}
                    showLessItems
                />
            </div>
        );
    }
}

Pagination.propTypes = {
    onChange: PropTypes.func,
};

Pagination.defaultProps = {
    onChange: () => {
    },
};

export default Pagination;
