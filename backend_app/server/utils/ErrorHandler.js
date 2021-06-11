//eslint-disable-next-line
const ErrorHandler = (err, _req, res, next) => {
  let status;
  let message;

  switch (err.message) {
  case "404":
    status = 404;
    message = { message: "Ressources Not found" };
    break;
  case "400":
    status = 400;
    message = { message: "Invalid Request" };
    break;
  default:
    status = 500;
    message = { message: "Internal Server Error" };
  }
  res.status(status).send(message);
};

module.exports = ErrorHandler;
