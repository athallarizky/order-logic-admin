import errorHandler from '@/helper/api/error-handler';
import jwtMiddleware from '@/helper/api/jwt-middleware';

export default apiHandler;

function apiHandler(handler) {
  return async (req, res) => {
    try {
      // global middleware
      await jwtMiddleware(req, res);

      // route handler
      await handler(req, res);
    } catch (err) {
      // global error handler
      errorHandler(err, res);
    }
  };
}
