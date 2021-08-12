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
import { ReactComponent as IconNormalCluster } from '../../images/icon/icon_normal_clusters.svg';
import { ReactComponent as IconNormalDevspace } from '../../images/icon/icon_normal_devspace.svg';
import { ReactComponent as IconUser } from '../../images/icon/icon_user.svg';
import AddCluster from '../../components/AddCluster';
import DevspaceForm from '../../pages/DevSpace/components/DevspaceForm';
import { queryAllUser, queryAllCluster } from '../../services';
const DIALOG_TYPE = {
    USER: 'user',
    APPLICATION: 'application',
    CLUSTERS: 'clusters',
    DEVSPACES: 'devspaces',
};

interface SelectMap {
    text: any;
    value: any;
    label?: any;
}

function MainHeader() {
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState({});
    const [dialogType, setDialogType] = useState('');
    const { i18n, t } = useTranslation();
    const [userList, setUserList] = useState<SelectMap[]>([]);
    const [clusterList, setClusterList] = useState<SelectMap[]>([]);
    // console.log(i18n);
    const handleOkUserForm = () => {
        setDialogType('');
    };
    const handleOkApplicationForm = () => {
        setDialogType('');
    };
    const handleOkClusterForm = () => {
        setDialogType('');
    };
    const signOut = () => {
        location.replace('/login');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('permissions');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('refreshToken');
    };
    const handleOkDevSpaveForm = () => {
        setDialogType('');
    };
    async function query() {
        if (userList.length === 0) {
            const nameMap = await queryAllUser();
            setUserList(
                Array.from(nameMap).map((item) => {
                    return {
                        value: item[0],
                        text: item[1],
                        label: item[1],
                    };
                })
            );
        }
        if (clusterList.length === 0) {
            const clusterMap = await queryAllCluster();
            setClusterList(
                Array.from(clusterMap).map((item) => {
                    return {
                        value: item[0],
                        text: item[1],
                        label: item[1],
                    };
                })
            );
        }
    }
    return (
        <MainContent>
            <FlexBetween>
                <Flex>
                    <Logo src={IconLogo}></Logo>
                    <LogoName>Nocalhost Service Dashboard</LogoName>
                </Flex>
                <FlexHeader>
                    <Popover
                        trigger="click"
                        placement="bottomRight"
                        overlayClassName="addPop"
                        content={
                            <>
                                {!!user.is_admin && (
                                    <AvatarItem onClick={() => setDialogType(DIALOG_TYPE.USER)}>
                                        <Icon
                                            component={IconNormalUser}
                                            style={{ fontSize: '20px' }}
                                        ></Icon>
                                        <Label>{t('resources.users.bt.add')}</Label>
                                    </AvatarItem>
                                )}

                                <AvatarItem
                                    onClick={() => {
                                        setDialogType(DIALOG_TYPE.APPLICATION);
                                        setFormData({});
                                    }}
                                >
                                    <Icon
                                        component={IconNormalApplications}
                                        style={{ fontSize: '20px' }}
                                    ></Icon>
                                    <Label>{t('resources.application.add')}</Label>
                                </AvatarItem>
                                {!!user.is_admin && (
                                    <AvatarItem onClick={() => setDialogType(DIALOG_TYPE.CLUSTERS)}>
                                        <Icon
                                            component={IconNormalCluster}
                                            style={{ fontSize: '20px' }}
                                        ></Icon>
                                        <Label>{t('resources.cluster.add')}</Label>
                                    </AvatarItem>
                                )}
                                {!!user.is_admin && (
                                    <AvatarItem
                                        onClick={() => {
                                            query();
                                            setDialogType(DIALOG_TYPE.DEVSPACES);
                                        }}
                                    >
                                        <Icon
                                            component={IconNormalDevspace}
                                            style={{ fontSize: '20px' }}
                                        ></Icon>
                                        <Label>{t('resources.space.actions.create')}</Label>
                                    </AvatarItem>
                                )}
                            </>
                        }
                    >
                        <Tran>
                            <Icon component={IconBtnAdd} style={{ fontSize: '28px' }}></Icon>
                        </Tran>
                    </Popover>

                    <HeaderSection>
                        <a
                            href="https://nocalhost.dev/eng/getting-started/"
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
                                        <a
                                            href="https://nocalhost.dev/"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
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
                                        </a>

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
                                        <AvatarItem
                                            onClick={() => {
                                                setDialogType(DIALOG_TYPE.USER);
                                                setFormData({
                                                    status: user?.status,
                                                    is_admin: user?.is_admin,
                                                    name: user?.name,
                                                    email: user?.email,
                                                    id: user?.id,
                                                    isDetail: true,
                                                });
                                            }}
                                        >
                                            <Icon
                                                component={IconUser}
                                                style={{ fontSize: '20px' }}
                                            ></Icon>
                                            <Label>{t('resources.profile.name')}</Label>
                                        </AvatarItem>
                                    </Section>

                                    <AvatarItem onClick={signOut}>
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
                    title={
                        Object.prototype.hasOwnProperty.call(formData || {}, 'id')
                            ? t('resources.profile.name')
                            : t('resources.users.bt.add')
                    }
                    width={680}
                    onCancel={() => setDialogType('')}
                >
                    <CreateUserForm
                        onCancel={() => setDialogType('')}
                        onOk={handleOkUserForm}
                        formData={formData}
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
            {dialogType === DIALOG_TYPE.CLUSTERS && (
                <AddCluster onCancel={() => setDialogType('')} onSubmit={handleOkClusterForm} />
            )}
            {dialogType === DIALOG_TYPE.DEVSPACES && (
                <Dialog
                    visible={dialogType === DIALOG_TYPE.DEVSPACES}
                    title={t('resources.space.actions.createDev')}
                    width={680}
                    onCancel={() => setDialogType('')}
                >
                    <DevspaceForm
                        userList={userList}
                        clusterList={clusterList}
                        onSubmit={handleOkDevSpaveForm}
                        onCancel={() => setDialogType('')}
                    />
                </Dialog>
            )}
        </MainContent>
    );
}

export default MainHeader;
