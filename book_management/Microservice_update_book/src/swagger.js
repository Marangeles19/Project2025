import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/bookRouter.js'];

const doc = {
  swagger: '2.0',
  info: {
    title: 'Book API',
    description: 'API for updating book information',
    version: '1.0.0',
  },
  host: 'localhost:4000',
  basePath: '/api/books',
  schemes: ['http', 'https'],
  definitions: {
    Book: {
      title: 'El Principito',
      author: 'Antoine de Saint-Exupéry',
      category: 'Literatura Infantil',
      lenguage: 'Español',
      description: 'Un libro muy bonito',
      total_copies: 10,
      available_copies: 20,
      location: 'Biblioteca Central',
    },
  },
};

swaggerAutogen()(outputFile, endpointsFiles, doc);

