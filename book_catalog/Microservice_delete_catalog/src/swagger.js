import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routers/catalogRouter.js'];

const doc = {
    info: {
        title: 'Catalog API',
        description: 'API for delete catalog',
    },
    host: 'localhost:3003',
    schemes: ['http', 'https'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
