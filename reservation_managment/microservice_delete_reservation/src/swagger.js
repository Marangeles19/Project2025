import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/reservationRouter.js'];

const doc = {
    info: {
        title: 'Reservation API',
        description: 'API for delete reservation',
    },
    host: 'localhost:7002',
    schemes: ['http', 'https'],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
