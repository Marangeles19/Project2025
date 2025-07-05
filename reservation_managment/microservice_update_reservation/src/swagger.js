import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/reservationRouter.js'];

const doc = {
    info: {
        title: 'User Reservation API',
        description: 'API for updating user reservations',
    },
    host: 'localhost:7003',
    schemes: ['http', 'https'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);