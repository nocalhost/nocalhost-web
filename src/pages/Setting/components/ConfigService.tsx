import React, { useEffect, useState } from 'react';

import { ConfigServiceWrap } from '../styled-component';
import { useTranslation } from 'react-i18next';
import { Form, Input, Button, Checkbox } from 'antd';
import { ConfigInfo } from '../../../types';
import LabelWithHelp from '../../../components/LabelWithHelp';
import { ReactComponent as IconArrowDown } from '../../../images/icon/icon_arrow_down.svg';
import { ReactComponent as IconArrowRight } from '../../../images/icon/icon_arrow_right.svg';

import HTTP from '../../../api/fetch';

interface IProp {
    configData: ConfigInfo | null;
    onClose: () => void;
    handleSyncData: () => void;
    closeAndSync: () => void;
}

interface SearchData {
    bind_dn: string;
    email: string;
    user_name: string;
}

const ConfigService = ({ configData, onClose, handleSyncData, closeAndSync }: IProp) => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState<number>(configData?.enable ? 2 : 1);
    const [folded, setFolded] = useState<boolean>(true);
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // eslint-disable-next-line no-undef
    const [step1Info, setStep1Info] = useState<Partial<ConfigInfo> | null>(configData);
    const [searchData, setSearchData] = useState<SearchData | null>(null);
    const [advancedSearchData, setAdvancedSearchData] = useState<SearchData | null>(null);

    useEffect(() => {
        if (configData) {
            const security = [];
            if (configData.tls) {
                security.push('tls');
            }
            if (configData?.md5) {
                security.push('md5');
            }
            form.setFieldsValue({
                server: configData?.server,
                bind_dn: configData?.bind_dn,
                password: configData?.password,
                security,
                base_dn: configData?.base_dn,
                filter: configData?.filter,
                email_attr: configData?.email_attr,
                user_name_attr: configData?.user_name_attr,
                admin_base_dn: configData?.admin_base_dn,
                admin_filter: configData?.admin_filter,
            });
            validateSearch();
            advanceSearch();
        }
    }, []);

    const handleNextStep = async () => {
        form.validateFields().then(async () => {
            const { bind_dn, password, server, security } = form.getFieldsValue();
            setIsLoading(true);
            setStep1Info({
                ...configData,
                bind_dn,
                password,
                server,
                tls: security.indexOf('tls') > -1 ? 1 : 0,
                md5: security.indexOf('md5') ? 1 : 0,
            });
            const response = await HTTP.put('ldap/bind', {
                bind_dn,
                password,
                server,
            });
            setIsLoading(false);
            if (response.code === 0) {
                setCurrentStep(2);
            }
        });
    };

    const validateSearch = async () => {
        const {
            email_attr,
            user_name_attr,
            base_dn,
            filter,
            admin_base_dn,
            admin_filter,
        } = form.getFieldsValue();
        if (email_attr && base_dn) {
            const resp = await HTTP.put('ldap/search', {
                ...step1Info,
                email_attr,
                user_name_attr,
                base_dn,
                filter,
                admin_base_dn,
                admin_filter,
            });
            if (resp.code === 0) {
                setSearchData(resp.data);
            }
            return resp;
        }
    };

    const advanceSearch = async () => {
        const {
            email_attr,
            user_name_attr,
            base_dn,
            filter,
            admin_base_dn,
            admin_filter,
        } = form.getFieldsValue();
        if (email_attr && admin_base_dn) {
            const resp = await HTTP.put('ldap/search', {
                ...step1Info,
                email_attr,
                user_name_attr,
                base_dn,
                filter,
                admin_base_dn,
                admin_filter,
            });
            if (resp.code === 0) {
                setAdvancedSearchData(resp.data);
            }
            return resp;
        }
    };

    const saveConfig = async () => {
        const {
            email_attr,
            user_name_attr,
            base_dn,
            filter,
            admin_base_dn,
            admin_filter,
        } = form.getFieldsValue();
        return await HTTP.put('ldap/config/set', {
            ...step1Info,
            email_attr,
            user_name_attr,
            base_dn,
            filter,
            admin_base_dn,
            admin_filter,
        });
    };

    const handleSubmit = async () => {
        form.validateFields().then(async () => {
            setIsLoading(true);
            const saveInfo = await saveConfig();
            if (saveInfo.code === 0) {
                await handleSyncData();
                setIsLoading(false);
                closeAndSync();
            } else {
                setIsLoading(false);
            }
        });
    };

    return (
        <ConfigServiceWrap step={currentStep}>
            <div className="desc">{t('settings.configDesc')}</div>
            <div className="progress">
                <div className="step">
                    <div className={currentStep === 1 ? 'icon active' : 'icon'}>1</div>
                    <div className="content">
                        <div className="title">{t('settings.serverConfig')}</div>
                        <div className="desc">{t('settings.serverConfigTip')}</div>
                    </div>
                </div>
                <div className="step">
                    <div className={currentStep === 2 ? 'icon active' : 'icon'}>2</div>
                    <div className="content">
                        <div className="title">{t('settings.ruleConfig')}</div>
                        <div className="desc">{t('settings.ruleConfigTip')}</div>
                    </div>
                </div>
            </div>
            <div className="form-wrap">
                <Form
                    labelCol={{
                        span: 6,
                        offset: 0,
                    }}
                    labelAlign="left"
                    form={form}
                >
                    {currentStep === 1 && (
                        <>
                            <Form.Item
                                label={t('settings.serverAddr')}
                                name="server"
                                required={true}
                                rules={[{ required: true }]}
                            >
                                <Input placeholder={t('settings.serverAddrPh')} />
                            </Form.Item>
                            <Form.Item
                                label={t('settings.adminAccount')}
                                name="bind_dn"
                                rules={[{ required: true }]}
                                required={true}
                            >
                                <Input placeholder={t('settings.adminAccountPh')} />
                            </Form.Item>
                            <Form.Item
                                label={t('settings.adminPwd')}
                                name="password"
                                rules={[{ required: true }]}
                                required={true}
                            >
                                <Input type="password" placeholder={t('settings.adminPwd')} />
                            </Form.Item>
                            <Form.Item
                                label={t('settings.securitySet')}
                                name="security"
                                style={{ marginBottom: 0, display: 'flex', alignItems: 'center' }}
                            >
                                <Checkbox.Group>
                                    <Checkbox value="tls">Enable TLS</Checkbox>
                                    <Checkbox value="md5">Enable Digest MD5 Bind</Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                        </>
                    )}

                    {currentStep === 2 && (
                        <>
                            <Form.Item
                                label={
                                    <LabelWithHelp
                                        label={t('settings.emailAttr')}
                                        tip={t('settings.emailAttrTip')}
                                    />
                                }
                                name="email_attr"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                required={true}
                            >
                                <Input
                                    onBlur={validateSearch}
                                    placeholder={t('settings.emailAttrPh')}
                                />
                            </Form.Item>
                            <Form.Item
                                colon={false}
                                label={
                                    <LabelWithHelp
                                        label={t('settings.usernameAttr')}
                                        tip={t('settings.usernameAttrTip')}
                                    />
                                }
                                name="user_name_attr"
                            >
                                <Input
                                    onBlur={validateSearch}
                                    placeholder={t('settings.usernameAttrPh')}
                                />
                            </Form.Item>

                            <div className="member-rule">
                                <div className="rule-label">{t('settings.memberRule')}</div>
                                <Form.Item
                                    colon={false}
                                    label={t('settings.baseDn')}
                                    name="base_dn"
                                    required={true}
                                    rules={[{ required: true }]}
                                >
                                    <Input
                                        onBlur={validateSearch}
                                        placeholder={t('settings.baseDnPh')}
                                    />
                                </Form.Item>
                                <Form.Item
                                    colon={false}
                                    label={t('settings.selector')}
                                    name="filter"
                                >
                                    <Input placeholder={t('settings.filterTip')} />
                                </Form.Item>
                                <div className="rule-tip">
                                    <div>{`Example: ${t('settings.exampleTip')}`}</div>
                                    <div>DN: {searchData?.bind_dn ?? '--'}</div>
                                    <div>Email: {searchData?.email ?? '--'}</div>
                                    <div>Username: {searchData?.user_name ?? '--'}</div>
                                </div>
                            </div>

                            <div className="advance-setting">
                                <div
                                    className="advance-label"
                                    onClick={() => setFolded((curr) => !curr)}
                                >
                                    {folded ? <IconArrowRight /> : <IconArrowDown />}
                                    <LabelWithHelp
                                        label={t('settings.advanceSetting')}
                                        tip={t('settings.advanceSettingTip')}
                                    />
                                </div>
                                {!folded && (
                                    <div className="member-rule">
                                        <div className="rule-label">{t('settings.adminRule')}</div>
                                        <Form.Item
                                            label={t('settings.baseDn')}
                                            name="admin_base_dn"
                                            colon={false}
                                        >
                                            <Input
                                                onBlur={advanceSearch}
                                                placeholder={t('settings.baseDnPh')}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label={t('settings.selector')}
                                            name="admin_filter"
                                            colon={false}
                                        >
                                            <Input placeholder={t('settings.filterTip')} />
                                        </Form.Item>
                                        <div className="rule-tip">
                                            <div>{`Example: ${t('settings.exampleTip')}`}</div>
                                            <div>DN: {advancedSearchData?.bind_dn ?? '- -'}</div>
                                            <div>Email: {advancedSearchData?.email ?? '- -'}</div>
                                            <div>
                                                Username: {advancedSearchData?.user_name ?? '- -'}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </Form>
            </div>
            <div className="btn-box">
                <Button onClick={() => onClose()} style={{ marginRight: 12 }}>
                    {t('common.bt.cancel')}
                </Button>
                {currentStep === 1 && (
                    <Button type="primary" onClick={handleNextStep} loading={isLoading}>
                        {t('common.bt.next')}
                    </Button>
                )}
                {currentStep === 2 && (
                    <>
                        <Button onClick={() => setCurrentStep(1)}>{t('common.bt.prev')}</Button>
                        <Button
                            loading={isLoading}
                            onClick={handleSubmit}
                            style={{ marginLeft: 12 }}
                            type="primary"
                        >
                            {t('settings.finishAndSync')}
                        </Button>
                    </>
                )}
            </div>
        </ConfigServiceWrap>
    );
};

export default ConfigService;
