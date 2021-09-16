import React from 'react';
import { Item, Name, DeleteIcon } from '../CheckItem/style-components';
import { notUsersType } from '../const';
import Icon from '@ant-design/icons';
import { ReactComponent as IconUserAvater } from '../../../images/icon/profile_boy.svg';
import { ReactComponent as IconDelete } from '../../../images/icon/icon_btn_del.svg';
import CommonIcon from '../../../components/CommonIcon';
// import { useTranslation } from 'react-i18next';
interface CheckItemProps {
    name: string;
    id: number;
    selectData: Array<notUsersType>;
    setSelectData(selectData: Array<notUsersType> | []): void;
}

function CheckItem(props: CheckItemProps) {
    const { name, selectData, setSelectData, id } = props;
    // const { t } = useTranslation();
    const handleCheck = () => {
        setSelectData(selectData.filter((item) => item.id !== id));
    };
    return (
        <Item>
            <Icon component={IconUserAvater} style={{ fontSize: '24px' }}></Icon>
            <Name>{name}</Name>
            <DeleteIcon onClick={handleCheck}>
                <CommonIcon
                    NormalIcon={IconDelete}
                    // title={t('common.bt.remove')}
                    style={{ fontSize: '16px' }}
                ></CommonIcon>
            </DeleteIcon>
        </Item>
    );
}
export default CheckItem;
