import errorHandler from '@/helper/api/error-handler';
import jwtMiddleware from '@/helper/api/jwt-middleware';

export default apiHandler;

function apiHandler(handler) {
  return async (req, res) => {
    try {
      // global middleware
      await jwtMiddleware(req, res, handler);

    } catch (err) {
      // global error handler
      return errorHandler(err, res);
    }
  };
}
