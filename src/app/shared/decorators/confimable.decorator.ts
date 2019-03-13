
// NOTE: use '@Confirmable()' or '@Confirmable('message')' above a function
export function Confirmable(pMessage: string = 'Are you sure ?') {
    return function (target: Object, key: string, descriptor: PropertyDescriptor) {

        const original = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const allow = confirm(pMessage);

            if (allow) {
                return original.apply(this, args);
            } else {
                return null;
            }
        };

        return descriptor;
    };
}



