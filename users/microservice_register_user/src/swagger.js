import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/userRouter.js'];

const doc = {
    info: {
        title: 'user API',
        description: 'API for registering and managing users',
    },
    host: 'localhost:5000',
    schemes: ['http', 'https'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
