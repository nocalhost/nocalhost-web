import React from 'react';
import SummaryCard from '../../components/SummaryCard';
import EnvList from '../EnvList';
import { WrapList } from './style-components';
import { useTranslation } from 'react-i18next';

const DevSpace = () => {
    const { t } = useTranslation();
    return (
        <>
            <SummaryCard
                title={t('resources.space.name')}
                info={t('document.devspace.info')}
                linkText={t('document.devspace.more')}
                url={t('document.devspace.url')}
            />
            <WrapList>
                <EnvList />
            </WrapList>
        </>
    );
};

export default DevSpace;
