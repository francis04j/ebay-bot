exports.awsApiGatewayRouteHandler = (req, res, next) => {
    req.header.stage
    const err = new Error('Resource not found.');
    err.status = 404;
    return next(err);
};