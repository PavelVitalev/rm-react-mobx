import development from './development';
import production from './production';

const env = process.env.NODE_ENV;

const config = { development, production };

export default config[env];
