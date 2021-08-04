export const MANIFEST_TYPE = {
    MANIFEST: 'rawManifest',
    HELMCHART: 'helm_chart',
    KUSTOMIZE: 'kustomize',
    MANIFESTLOCAL: 'rawManifestLocal',
    HELMCHARTLOCAL: 'helmLocal',
    KUSTOMIZELOCAL: 'kustomizeLocal',
};

export const SOURCE_TYPE = {
    GIT: 'git',
    HELM_REPO: 'helm_repo',
    LOCAL: 'local',
};

export type SelectValue = 'all' | 'git' | 'helm_repo' | 'local';

// {
//     "status":1,
//     "context":"{\"source\":\"git\",\"install_type\":\"rawManifest\",\"application_name\":\"bookinfo-copy\",\"application_url\":\"https://github.com/nocalhost/bookinfo.git\",\"application_config_path\":\"config.yaml\",\"resource_dir\":[\"dir\"]}"
// }
