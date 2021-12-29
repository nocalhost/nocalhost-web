import React, { useEffect, useState } from 'react';

import { ConfigServiceWrap } from '../styled-component';
import { useTranslation } from 'react-i18next';
import { Form, Input, Radio, Button } from 'antd';
import { ConfigInfo } from '../../../types';
import LabelWithHelp from '../../../components/LabelWithHelp';
import { ReactComponent as IconArrowDown } from '../../../images/icon/icon_arrow_down.svg';
import { ReactComponent as IconArrowRight } from '../../../images/icon/icon_arrow_right.svg';

interface IProp {
    configData: ConfigInfo | null;
    onClose: () => void;
}

const ConfigService = ({ configData, onClose }: IProp) => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState<number>(configData ? 2 : 1);
    const [folded, setFolded] = useState<boolean>(true);
    const [form] = Form.useForm();

    useEffect(() => {
        if (configData) {
            form.setFieldsValue({
                server: configData?.server,
                bind_dn: configData?.bind_dn,
                password: '******',
                security: configData?.tls ? 'tls' : configData?.md5 ? 'md5' : '',
                base_dn: configData?.base_dn,
                filter: configData?.filter,
                email_attr: configData?.email_attr,
                user_name_attr: configData?.user_name_attr,
                admin_base_dn: configData?.admin_base_dn,
                admin_filter: configData?.admin_filter,
            });
        }
    }, []);

    const handleNextStep = () => {
        setCurrentStep(2);
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
                            >
                                <Input placeholder={t('settings.serverAddrPh')} />
                            </Form.Item>
                            <Form.Item
                                label={t('settings.adminAccount')}
                                name="bind_dn"
                                required={true}
                            >
                                <Input placeholder={t('settings.adminAccountPh')} />
                            </Form.Item>
                            <Form.Item
                                label={t('settings.adminPwd')}
                                name="password"
                                required={true}
                            >
                                <Input type="password" placeholder={t('settings.adminPwd')} />
                            </Form.Item>
                            <Form.Item
                                label={t('settings.securitySet')}
                                name="security"
                                style={{ marginBottom: 0 }}
                            >
                                <Radio.Group>
                                    <Radio value="tls">Enable TLS</Radio>
                                    <Radio value="md5">Enable Digest MD5 Bind</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </>
                    )}

                    {currentStep === 2 && (
                        <>
                            <Form.Item
                                label={
                                    <LabelWithHelp label={t('settings.emailAttr')} tip={t('')} />
                                }
                                name="email_attr"
                                required={true}
                            >
                                <Input placeholder={t('settings.emailAttrPh')} />
                            </Form.Item>
                            <Form.Item label={t('settings.usernameAttr')} name="user_name_attr">
                                <Input placeholder={t('settings.usernameAttrPh')} />
                            </Form.Item>

                            <div className="member-rule">
                                <div className="rule-label">{t('settings.memberRule')}</div>
                                <Form.Item label={t('settings.baseDn')} name="base_dn">
                                    <Input placeholder={t('settings.usernameAttrPh')} />
                                </Form.Item>
                                <Form.Item label={t('settings.selector')} name="filter">
                                    <Input placeholder={t('settings.usernameAttrPh')} />
                                </Form.Item>
                                <div className="rule-tip">
                                    <div>Example: (填完至少基础 DN+Attr 实时获取一个)</div>
                                    <div>DN: - -</div>
                                    <div>Email: - -</div>
                                    <div>Username: - -</div>
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
                                        >
                                            <Input placeholder={t('settings.usernameAttrPh')} />
                                        </Form.Item>
                                        <Form.Item
                                            label={t('settings.selector')}
                                            name="admin_filter"
                                        >
                                            <Input placeholder={t('settings.usernameAttrPh')} />
                                        </Form.Item>
                                        <div className="rule-tip">
                                            <div>Example: (填完至少基础 DN+Attr 实时获取一个)</div>
                                            <div>DN: - -</div>
                                            <div>Email: - -</div>
                                            <div>Username: - -</div>
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
                    <Button type="primary" onClick={handleNextStep}>
                        {t('common.bt.next')}
                    </Button>
                )}
                {currentStep === 2 && (
                    <>
                        <Button onClick={() => setCurrentStep(1)}>{t('common.bt.prev')}</Button>
                        <Button style={{ marginLeft: 12 }} type="primary">
                            {' '}
                            {t('settings.finishAndSync')}
                        </Button>
                    </>
                )}
            </div>
        </ConfigServiceWrap>
    );
};

export default ConfigService;
