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
        layout: { menu: { home: 'Nocalhost', document: '文档' } },
        dashboard: {
            welcome: { title: 'Nocalhost 控制台', content: '管理用户、集群、应用和开发空间。' },
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
        action: { copy: '复制', copied: '已复制！' },
    },
    resources: {
        users: {
            name: '用户 |||| 用户列表',
            fields: {
                name: '用户名',
                email: '邮箱',
                cluster_count: '集群数量',
                status: '状态',
                userType: '用户类型',
                is_admin: '是否设置为管理员',
                password: '密码',
                confirm_password: '确认密码',
            },
            status: { active: '开启', inactive: '锁定' },
            userType: { admin: '管理员', user: '普通用户' },
        },
        cluster: {
            name: '集群 |||| 集群列表',
            fields: {
                name: '集群名称',
                cluster_version: '集群版本',
                status: '是否可用',
                nodes_count: '节点数量',
                users_count: '用户数量',
                user: '创建者',
                created_at: '创建于',
                kubeconfig: 'KubeConfig',
                storage_class: '存储类型',
            },
            tips: { kubeconfig: '如何获取 kubeconfig？' },
            delete: {
                confirm: {
                    title: '删除集群 "%{name}"',
                    content: '这将从集群内删除所有 nocalhost 资源以及创建的工作空间。',
                },
            },
            status: { is_ready: '可用', not_ready: '不可用' },
        },
        application: {
            name: '应用 |||| 应用列表',
            fields: {
                application_name: '应用名称',
                source: 'Kubernetes Manifest 安装来源',
                install_type: 'Manifest 类型',
                application_url: '安装地址',
                git_repo_url: 'Git 仓库地址',
                helm_repo_url: 'Helm 仓库地址',
                resource_dir: '路径',
                config_path: '配置文件',
                nocalhost_config: 'Nocalhost 配置信息',
                cluster_count: '集群数',
                status: '状态',
                user: '创建者',
                created_at: '创建于',
            },
            tips: {
                resource_dir: 'Git 仓库的相对路径',
                config_path: '应用配置文件，一般存放于 .nocalhost 目录下',
            },
        },
        space: {
            name: '开发环境 |||| 开发环境列表',
            fields: {
                space_name: '空间名称',
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
                resource_limit: '资源限制',
                reset: '重置',
            },
            actions: {
                create: '创建环境',
                show: '环境详情',
                list: '环境列表',
                download: '下载 KubeConfig',
                resource_limit_not_implemented: '资源限制还未实现',
            },
            reset: {
                confirm: {
                    title: '重置开发空间',
                    content: '重置开发空间将删除 [%{name}] 命名空间内的所有资源，并重建',
                },
                successed: '开始空间重置成功！',
            },
            status: { deployed: '已部署', undeployed: '未部署' },
            empty: { title: '环境列表为空', content: '来创建一个环境' },
            document: {
                vscode: '使用 Nocalhost VSCode 插件开始开发（推荐）：',
                vscode_step1:
                    '步骤1：安装 Nocalhost VSCode 插件：在扩展市场中搜索 nocalhost 或单击此处：',
                vscode_step1_1:
                    'https://marketplace.visualstudio.com/items?itemName=nocalhost.nocalhost',
                vscode_step2: '步骤2：配置插件和 nocalhost api 服务器：',
                vscode_step2_1: '单击 Nocalhost 插件选项，然后点击按钮，配置 api 主机：%{apiUrl}',
                vscode_step2_2: '单击登录以使用 nocalhost api 服务器。',
                vscode_step3: '步骤3：安装应用程序并开始开发：',
                vscode_step3_1: '单击要在左侧面板上开发的应用程序的安装图标。',
                vscode_step3_2: '单击此应用程序的工作负载以查看部署进度并等待安装。',
                vscode_step3_3: '单击开始开发图标以进入 DevSpace 并享受您的编码。',
                nhctl: '使用 nhctl 开始开发：',
                nhctl_install_url: 'https://nocalhost.dev/installation',
                nhctl_step1: '第一步：安装 nhctl：',
                nhctl_step2: '第二步：点击页面中的「下载 Kubeconfig」并保存',
                nhctl_step3: '第三步：安装要通过 nhctl 开发的应用：',
                nhctl_step3_1: '# 单击此处以获取有关 nhctl 参数的更多详细信息',
                nhctl_step3_2:
                    'nhctl install %{appName} --kubeconfig <the file you downloaded> -u %{gitUrl}',
                nhctl_step4: '第四步：通过指定要开发的工作负载进入开发模式：',
                nhctl_step4_1: '# 单击此处以获取有关 nhctl 参数的更多详细信息',
                nhctl_step4_2:
                    'nhctl dev start %{appName} --kubeconfig <the file you downloaded> -d <the workload that you want to develop>  ',
                nhctl_step5: '步骤五：将代码同步到开发模式的容器中：',
                nhctl_step5_1: '# 单击此处以获取有关 nhctl 参数的更多详细信息',
                nhctl_step5_2:
                    'nhctl sync %{appName} --kubeconfig <the file you downloaded> -d <the workload that you want to develop>  ',
                nhctl_step6: '步骤六：将端口从开发模式容器转发到本地（可选）：',
                nhctl_step6_1: '# 单击此处以获取有关 nhctl 参数的更多详细信息',
                nhctl_step6_2:
                    'nhctl port-forward %{appName} --kubeconfig <the file you downloaded> -d <the workload that you want to develop>  ',
                nhctl_step7: '步骤七：本地开发，远程启动程序：',
                nhctl_step7_1: '# 单击此处以获取有关 nhctl 参数的更多详细信息',
                nhctl_step7_2:
                    'kubectl --kubeconfig <the file you downloaded> exec -it pod/<pod_name> -c nocalhost-dev -- bash',
                nhctl_step7_3: 'bash: <your program start command,like: ./gradlew bootRun>',
            },
        },
        devSpace: {
            name: '开发环境 |||| 开发环境列表',
            fields: {
                space_name: '空间名称',
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
                resource_limit: '资源限制',
            },
            actions: { create: '创建环境', show: '环境详情', list: '环境列表' },
            status: { deployed: '已部署', undeployed: '未部署' },
        },
    },
};

export default customChineseMessages;
