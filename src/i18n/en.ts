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
        layout: { menu: { home: 'Nocalhost', document: 'Documents' } },
        dashboard: {
            welcome: { title: 'Welcome to the Nocalhost', content: 'Nocalhost is Not localhost' },
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
                name: 'Name',
                cluster_version: 'Cluster Version',
                nodes_count: 'Nodes Count',
                users_count: 'Users Count',
                user: 'Creator',
                created_at: 'Created At',
                kubeconfig: 'KubeConfig',
            },
            tips: { kubeconfig: 'How to get kubeconfig?' },
            delete: {
                confirm: {
                    title: 'Delete cluster "%{name}"',
                    content:
                        'This will delete all nocalhost resources and created workspaces from the cluster.',
                },
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
                resource_limit: 'Resource Limit',
            },
            actions: { create: 'Create Space', show: 'Show Space', list: 'Space List' },
            status: { deployed: 'Deployed', undeployed: 'Not deployed' },
            empty: { title: 'Space is empty', content: 'Create a new Space' },
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
                resource_limit: 'Resource Limit',
            },
            actions: { create: 'Create Space', show: 'Show Space', list: 'Space List' },
            status: { deployed: 'Deployed', undeployed: 'Not deployed' },
        },
    },
};

export default customEnglishMessages;
