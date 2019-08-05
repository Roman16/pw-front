import React, { Component } from 'react';
import { Pagination as AntPagination } from 'antd';

import './Pagination.less';

function itemRender(current, type, originalElement) {
    console.log('-------');
    console.log(current);
    console.log(type);
    console.log(originalElement);
    console.log('-------');

    if (type === 'jump-next') return null;
    if (type === 'jump-prev') return null;


    return originalElement;
}

class Pagination extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }


    render() {
        return (
            <div className="Pagination">
                <AntPagination defaultCurrent={1} total={500} showLessItems itemRender={itemRender} />
            </div>
        );
    }
}

Pagination.propTypes = {};

Pagination.defaultProps = {};

export default Pagination;
