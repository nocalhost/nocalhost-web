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
    selectBoxHeight: number;
    workLoadWidth: number;
    animationTime: any;
}

export interface SpaceIconStyleProps {
    selectEnd: boolean;
    animationEnd: boolean;
}
