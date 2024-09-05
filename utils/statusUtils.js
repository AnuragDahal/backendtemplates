export const sendBadRequest = (res, message = 'Bad Request') => {
    return res.status(400).json({
        statusCode: 400,
        message: message
    });
};

export const sendUnauthorized = (res, message = 'Unauthorized') => {
    return res.status(401).json({
        statusCode: 401,
        message: message
    });
};

export const sendForbidden = (res, message = 'Forbidden') => {
    return res.status(403).json({
        statusCode: 403,
        message: message
    });
};

export const sendNotFound = (res, message = 'Not Found') => {
    return res.status(404).json({
        statusCode: 404,
        message: message
    });
};

export const sendInternalServerError = (res, message = 'Internal Server Error') => {
    return res.status(500).json({
        statusCode: 500,
        message: message
    });
};
