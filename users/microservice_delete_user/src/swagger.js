import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/userRouter.js'];

const doc = {
    info: {
        title: 'User API',
        description: 'API for delete user',
    },
    host: 'localhost:5002',
    schemes: ['http', 'https'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
