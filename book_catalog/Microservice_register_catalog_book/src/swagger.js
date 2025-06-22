import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/catalog.js'];

const doc = {
    info: {
        title: 'Catalog API',
        description: 'API for registering and managing book catalogs',
    },
    host: 'localhost:3001',
    schemes: ['http', 'https'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
