exports.notFoundHandler = (req, res, next) => {
    const err = new Error('Resource not found');
    err.status = 404;
    return next(err);
};

exports.exceptionHandler = (err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        messages: [err.message]
    });
};
