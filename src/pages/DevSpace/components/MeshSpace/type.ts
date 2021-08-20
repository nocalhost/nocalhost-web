interface WorkloadItem {
    kind: string;
    name: string;
    status: number;
}

export interface IApp {
    name: string;
    workloads: WorkloadItem[];
}
