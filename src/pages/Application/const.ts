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

export interface DisabledType {
    disabled?: boolean;
}
