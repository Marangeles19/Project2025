import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/userRouter.js'];

const doc = {
    info: {
        title: 'User API',
        description: 'API for get listing users',
    },
    host: 'localhost:5001',
    schemes: ['http', 'https'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);