import { TranslationMessages } from 'react-admin';
// eslint-disable-next-line
// @ts-ignore
import chineseMessages from 'ra-language-chinese';

const { ra } = chineseMessages;
const { auth } = ra;
const newAuth = { email: '邮箱', ...auth };
ra.auth = newAuth;
chineseMessages.ra = ra;

const customChineseMessages: TranslationMessages = {
    ...chineseMessages,
    nh: {
        language: '语言',
        theme: {
            name: '主题',
        },
        dashboard: {
            welcome: { title: '欢迎使用 Nocalhost', content: 'Nocalhost is Not localhost' },
        },
        validation: {
            required: {
                email: '邮箱必填',
                name: '用户名必填',
                password: '密码必填',
                confirm_password: '确认密码必填',
            },
            confirm_password_error: '确认密码必须和密码保持一直',
        },
    },
    resources: {
        users: {
            name: '用户 |||| 用户列表',
            fields: {
                name: '用户名',
                email: '邮箱',
                cluster_count: '集群数量',
                status: '状态',
                password: '密码',
                confirm_password: '确认密码',
            },
            status: { active: '开启', inactive: '锁定' },
        },
        cluster: {
            name: '集群 |||| 集群列表',
            fields: {
                cluster_name: '集群名称',
                marks: '标记',
                cluster_version: '集群版本',
                nodes_count: '节点数量',
                users_count: '用户数量',
                user: '创建者',
                created_at: '创建于',
                kubeconfig: 'KubeConfig',
            },
            delete: {
                confirm: {
                    title: '删除集群 "%{name}"',
                    content: '这将从集群内删除所有 nocalhost 资源以及创建的工作空间。',
                },
            },
        },
        application: {
            name: '应用 |||| 应用列表',
            fields: {
                application_name: '应用名称',
                source: '安装来源',
                install_type: '安装类型',
                application_url: '安装地址',
                resource_dir: '路径',
                cluster_count: '集群数',
                status: '状态',
                user: '创建者',
                created_at: '创建于',
            },
        },
        space: {
            name: '环境 |||| 环境列表',
            fields: {
                status: '状态',
                user: '所有者',
                namespace: '命名空间',
                created_at: '创建于',
                cluster: '集群',
                application: '应用',
                resource: '资源',
                cpu: 'CPU',
                memory: 'Memory',
                kubeconfig: 'KubeConfig',
            },
            actions: { create: '创建环境', show: '环境详情', list: '环境列表' },
            status: { deployed: '已部署', undeployed: '未部署' },
            empty: { title: '环境列表为空', content: '来创建一个环境' },
        },
        devSpace: {
            name: '环境 |||| 环境列表',
            fields: {
                status: '状态',
                user: '所有者',
                namespace: '命名空间',
                created_at: '创建于',
                cluster: '集群',
                application: '应用',
                resource: '资源',
                cpu: 'CPU',
                memory: 'Memory',
                kubeconfig: 'KubeConfig',
            },
            actions: { create: '创建环境', show: '环境详情', list: '环境列表' },
            status: { deployed: '已部署', undeployed: '未部署' },
        },
    },
};

export default customChineseMessages;
