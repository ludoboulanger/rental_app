//eslint-disable-next-line
const ErrorHandler = (err, _req, res, next) => {
  let status;
  let message;

  if (err === "404") {
    status = 404;
    message = { message: "Ressources Not found" };
  } else if (err === "400") {
    status = 400;
    message = { message: "Invalid Request" };
  } else if (err === "403") {
    status = 403;
    message = { message: "Action Forbidden" };
  } else {
    status = 500;
    message = { message: "Internal Server Error" };
  }

  res.status(status).send(message);
};

module.exports = ErrorHandler;
