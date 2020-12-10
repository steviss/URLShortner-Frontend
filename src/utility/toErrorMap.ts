import { ResponseErrorType } from 'types/Response';

export const toErrorMap = (errors: ResponseErrorType[]) => {
    const errorMap: Record<string, string> = {};
    errors.forEach(({ field, message }) => {
        errorMap[field] = message;
    });
    return errorMap;
};
