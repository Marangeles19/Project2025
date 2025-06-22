import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/bookRouter.js'];

const doc = {
    swagger: '2.0',
    info: {
        title: 'Book API',
        description: 'API for removing books from a library',
        version: '1.0.0',
    },
    host: 'localhost:4000',
    basePath: '/api/books',
    schemes: ['http', 'https'],
    definitions: {
        Book: {
            title: 'Cien Años de Soledad',
            author: 'Gabriel García Márquez',
            category: 'Realismo Mágico',
            lenguage: 'Español',
            description: 'Una obra maestra de la literatura latinoamericana que narra la historia de la familia Buendía.',
            total_copies: 15,
            available_copies: 12,
            location: 'Sala de Literatura Latinoamericana'
        },
    },
};

swaggerAutogen()(outputFile, endpointsFiles, doc);

