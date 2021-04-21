import path from 'path'

let options = {
  swaggerDefinition: {
      info: {
          description: 'This is a sample page to list all the endpoints of this version.',
          title: 'LaSerreConnecte - API',
          version: '1.0.0',
      },
      host: 'localhost:3001',
      basePath: '/v1',
      produces: [
          "application/json",
          "application/xml"
      ],
      schemes: ['http', 'https'],
      // securityDefinitions: {
      //     JWT: {
      //         type: 'apiKey',
      //         in: 'header',
      //         name: 'Authorization',
      //         description: "",
      //     }
      // }
  },
  basedir: path.resolve(__dirname, '..'), //app absolute path
  files: ['./routes/**/*.ts', './routes/**/*.js'] //Path to the API handle folder
};
export default options