interface WorkloadItem {
    kind: string;
    name: string;
    status: number;
}

export interface IApp {
    name: string;
    workloads: WorkloadItem[];
}

export interface ContentStyleProps {
    hiddenIcon: boolean;
    wayRightWidth: number;
    wayLeftWidth: number;
    selectBoxWidth: number;
    wayOrLineOffsetTop: number;
    selectBoxHeight: number;
}
