import express from 'express';

class Router {
  static PREFIX = '/';

  static ROUTES = [];

  static CONTROLLER = () => {};

  static MIDDLEWARE = [];

  router = express.Router();

  init = () => {
    const { router } = this;
    const { PREFIX, ROUTES, CONTROLLER, MIDDLEWARE } = this.constructor;
    const controllerInstance = new CONTROLLER();

    if (MIDDLEWARE.length) {
      router.use(MIDDLEWARE);
    }

    ROUTES.forEach(({ method, path, middleware, controllerMethod }) => {
      const route = router[method];
      const fullPath = `${PREFIX}${path}`;
      const handler = controllerMethod(controllerInstance);

      router[method](fullPath, middleware || [], handler);
      route.call(router, fullPath, middleware || [], handler);
    });

    return router;
  }
}

export default Router;
