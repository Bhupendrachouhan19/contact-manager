const constants = require('../constants');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                resErrorCode: res.statusCode,
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack,
            })
            break;
            
            case constants.UNAUTHORIZED: 
            res.json({
                resErrorCode: res.statusCode,
                title: "Unauthorized access denied!!",
                message: err.message,
                stackTrace: err.stack
            })
            break;
            
            case constants.FORBIDDEN: 
            res.json({
                resErrorCode: res.statusCode,
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack
            })
            break;
            
            case constants.NOT_FOUND: 
            res.json({
                resErrorCode: res.statusCode,
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack
            })
            break;
    
        case constants.SERVER_ERROR: 
        res.json({
                resErrorCode: res.statusCode,
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            })
            break;
        
        default:
            console.log("No Error Found, All good!!")
            break;
    }
};

module.exports = errorHandler;