export interface ResponseErrorType {
    field: string;
    message: string;
}

export interface ResponseDataType {
    status: string;
    errors?: ResponseErrorType | ResponseErrorType[];
    message?: string;
    data?: {} | [];
}
