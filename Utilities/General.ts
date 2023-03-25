export function runVoidOnce(fn: (...args: unknown[]) => void) {
    let hasRun = false;
    return function (...args: unknown[]) {
        if (hasRun === false) {
            Reflect.apply(fn, this, args);
            hasRun = true;
        }
    };
}

export function getFormDataFromObject(obj: Record<string, unknown>) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        acc.set(key, value as string);
        return acc;
    }, new FormData());
}

export function fetchPostFormData(endPoint: string, data: Record<string, unknown>) {
    return fetch(endPoint, {
        method: 'POST',
        body: getFormDataFromObject(data)
    });
}

export function fetchPostFormDataBodyJsonResponse<T>(endPoint: string, data: Record<string, unknown>): Promise<T> {
    return fetchPostFormData(endPoint, data).then(res => res.json());
}