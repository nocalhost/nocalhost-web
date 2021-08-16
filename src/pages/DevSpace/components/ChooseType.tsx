import React from 'react';
import { Modal } from 'antd';

import { useTranslation } from 'react-i18next';

const ChooseType = () => {
    const { t } = useTranslation;
    return (
        <Modal visible={true} width={'100%'}>
            <div>{t('resources.devSpace.tips.chooseType')}</div>
        </Modal>
    );
};

export default ChooseType;
