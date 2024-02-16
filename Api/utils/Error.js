export const errHandlers = (statusCode, errMessage) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = errMessage;
  return error;
};
