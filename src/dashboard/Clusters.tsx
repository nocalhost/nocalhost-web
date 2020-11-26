import React from 'react';
import { FC } from 'react';
import { useTranslate } from 'react-admin';
import clusters from '../cluster';
import CardWithIcon from './CardWithIcon';

interface Props {
    value?: number;
}

const Clusters: FC<Props> = ({ value }: any) => {
    const translate = useTranslate();
    return (
        <CardWithIcon
            to="/cluster"
            icon={clusters.icon}
            title={translate('resources.cluster.name', { smart_count: 2 })}
            subtitle={value}
        />
    );
};

export default Clusters;
