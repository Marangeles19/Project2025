import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/catalogRouter.js'];

const doc = {
    info: {
        title: 'Catalog API',
        description: 'API for update catalog',
    },
    host: 'localhost:3004',
    schemes: ['http', 'https'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);