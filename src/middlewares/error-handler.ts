import type {
  ErrorRequestHandler,
  RequestHandler,
} from "express";

const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({
    message: "Requested resource not found",
  });
};

const errorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
) => {
  console.error(err);

  res.status(500).json({
    message: "An error has occurred on the server",
  });
};

export { errorHandler, notFoundHandler };