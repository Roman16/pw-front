import React from "react";
import {Link} from "react-router-dom";
import './OptimizationChanges.less';


const OptimizationChanges = ({countChanges}) => {

    return (
        <section className={'optimization-changes'}>
            <h3>Total Changes</h3>
            <div className="value">{countChanges}</div>
            <Link to={'/ppc/report'} className="btn default">
                View All Changes
            </Link>
        </section>
    )
};

export default OptimizationChanges;