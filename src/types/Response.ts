export interface ResponseErrorType {
    field: string;
    message: string;
}

export interface ResponseDataType<T> {
    status: string;
    errors?: ResponseErrorType[];
    message?: string;
    data?: T;
}

export interface PaginatedResponse<T> {
    items: T;
    total: number;
    hasMore: boolean;
}

export interface ForgotPasswordResponse {
    emailSent: boolean;
}

export interface LogoutResponse {
    loggedOut: boolean;
}

export interface DeleteResponse {
    deleted: boolean;
}
