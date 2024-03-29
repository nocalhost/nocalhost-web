import React from 'react';
import { Item, Name, CheckBox, CheckBoxInner } from './style-components';
import { notUsersType } from '../const';
import Icon from '@ant-design/icons';
import { ReactComponent as IconUserAvater } from '../../../images/icon/profile_boy.svg';
interface CheckItemProps {
    name: string;
    id: number;
    selectData: Array<notUsersType>;
    setSelectData(selectData: Array<notUsersType> | []): void;
}

function CheckItem(props: CheckItemProps) {
    const { name, selectData, setSelectData, id } = props;
    const isChecked = !!selectData.find((item) => item.id === id);
    const handleCheck = () => {
        if (isChecked) {
            setSelectData(selectData.filter((item) => item.id !== id));
        } else {
            setSelectData(selectData.concat({ name, id }));
        }
    };
    return (
        <Item onClick={handleCheck}>
            <CheckBox checked={isChecked}>
                <CheckBoxInner checked={isChecked}></CheckBoxInner>
            </CheckBox>
            <Icon component={IconUserAvater} style={{ fontSize: '24px' }}></Icon>
            <Name>{name}</Name>
        </Item>
    );
}
export default CheckItem;
