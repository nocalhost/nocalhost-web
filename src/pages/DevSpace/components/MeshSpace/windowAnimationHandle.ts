export function windowAnimationStartHandle(element: any, callBack: any) {
    element.addEventListener('webkitAnimationStart', function (...args: any) {
        callBack(...args);
    });
    element.addEventListener('animationetart', function (...args: any) {
        callBack(...args);
    });
}

export function windowAnimationEndHandle(element: any, callBack: any) {
    element.addEventListener('webkitAnimationEnd', function (...args: any) {
        callBack(...args);
    });
    element.addEventListener('animationend', function (...args: any) {
        callBack(...args);
    });
}

export function removeWindowAnimationStartHandle(element: any, callBack: any) {
    element.removeEventListener('webkitAnimationStart', function (...args: any) {
        callBack(...args);
    });
    element.removeEventListener('animationetart', function (...args: any) {
        callBack(...args);
    });
}

export function removeWindowAnimationEndHandle(element: any, callBack: any) {
    element.removeEventListener('webkitAnimationEnd', function (...args: any) {
        callBack(...args);
    });
    element.removeEventListener('animationend', function (...args: any) {
        callBack(...args);
    });
}
