const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const { notFoundHandler, exceptionHandler } = require('./middleware/errorHandler');
const migrateDatabase = require('./routes/migrateDatabase');
const buy = require('./routes/buy');
const routeHandler = require('./middleware/routeHandler');

const app = express();
app.use(helmet());
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.options('/*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    return res.send(200);
});

app.get('/test', (req, res) => res.redirect('/swagger'));

app.get('/test', (req, res) => {
    if(req.url !== '/') {
        app.get('/test', (req, res) => res.redirect('/swagger'));
    }
});

app.use('/', routeHandler);
app.use('/api/migratedatabase', migrateDatabase);
app.use('/api/buy', buy);

const spec = swaggerJSDoc({
    swaggerDefinition: {
        info: {
            title: 'Ebay Bot Api',
            version: '1.0.0',
            description: 'A micro-service for shopping on ebay.'
        },
        basePath: '/api'
    },
    apis: ['./routes/*.js']
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(spec, {
    customSiteTitle: 'Ebay Bot Api'
}));

app.use(notFoundHandler);
app.use(exceptionHandler);

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
    console.log(`Express server listening on port ${server.address().port}`);
});
