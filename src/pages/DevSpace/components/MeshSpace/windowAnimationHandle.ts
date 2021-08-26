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
