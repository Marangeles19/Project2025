import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/reservationRouter.js'];

const doc = {
    info: {
        title: 'Reservation API',
        description: 'API for get listing reservations',
    },
    host: 'localhost:7001',
    schemes: ['http', 'https'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);