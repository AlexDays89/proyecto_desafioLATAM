import YAML from 'yamljs';

const swaggerSpec = YAML.load('./src/swagger.yaml');

export default swaggerSpec;
