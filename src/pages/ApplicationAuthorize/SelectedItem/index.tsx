import React from 'react';
import { Item, Name, Icon, DeleteIcon } from '../CheckItem/style-components';
import { notUsersType } from '../const';

interface CheckItemProps {
    name: string;
    id: number;
    selectData: Array<notUsersType>;
    setSelectData(selectData: Array<notUsersType> | []): void;
}

function CheckItem(props: CheckItemProps) {
    const { name, selectData, setSelectData, id } = props;
    const handleCheck = () => {
        setSelectData(selectData.filter((item) => item.id !== id));
    };
    return (
        <Item onClick={handleCheck}>
            <Icon></Icon>
            <Name>{name}</Name>
            <DeleteIcon onClick={handleCheck}>删</DeleteIcon>
        </Item>
    );
}
export default CheckItem;
