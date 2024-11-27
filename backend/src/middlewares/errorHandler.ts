import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  console.log(`
----------------------

Path = ${request.path}

----------------------

error message =  ${error.message}

----------------------

`);

  response.status(error.statusCode).json({
    message: error.message,
    statusCode: error.statusCode,
  });
};

export default errorHandler;
