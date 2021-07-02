import { TranslationMessages } from 'react-admin';
import englishMessages from 'ra-language-english';

const { ra } = englishMessages;
const { auth } = ra;
const newAuth = { email: 'Email', ...auth };
ra.auth = newAuth;
englishMessages.ra = ra;

const customEnglishMessages: TranslationMessages = {
    ...englishMessages,
    nh: {
        language: 'Language',
        theme: {
            name: 'Theme',
        },
        layout: { menu: { home: 'Nocalhost', document: 'Documents', profile: 'Profile' } },
        dashboard: {
            welcome: {
                title: 'Nocalhost Web Dashboard',
                content: 'Manage users, clusters, applications and DevSpaces.',
            },
        },
        validation: {
            required: {
                email: 'The Email is required',
                name: 'The Name is required',
                password: 'The Password is Required',
                confirm_password: 'The Confirm Password is Required',
            },
            confirm_password_error: 'The Confirm Password mast be equals The Password',
        },
        action: { copy: 'Copy', copied: 'Copied!' },
    },
    resources: {
        users: {
            name: 'User |||| Users',
            fields: {
                name: 'Name',
                email: 'Email',
                cluster_count: 'DevSpaces Count',
                status: 'Status',
                userType: 'User Type',
                is_admin: 'Is Admin',
                password: 'Password',
                confirm_password: 'Confirm Password',
            },
            status: { active: 'Active', inactive: 'Inactive' },
            userType: { admin: 'Admin', user: 'User' },
        },
        cluster: {
            name: 'Cluster |||| Clusters',
            fields: {
                name: 'Name',
                cluster_version: 'Cluster Version',
                status: 'Is Ready',
                nodes_count: 'Nodes Count',
                users_count: 'DevSpaces Count',
                user: 'Creator',
                created_at: 'Created At',
                kubeconfig: 'KubeConfig',
                storage_class: 'Storage Class',
            },
            tips: { kubeconfig: 'How to get kubeconfig?' },
            delete: {
                confirm: {
                    title: 'Delete cluster "%{name}"',
                    content:
                        'This will delete all nocalhost resources and created workspaces from the cluster.',
                },
            },
            status: { is_ready: 'IsReadly', not_ready: 'NotReady' },
        },
        application: {
            name: 'Application |||| Applications',
            fields: {
                application_name: 'Application Name',
                source: 'Kubernetes Manifest Source Type',
                install_type: 'Manifest Type',
                application_url: 'Application Url',
                git_repo_url: 'Git Repo Url',
                helm_repo_url: 'Helm Repo Url',
                kustomize_dir: 'Kustomize path',
                resource_dir: 'Resource Dir',
                config_path: 'Config File',
                nocalhost_config: 'Nocalhost Config',
                cluster_count: 'Clusters Count',
                status: 'Status',
                user: 'Creator',
                created_at: 'Created At',
            },
            tips: {
                resource_dir: 'Specify dirs of manifests(relative path os Git repository)',
                config_path:
                    'Specify location of nocalhost config file.(Relative path of .nocalhost dir, default: config.yaml)',
                helm_repo: 'Application name will be used for release name',
                helm_chart_name: 'Name will be used for chart name',
            },
            auth: {
                bt: {
                    public: 'PUBLIC',
                    private: 'PRIVATE',
                    auth: 'AUTHORIZATION',
                    add: 'add',
                    delete: 'delete',
                    return: 'return',
                },
                fields: {
                    name: 'Name',
                    email: 'Email',
                },
            },
            permission: {
                confirm: {
                    title: 'Modify applications permissions # [%{name}]',
                    content: 'Are you sure you want to modify this item?',
                },
            },
        },
        space: {
            name: 'DevSpace |||| DevSpaces',
            fields: {
                space_name: 'Space Name',
                base_space_name: 'Base Space Name',
                header: 'Header',
                header_key: 'Header Key',
                header_key_prefix: 'Key Prefix',
                header_value: 'Header Value',
                status: 'Status',
                user: 'Owner',
                namespace: 'Namespace',
                created_at: 'Created At',
                cluster: 'Cluster',
                application: 'Application',
                resource: 'Resource',
                cpu: 'CPU',
                memory: 'Memory',
                kubeconfig: 'KubeConfig',
                resource_limit: 'Resource Limit',
                mesh_dev_space: 'Mesh DevSpace',
                cluster_admin: 'Cluster Admin',
                reset: 'Reset',
                requestTotalMem: 'Request Memory (MiB)',
                requestTotalCPU: 'Request CPU (cores)',
                limitTotalMem: 'Memory limit (MiB)',
                limitTotalCPU: 'CPU limit (cores)',
                PVC_num: 'PVC Quantity',
                storageCapacity: 'Storage Capacity (GiB)',
                lbNum: 'LoadBalancer Quantity',
                requestMem: 'Request Memory (MiB)',
                requestCPU: 'Request CPU (cores)',
                limitMem: 'Memory limit (MiB)',
                limitCPU: 'CPU limit (cores)',
                meshDevSpace: 'Mesh DevSpace',
            },
            devspaceLimitTitle: 'DevSpace Resource Limit',
            containerDefaultTitle: 'Container Default',
            actions: {
                create: 'Create Space',
                show: 'Show Space',
                list: 'Space List',
                download: 'Download KubeConfig',
                resource_limit_not_implemented: 'Resource limit has not been implemented',
            },
            reset: {
                confirm: {
                    title: 'Reset DevSpace',
                    content:
                        'Reset DevSpace will delete [%{name}] namespace resource and create new namespace',
                },
                successed: 'Reset DevSpace successed!',
            },
            status: { deployed: 'Deployed', undeployed: 'Not deployed' },
            empty: { title: 'Space is empty', content: 'Create a new Space' },
            document: {
                vscode: 'Start coding with Nocalhost VSCode Plugin(Recemmended):',
                vscode_step1:
                    'Step 1: Install Nocalhost VSCode Plugin: Search nocalhost in the extension marketplace or click here:',
                vscode_step1_1:
                    'https://marketplace.visualstudio.com/items?itemName=nocalhost.nocalhost',
                vscode_step2: 'Step 2: Configure plugin and sigin nocalhost api server:',
                vscode_step2_1:
                    'Click Nocalhost Plugin Tab and click the button set api host: %{apiUrl}',
                vscode_step2_2: 'Click sign in to sigin nocalhost api server.',
                vscode_step3: 'Step 3: Install application and start development:',
                vscode_step3_1:
                    'Click the install icon of the application that you want to develop on the left panel.',
                vscode_step3_2:
                    'Click the Workload of this application to watch the deployment progress and wait for the installation.',
                vscode_step3_3:
                    'Click the start develop icon to enter DevSpace and enjoy your coding.',
                nhctl: 'Start coding with nhctl:',
                nhctl_install_url: 'https://nocalhost.dev/installation',
                nhctl_step1: 'Step 1: Install nhctl: ',
                nhctl_step2: 'Step 2: Click "Download Kubeconfig" and save this file',
                nhctl_step3: 'Step 3: Install an application that you  want to develop via nhctl:',
                nhctl_step3_1: '# Click here to get more details about the arguments of nhctl',
                nhctl_step3_2:
                    'nhctl install %{appName} --kubeconfig <the file you downloaded> -u %{gitUrl}',
                nhctl_step4:
                    'Step 4: Enter DevMode by specify a workload that you want to develop:',
                nhctl_step4_1: '# Click here to get more details about the arguments of nhctl ',
                nhctl_step4_2:
                    'nhctl dev start %{appName} --kubeconfig <the file you downloaded> -d <the workload that you want to develop>  ',
                nhctl_step5: 'Step 5: Sync codes to DevMode containers:',
                nhctl_step5_1: '# Click here to get more details about the arguments of nhctl ',
                nhctl_step5_2:
                    'nhctl sync %{appName} --kubeconfig <the file you downloaded> -d <the workload that you want to develop>  ',
                nhctl_step6: 'Step 6: Forward ports from DevMode container to local(Optional):',
                nhctl_step6_1: '# Click here to get more details about the arguments of nhctl ',
                nhctl_step6_2:
                    'nhctl port-forward %{appName} --kubeconfig <the file you downloaded> -d <the workload that you want to develop>  ',
                nhctl_step7: 'Step 7: Coding locally and start your program remotely:',
                nhctl_step7_1: '# Click here to get more details about the arguments of nhctl ',
                nhctl_step7_2:
                    'kubectl --kubeconfig <the file you downloaded> exec -it pod/<pod_name> -c nocalhost-dev -- bash',
                nhctl_step7_3: 'bash: <your program start command,like: ./gradlew bootRun>',
            },
        },
        devSpace: {
            name: 'DevSpace |||| DevSpaces',
            fields: {
                space_name: 'Space Name',
                status: 'Status',
                user: 'Owner',
                namespace: 'Namespace',
                created_at: 'Created At',
                cluster: 'Cluster',
                application: 'Application',
                resource: 'Resource',
                cpu: 'CPU',
                memory: 'Memory',
                kubeconfig: 'KubeConfig',
                resource_limit: 'Resource Limit',
            },
            actions: { create: 'Create Space', show: 'Show Space', list: 'Space List' },
            status: { deployed: 'Deployed', undeployed: 'Not deployed' },
        },
        myDevSpace: {
            name: 'DevSpace |||| DevSpaces',
            fields: {
                space_name: 'Space Name',
                status: 'Status',
                user: 'Owner',
                namespace: 'Namespace',
                created_at: 'Created At',
                cluster: 'Cluster',
                application: 'Application',
                resource: 'Resource',
                cpu: 'CPU',
                memory: 'Memory',
                kubeconfig: 'KubeConfig',
                resource_limit: 'Resource Limit',
                mesh_dev_space: 'Mesh DevSpace',
            },
            actions: { show: 'Show Space', list: 'Space List', download: 'Download KubeConfig' },
            status: { deployed: 'Deployed', undeployed: 'Not deployed' },
        },
        profile: {
            name: 'Profile',
            fields: {
                name: 'Name',
                email: 'Email',
                cluster_count: 'Clusters Count',
                status: 'Status',
                userType: 'User Type',
                is_admin: 'Is Admin',
                password: 'Password',
                confirm_password: 'Confirm Password',
            },
            status: { active: 'Active', inactive: 'Inactive' },
            userType: { admin: 'Admin', user: 'User' },
        },
    },
};

export default customEnglishMessages;
