const { body, validationResult } = require('express-validator/check');
const connect = require('../utils/database');

exports.getCartItems = async (req, res, next) => {
    return connect(async connection => {
        const cartItems = (await connection.query(
            'SELECT * FROM ShoppingCart',
            [req.params.id]
        ))[0];

        return res.json({
            data: cartItems
        });
    });
};