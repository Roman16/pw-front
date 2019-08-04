import React, { Component } from 'react';
import { Pagination as AntPagination } from 'antd';

import './Pagination.less';

class Pagination extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <div className="Pagination">
                <AntPagination defaultCurrent={1} total={500} showLessItems  />
            </div>
        );
    }
}

Pagination.propTypes = {};

Pagination.defaultProps = {};

export default Pagination;
