export function isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
}

export function isStringNullOrEmpty(value: string | null | undefined): boolean {
    return value === null || value === undefined || value.trim() === "";
}

export function isArrayNullOrEmpty<T>(arr: T[] | null | undefined): boolean {
    return arr === null || arr === undefined || arr.length === 0;
}

export function isObjectEmpty(obj: object | null | undefined): boolean {
    return obj === null || obj === undefined || Object.keys(obj).length === 0;
}

export function safeGet<T>(value: T | null | undefined, defaultValue: T): T {
    return value === null || value === undefined ? defaultValue : value;
}
