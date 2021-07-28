import React, { useState, FC } from 'react';
import SummaryCard from '../../components/SummaryCard';

const Clusters: FC<{}> = () => {
    const [dataList] = useState([]);
    return (
        <div>
            <SummaryCard title="clusters" />
            <h3>This is cluster page</h3>
            <ul>
                {dataList.map((item, index) => {
                    return <li key={index}>{item}</li>;
                })}
            </ul>
        </div>
    );
};

export default Clusters;
