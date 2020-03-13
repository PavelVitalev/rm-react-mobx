import config from './config';
import App from './app';

const { app } = new App(config);

app.listen(config.app.port, () => {
  console.log(`CORS-enabled web server listening on http://localhost:${config.app.port}`);
});
