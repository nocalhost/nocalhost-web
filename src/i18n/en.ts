import { TranslationMessages } from 'react-admin';
import englishMessages from 'ra-language-english';

const { ra } = englishMessages;
const { auth } = ra;
const newAuth = { email: 'Email', ...auth };
ra.auth = newAuth;
englishMessages.ra = ra;

const customEnglishMessages: TranslationMessages = {
    ...englishMessages,
    pos: {
        language: 'Language',
        theme: {
            name: 'Theme',
        },
        dashboard: {
            welcome: { title: 'Welcome to the Nocalhost', content: 'Nocalhost is Not localhost' },
        },
    },
    resources: {
        users: {
            name: 'User |||| Users',
            fields: {
                name: 'Name',
                email: 'Email',
                cluster_count: 'Clusters Count',
                status: 'Status',
                password: 'Password',
                confirm_password: 'Confirm Password',
            },
            status: { active: 'Active', inactive: 'Inactive' },
        },
        cluster: {
            name: 'Cluster |||| Clusters',
            fields: {
                cluster_name: 'Name',
                marks: 'Marks',
                cluster_version: 'Cluster Version',
                nodes_count: 'Nodes Count',
                users_count: 'Users Count',
                user: 'Creator',
                created_at: 'Created At',
                kubeconfig: 'KubeConfig',
            },
        },
        application: {
            name: 'Application |||| Applications',
            fields: {
                application_name: 'Application Name',
                source: 'Source',
                install_type: 'Install Type',
                application_url: 'Application Url',
                resource_dir: 'Resource Dir',
                cluster_count: 'Clusters Count',
                status: 'Status',
                user: 'Creator',
                created_at: 'Created At',
            },
        },
        space: {
            name: 'Space |||| Spaces',
            fields: {
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
            },
            actions: { create: 'Create Space', show: 'Show Space', list: 'Space List' },
            status: { deployed: 'Deployed', undeployed: 'Not deployed' },
        },
        devSpace: {
            name: 'Space |||| Spaces',
            fields: {
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
            },
            actions: { create: 'Create Space', show: 'Show Space', list: 'Space List' },
            status: { deployed: 'Deployed', undeployed: 'Not deployed' },
        },
    },
};

export default customEnglishMessages;
