// NOTE: use '@timeout()' or '@timeout(2000)' above a function
export function Timeout(milliseconds: number = 0) {
    return function (target, key, descriptor) {

        const originalMethod = descriptor.value;

        descriptor.value = function (...args) {
            setTimeout(() => {
                originalMethod.apply(this, args);
            }, milliseconds);
        };

        return descriptor;
    };
}



