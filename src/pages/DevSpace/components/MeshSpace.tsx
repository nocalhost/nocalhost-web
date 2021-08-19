import React from 'react';

import BreadCard from '../../../components/BreadCard';
import { useTranslation } from 'react-i18next';

const MeshSpace = () => {
    const { t } = useTranslation();
    return (
        <>
            <BreadCard
                data={{
                    menu: t('resources.devSpace.name'),
                    subMenu: t('resources.devSpace.meshSpace'),
                    route: '/dashboard/devspace',
                }}
            />
            <div></div>
        </>
    );
};

export default MeshSpace;
