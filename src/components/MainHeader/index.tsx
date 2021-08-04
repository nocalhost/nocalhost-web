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
    Name,
    Email,
    Label,
    IconRight,
    FlexHeader,
    HeaderSection,
    Tran,
} from './style-components';
import IconLogo from '../../images/logo.png';
import { UserContext } from '../../provider/appContext';
import { useTranslation } from 'react-i18next';
import { Popover } from 'antd';
import './reset.css';
import Dialog from '../Dialog';
import Icon from '@ant-design/icons';
import CreateUserForm from '../../pages/User/CreateUserForm';
import CreateApplicationForm from '../../pages/Application/CreateApplicationForm';
import CommonIcon from '../CommonIcon';
import { ReactComponent as IconUserAvater } from '../../images/icon/profile_boy.svg';
import { ReactComponent as IconBtnAdd } from '../../images/icon/icon_btn_add.svg';
import { ReactComponent as IconNocalhost } from '../../images/icon/icon_logo_nocalhost.svg';
import { ReactComponent as IconLanguage } from '../../images/icon/icon_language_switch.svg';
import { ReactComponent as IconArrow } from '../../images/icon/icon_arrow_enter.svg';
import { ReactComponent as IconEn } from '../../images/icon/icon_en.svg';
import { ReactComponent as IconCn } from '../../images/icon/icon_cn.svg';
import { ReactComponent as IconLogOut } from '../../images/icon/icon_exit.svg';
import { ReactComponent as IconNhLink } from '../../images/icon/icon_external_link.svg';
import { ReactComponent as IconChoice } from '../../images/icon/icon_state_choice.svg';
import { ReactComponent as IconColorDoc } from '../../images/icon/icon_btn_elected_docs.svg';
import { ReactComponent as IconDoc } from '../../images/icon/icon_btn_normal_docs.svg';
import { ReactComponent as IconNormalUser } from '../../images/icon/icon_normal_users.svg';
import { ReactComponent as IconNormalApplications } from '../../images/icon/icon_normal_applications.svg';
const DIALOG_TYPE = {
    USER: 'user',
    APPLICATION: 'application',
};

function MainHeader() {
    const { user } = useContext(UserContext);
    const [dialogType, setDialogType] = useState('');
    const { i18n, t } = useTranslation();
    console.log(i18n);
    const handleOkUserForm = () => {
        setDialogType('');
    };
    const handleOkApplicationForm = () => {
        setDialogType('');
    };
    return (
        <MainContent>
            <FlexBetween>
                <Flex>
                    <Logo src={IconLogo}></Logo>
                    <LogoName>Nocalhost管理中心</LogoName>
                </Flex>
                <FlexHeader>
                    <Popover
                        trigger="click"
                        placement="bottomRight"
                        overlayClassName="addPop"
                        content={
                            <>
                                <AvatarItem onClick={() => setDialogType(DIALOG_TYPE.USER)}>
                                    <Icon
                                        component={IconNormalUser}
                                        style={{ fontSize: '20px' }}
                                    ></Icon>
                                    <Label>{t('resources.users.bt.add')}</Label>
                                </AvatarItem>
                                <AvatarItem onClick={() => setDialogType(DIALOG_TYPE.APPLICATION)}>
                                    <Icon
                                        component={IconNormalApplications}
                                        style={{ fontSize: '20px' }}
                                    ></Icon>
                                    <Label>{t('resources.application.add')}</Label>
                                </AvatarItem>
                            </>
                        }
                    >
                        <Tran>
                            <Icon component={IconBtnAdd} style={{ fontSize: '28px' }}></Icon>
                        </Tran>
                    </Popover>
                    <HeaderSection>
                        <a
                            href="https://nocalhost.dev/getting-started/"
                            target="_blank"
                            rel="noreferrer"
                            style={{ marginRight: '20px' }}
                        >
                            <CommonIcon
                                title={t('nh.layout.menu.document')}
                                HoverIcon={IconColorDoc}
                                NormalIcon={IconDoc}
                                placement="bottom"
                                style={{ fontSize: '24px' }}
                            ></CommonIcon>
                        </a>
                        <Popover
                            trigger="click"
                            placement="bottomRight"
                            overlayClassName="avatarPop"
                            content={
                                <AvatarPop>
                                    <Info>
                                        <Icon
                                            component={IconUserAvater}
                                            style={{ fontSize: '48px' }}
                                        ></Icon>
                                        <Name>{user.name}</Name>
                                        <Email>{user.email}</Email>
                                    </Info>
                                    <Section>
                                        <AvatarItem>
                                            <Icon
                                                component={IconNocalhost}
                                                style={{ fontSize: '20px' }}
                                            ></Icon>
                                            <Label>NocalLost</Label>

                                            <IconRight>
                                                <Icon
                                                    component={IconNhLink}
                                                    style={{ fontSize: '20px' }}
                                                ></Icon>
                                            </IconRight>
                                        </AvatarItem>
                                        <Popover
                                            placement="leftTop"
                                            overlayClassName="tranPop"
                                            content={
                                                <div>
                                                    <TranItem
                                                        onClick={() => i18n.changeLanguage('zh')}
                                                    >
                                                        <Icon
                                                            component={IconCn}
                                                            style={{ fontSize: '20px' }}
                                                        ></Icon>
                                                        <Label>简体中文</Label>
                                                        {i18n.language !== 'en' && (
                                                            <IconRight>
                                                                <Icon
                                                                    component={IconChoice}
                                                                    style={{ fontSize: '20px' }}
                                                                ></Icon>
                                                            </IconRight>
                                                        )}
                                                    </TranItem>
                                                    <TranItem
                                                        onClick={() => i18n.changeLanguage('en')}
                                                    >
                                                        <Icon
                                                            component={IconEn}
                                                            style={{ fontSize: '20px' }}
                                                        ></Icon>
                                                        <Label>English</Label>
                                                        {i18n.language === 'en' && (
                                                            <IconRight>
                                                                <Icon
                                                                    component={IconChoice}
                                                                    style={{ fontSize: '20px' }}
                                                                ></Icon>
                                                            </IconRight>
                                                        )}
                                                    </TranItem>
                                                </div>
                                            }
                                        >
                                            <AvatarItem>
                                                <Icon
                                                    component={IconLanguage}
                                                    style={{ fontSize: '20px' }}
                                                ></Icon>
                                                <Label>{t('common.info.language')}</Label>
                                                <IconRight>
                                                    <Icon
                                                        component={IconArrow}
                                                        style={{ fontSize: '20px' }}
                                                    ></Icon>
                                                </IconRight>
                                            </AvatarItem>
                                        </Popover>
                                    </Section>
                                    <AvatarItem>
                                        <Icon
                                            component={IconLogOut}
                                            style={{ fontSize: '20px' }}
                                        ></Icon>
                                        <Label>{t('common.info.logout')}</Label>
                                    </AvatarItem>
                                </AvatarPop>
                            }
                        >
                            <Icon component={IconUserAvater} style={{ fontSize: '32px' }}></Icon>
                        </Popover>
                    </HeaderSection>
                </FlexHeader>
            </FlexBetween>
            {dialogType === DIALOG_TYPE.USER && (
                <Dialog
                    visible={dialogType === DIALOG_TYPE.USER}
                    title={t('resources.users.bt.add')}
                    width={680}
                    onCancel={() => setDialogType('')}
                >
                    <CreateUserForm
                        onCancel={() => setDialogType('')}
                        onOk={handleOkUserForm}
                    ></CreateUserForm>
                </Dialog>
            )}
            {dialogType === DIALOG_TYPE.APPLICATION && (
                <Dialog
                    visible={dialogType === DIALOG_TYPE.APPLICATION}
                    title={t('resources.application.add')}
                    width={680}
                    onCancel={() => setDialogType('')}
                >
                    <CreateApplicationForm
                        onOk={handleOkApplicationForm}
                        onCancel={() => setDialogType('')}
                    ></CreateApplicationForm>
                </Dialog>
            )}
        </MainContent>
    );
}

export default MainHeader;
