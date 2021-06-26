const { CODES } = require("./Enums");
//eslint-disable-next-line
const ErrorHandler = (err, _req, res, next) => {
  let status;
  let message;

  if (err === CODES.NOT_FOUND) {
    status = CODES.NOT_FOUND;
    message = { message: "Ressources Not found" };
  } else if (err === CODES.BAD_REQUEST) {
    status = CODES.BAD_REQUEST;
    message = { message: "Invalid Request" };
  } else if (err === CODES.NOT_ALLOWED) {
    status = CODES.NOT_ALLOWED;
    message = { message: "Action Forbidden" };
  } else {
    status = CODES.INTERNAL_ERROR;
    message = { message: "Internal Server Error" };
  }

  res.status(status).send(message);
};

module.exports = ErrorHandler;
