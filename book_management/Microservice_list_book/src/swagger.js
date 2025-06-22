import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/bookRouter.js'];

const doc = {
    swagger: '2.0',
    info: {
        title: 'Book API',
        description: 'API for getting a list of books',
        version: '1.0.0',
    },
    host: 'localhost:4000',
    basePath: '/api/books',
    schemes: ['http', 'https'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);

