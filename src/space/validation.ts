export const resourceValidation = (value: any, allValues: any, depField: string): any => {
    const resource = allValues.space_resource_limit || allValues;
    if (resource && resource[depField] && !value) {
        return `The value is required`;
    }
    return null;
};

export const memLimitValidate = (value: any, allValue: any) => {
    return resourceValidation(value, allValue, 'space_limits_mem');
};
export const memReqValidate = (value: any, allValue: any) => {
    return resourceValidation(value, allValue, 'space_req_mem');
};
export const cpuLimitValidate = (value: any, allValue: any) => {
    return resourceValidation(value, allValue, 'space_limits_cpu');
};
export const cpuReqValidate = (value: any, allValue: any) => {
    return resourceValidation(value, allValue, 'space_req_cpu');
};
