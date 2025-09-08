import {
    BadRequestError,
    ForbiddenError,
    InternalError,
    MethodNotAllowedError,
    NotFoundError,
    TooManyRequestsError, UnknownError
} from "../../src";

export const errorsTestCases = [
    [
        400,
        'BAD_REQUEST',
        'error bad request',
        BadRequestError,
        'BadRequestError'
    ],
    [
        403,
        'FORBIDDEN',
        'forbidden',
        ForbiddenError,
        'ForbiddenError'
    ],
    [
        404,
        'NOT_FOUND',
        'invalid \'qrId\'',
        NotFoundError,
        'NotFoundError'
    ],
    [
        405,
        'METHOD_NOT_ALLOWED',
        'Method not allowed',
        MethodNotAllowedError,
        'MethodNotAllowedError'
    ],
    [
        429,
        'TMR',
        'too many requests',
        TooManyRequestsError,
        'TooManyRequestsError'
    ],
    [
        500,
        'INTERNAL_ERROR',
        'internal server error',
        InternalError,
        'InternalError'
    ],
    [
        502,
        '502',
        '502',
        UnknownError,
        'UnknownError'
    ],
];