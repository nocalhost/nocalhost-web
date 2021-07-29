import React, { useContext, useState } from 'react';
import {
    Logo,
    MainContent,
    LogoName,
    Flex,
    FlexBetween,
    AvatarPop,
    AvatarItem,
    TranItem,
    Section,
    Info,
    AvatarBox,
    Name,
    Email,
    AddIcon,
} from './style-components';
import Icon from '../../images/logo.png';
import { UserContext } from '../../provider/appContext';
import { useTranslation } from 'react-i18next';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Popover } from 'antd';
import './reset.css';
import Dialog from '../Dialog';
import CreateUserForm from '../../pages/User/CreateUserForm';
import CreateApplicationForm from '../../pages/Application/CreateApplicationForm';

const DIALOG_TYPE = {
    USER: 'user',
    APPLICATION: 'application',
};

function MainHeader() {
    const { user } = useContext(UserContext);
    const [dialogType, setDialogType] = useState('');
    const { i18n } = useTranslation();
    return (
        <MainContent>
            <FlexBetween>
                <Flex>
                    <Logo src={Icon}></Logo>
                    <LogoName>Nocalhost管理中心</LogoName>
                </Flex>
                <Flex>
                    <Popover
                        trigger="click"
                        placement="bottomRight"
                        overlayClassName="addPop"
                        content={
                            <>
                                <AvatarItem onClick={() => setDialogType(DIALOG_TYPE.USER)}>
                                    添加用户
                                </AvatarItem>
                                <AvatarItem onClick={() => setDialogType(DIALOG_TYPE.APPLICATION)}>
                                    添加应用
                                </AvatarItem>
                            </>
                        }
                    >
                        <AddIcon></AddIcon>
                    </Popover>
                    <Popover
                        trigger="click"
                        placement="bottomRight"
                        overlayClassName="avatarPop"
                        content={
                            <AvatarPop>
                                <Info>
                                    <AvatarBox></AvatarBox>
                                    <Name>{user.name}</Name>
                                    <Email>{user.email}</Email>
                                </Info>
                                <Section>
                                    <AvatarItem>NocalLost</AvatarItem>
                                    <Popover
                                        placement="leftTop"
                                        overlayClassName="tranPop"
                                        content={
                                            <div>
                                                <TranItem onClick={() => i18n.changeLanguage('zh')}>
                                                    简体中文
                                                </TranItem>
                                                <TranItem onClick={() => i18n.changeLanguage('en')}>
                                                    English
                                                </TranItem>
                                            </div>
                                        }
                                    >
                                        <AvatarItem>语言</AvatarItem>
                                    </Popover>
                                </Section>
                                <AvatarItem>退出登录</AvatarItem>
                            </AvatarPop>
                        }
                    >
                        <Avatar size={32} icon={<UserOutlined />}></Avatar>
                    </Popover>
                </Flex>
            </FlexBetween>
            <Dialog
                visible={dialogType === DIALOG_TYPE.USER}
                title="添加用户"
                width={680}
                onCancel={() => setDialogType('')}
            >
                <CreateUserForm onCancel={() => setDialogType('')}></CreateUserForm>
            </Dialog>
            <Dialog
                visible={dialogType === DIALOG_TYPE.APPLICATION}
                title="添加应用"
                width={680}
                onCancel={() => setDialogType('')}
            >
                <CreateApplicationForm onCancel={() => setDialogType('')}></CreateApplicationForm>
            </Dialog>
        </MainContent>
    );
}

export default MainHeader;
