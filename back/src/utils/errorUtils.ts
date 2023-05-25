const conflictError = (message: string) => {
  return {
    status: 409,
    type: "conflict",
    message: message,
  };
};

const notFoundError = (message: string) => {
  return {
    status: 404,
    type: "not found",
    message: message,
  };
};

const unauthorizedError = (message: string) => {
  return {
    status: 401,
    type: "unauthorized",
    message: message,
  };
};

export { conflictError, notFoundError, unauthorizedError };
