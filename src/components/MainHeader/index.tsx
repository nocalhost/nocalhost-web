import React, { useContext, useState, useEffect } from 'react';
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
    AvaterBox,
    VersionInfo,
    UpgradeBox,
} from './style-components';
import IconLogo from '../../images/logo.png';
import { UserContext } from '../../provider/appContext';
import { useTranslation } from 'react-i18next';
import { Popover, Modal } from 'antd';
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
import { ReactComponent as IconAbout } from '../../images/icon/icon_about.svg';
import { ReactComponent as IconUser } from '../../images/icon/icon_user.svg';
import { ReactComponent as IconTip } from '../../images/icon/icon_label_tips.svg';
import { ReactComponent as IconClose } from '../../images/icon/icon_close.svg';
import { ReactComponent as IconLink } from '../../images/icon/icon_external_link.svg';
import { ReactComponent as IconSetNormal } from '../../images/icon/icon_set_normal.svg';
import { ReactComponent as IconSetActive } from '../../images/icon/icon_set_elected.svg';

import ImageVersionInfo from '../../images/icon_logoWords.svg';
import AddCluster from '../../components/AddCluster';
import DevspaceForm from '../../pages/DevSpace/components/DevspaceForm';
import ChooseType from '../../pages/DevSpace/components/ChooseType';
import { queryAllUser, queryAllCluster } from '../../services';
import { useHistory } from 'react-router-dom';
import HTTP from '../../api/fetch';
import moment from 'moment';
const DIALOG_TYPE = {
    USER: 'user',
    APPLICATION: 'application',
    CLUSTERS: 'clusters',
    DEVSPACES: 'devspaces',
    MESH: 'mesh',
    ABOUT: 'about',
};

interface SelectMap {
    text: any;
    value: any;
    label?: any;
}

interface VersionInfoType {
    version: string;
    branch: string;
    commit_id: string;
}

function MainHeader() {
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState({});
    const [dialogType, setDialogType] = useState('');

    const { i18n, t } = useTranslation();
    const [userList, setUserList] = useState<SelectMap[]>([]);
    const [clusterList, setClusterList] = useState<SelectMap[]>([]);
    const [avaterPopVisible, setAvaterPopVisible] = useState(false);
    const [profilePopVisible, setProfilePopVisible] = useState(false);
    const [languageVisible, setLanguageVisible] = useState(false);
    const [versionInfo, setVersionInfo] = useState<VersionInfoType>();
    const [showUpgrade, setShowUpgrade] = useState<boolean>(false);
    const [upgradeInfo, setUpgradeInfo] = useState<{
        current_version: string;
        upgrade_version: string;
    }>();
    const history = useHistory();

    useEffect(() => {
        queryUpgradeInfo();
        queryVersionInfo();
    }, []);

    const queryVersionInfo = async () => {
        const response = await HTTP.get('version');
        const { data, code } = response;
        if (code === 0) {
            setVersionInfo(data);
        }
    };

    const queryUpgradeInfo = async () => {
        const response = await HTTP.get('nocalhost/version/upgrade_info');
        const { data, code } = response;
        if (code === 0) {
            setUpgradeInfo(data);
            const hiddenUpgradeDate = localStorage.getItem('showUpgrade');
            const isHide =
                hiddenUpgradeDate && hiddenUpgradeDate === moment(new Date()).format('YYYY-MM-DD');
            setShowUpgrade(data.has_new_version && !isHide);
        }
    };

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
        setProfilePopVisible(false);
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

    const onCreateDev = () => {
        setDialogType(DIALOG_TYPE.DEVSPACES);
    };

    const onCreateMesh = () => {
        setDialogType('');
        history.push('/dashboard/devspace/mesh-space');
    };

    const handleHiddenUpgrade = () => {
        localStorage.setItem('showUpgrade', moment(new Date()).format('YYYY-MM-DD'));
        setShowUpgrade(false);
    };

    return (
        <MainContent>
            <FlexBetween>
                <Flex>
                    <Logo src={IconLogo}></Logo>
                    <LogoName>Nocalhost Server Dashboard</LogoName>
                </Flex>
                <FlexHeader>
                    <Popover
                        trigger="click"
                        visible={avaterPopVisible}
                        onVisibleChange={(v) => setAvaterPopVisible(v)}
                        placement="bottomRight"
                        overlayClassName="addPop"
                        content={
                            <>
                                {!!user.is_admin && (
                                    <AvatarItem
                                        onClick={() => {
                                            setFormData({});
                                            setDialogType(DIALOG_TYPE.USER);
                                            setAvaterPopVisible(false);
                                        }}
                                    >
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
                                        setAvaterPopVisible(false);
                                    }}
                                >
                                    <Icon
                                        component={IconNormalApplications}
                                        style={{ fontSize: '20px' }}
                                    ></Icon>
                                    <Label>{t('resources.application.add')}</Label>
                                </AvatarItem>
                                {!!user.is_admin && (
                                    <AvatarItem
                                        onClick={() => {
                                            setDialogType(DIALOG_TYPE.CLUSTERS);
                                            setAvaterPopVisible(false);
                                        }}
                                    >
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
                                            setAvaterPopVisible(false);
                                            setDialogType(DIALOG_TYPE.MESH);
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
                            href={
                                i18n.language !== 'en'
                                    ? 'https://nocalhost.dev/zh-CN/docs/quick-start/'
                                    : 'https://nocalhost.dev/docs/quick-start/'
                            }
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
                        <div className="setting" onClick={() => history.push('/dashboard/setting')}>
                            <CommonIcon
                                title={t('settings.settingCenter')}
                                HoverIcon={IconSetActive}
                                NormalIcon={IconSetNormal}
                                placement="bottom"
                                style={{ fontSize: '24px' }}
                            ></CommonIcon>
                        </div>
                        <Popover
                            trigger="click"
                            placement="bottomRight"
                            overlayClassName="avatarPop"
                            visible={profilePopVisible}
                            onVisibleChange={(v) => setProfilePopVisible(v)}
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
                                            href={
                                                i18n.language !== 'en'
                                                    ? 'https://nocalhost.dev/zh-CN/'
                                                    : 'https://nocalhost.dev/'
                                            }
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
                                            visible={languageVisible}
                                            onVisibleChange={(v) => setLanguageVisible(v)}
                                            content={
                                                <div>
                                                    <TranItem
                                                        onClick={() => {
                                                            setProfilePopVisible(false);
                                                            setLanguageVisible(false);
                                                            i18n.changeLanguage('zh');
                                                        }}
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
                                                        onClick={() => {
                                                            setProfilePopVisible(false);
                                                            setLanguageVisible(false);
                                                            i18n.changeLanguage('en');
                                                        }}
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
                                                setProfilePopVisible(false);
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
                                        <AvatarItem
                                            onClick={() => {
                                                setProfilePopVisible(false);
                                                setDialogType(DIALOG_TYPE.ABOUT);
                                            }}
                                        >
                                            <Icon component={IconAbout} style={{ fontSize: 20 }} />
                                            <Label>{t('common.about')}</Label>
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
                            <AvaterBox>
                                <Icon
                                    component={IconUserAvater}
                                    style={{ fontSize: '32px' }}
                                ></Icon>
                            </AvaterBox>
                        </Popover>
                    </HeaderSection>
                </FlexHeader>
            </FlexBetween>
            {showUpgrade && (
                <UpgradeBox>
                    <div className="left">
                        <Icon component={IconTip} style={{ fontSize: 16 }} />
                        <span>
                            {t('common.message.upgrade', {
                                latest: upgradeInfo?.upgrade_version,
                                current: upgradeInfo?.current_version,
                            })}
                        </span>
                        <a href="" className="link">
                            {t('common.message.link')}
                        </a>
                    </div>
                    <Icon
                        onClick={handleHiddenUpgrade}
                        component={IconClose}
                        style={{ fontSize: 20, cursor: 'pointer' }}
                    />
                </UpgradeBox>
            )}
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
            {dialogType === DIALOG_TYPE.MESH && (
                <ChooseType
                    onCancel={() => setDialogType('')}
                    onCreateDev={onCreateDev}
                    onCreateMesh={onCreateMesh}
                />
            )}
            {dialogType === DIALOG_TYPE.DEVSPACES && (
                <Dialog
                    visible={dialogType === DIALOG_TYPE.DEVSPACES}
                    title={t('resources.devSpace.actions.createDev')}
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
            {dialogType === DIALOG_TYPE.ABOUT && (
                <Modal
                    width={320}
                    style={{ padding: 0, borderRadius: 4 }}
                    bodyStyle={{ padding: 0 }}
                    visible={dialogType === DIALOG_TYPE.ABOUT}
                    onCancel={() => setDialogType('')}
                    footer={null}
                >
                    <VersionInfo>
                        <img src={ImageVersionInfo} />
                        <div className="content">
                            <div className="content-item">
                                <span>{t('common.info.version')}</span>
                                <span>{versionInfo?.version}</span>
                            </div>
                            <div className="content-item">
                                <span>{t('common.info.branch')}</span>
                                <span>{versionInfo?.branch}</span>
                            </div>
                            <div className="content-item">
                                <span>{t('common.info.commitId')}</span>
                                <span>{versionInfo?.commit_id.slice(0, 7)}</span>
                            </div>
                        </div>
                        <div className="tip">
                            {showUpgrade && (
                                <div className="tip-version">
                                    {t('common.message.release', {
                                        version: upgradeInfo?.upgrade_version,
                                    })}
                                    <a href={t('document.helmUpgrade.url')} target="_blank">
                                        {t('common.message.link')}
                                        <Icon
                                            component={IconLink}
                                            style={{
                                                fontSize: 20,
                                                marginLeft: 2,
                                                position: 'relative',
                                                top: 3,
                                            }}
                                        />
                                    </a>
                                </div>
                            )}
                            <div className="tip-copyright">Copyright © 2021 Nocalhost</div>
                        </div>
                    </VersionInfo>
                </Modal>
            )}
        </MainContent>
    );
}

export default MainHeader;
