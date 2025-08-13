import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'API de Productos',
      version: '1.0.0',
      description: 'Documentación de la API de Productos',
    },
    servers: [
      { url: 'http://localhost:3000' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Producto: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Producto A' },
            price: { type: 'number', example: 1000 },
            stock: { type: 'integer', example: 10 },
            category: { type: 'string', example: 'Electrónica' },
            img: { type: 'string', example: 'https://ejemplo.com/img.jpg' },
            description: { type: 'string', example: 'Descripción del producto' },
          },
        },
        ProductoInput: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'Producto A' },
            price: { type: 'number', example: 1000 },
            stock: { type: 'integer', example: 10 },
            category: { type: 'string', example: 'Electrónica' },
            img: { type: 'string', example: 'https://ejemplo.com/img.jpg' },
            description: { type: 'string', example: 'Descripción del producto' },
          },
          required: ['name', 'price', 'stock', 'category', 'img'],
        },
        Usuario: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'usuario123' },
            username: { type: 'string', example: 'usuario123' },
            mail: { type: 'string', example: 'usuario@email.com' },
            rol: { type: 'string', example: 'user' },
            nombre: { type: 'string', example: 'Juan' },
            apellido: { type: 'string', example: 'Pérez' },
            direccion: { type: 'string', example: 'Calle 123' },
          },
        },
        UsuarioInput: {
          type: 'object',
          properties: {
            username: { type: 'string', example: 'usuario123' },
            mail: { type: 'string', example: 'usuario@email.com' },
            password: { type: 'string', example: '123456' },
            rol: { type: 'string', example: 'user' },
            nombre: { type: 'string', example: 'Juan' },
            apellido: { type: 'string', example: 'Pérez' },
            direccion: { type: 'string', example: 'Calle 123' },
          },
          required: ['username', 'mail', 'password', 'nombre', 'apellido', 'direccion'],
        },
      },
    },
  };
  
  const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.js'],    
  };
  
  const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
