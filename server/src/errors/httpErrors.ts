const conflictError = (message: string) => {
  return {
    status: 409,
    type: 'conflict',
    message,
  }
}

const notFoundError = (message: string) => {
  return {
    status: 404,
    type: 'not found',
    message,
  }
}

const unauthorizedError = (message: string) => {
  return {
    status: 401,
    type: 'unauthorized',
    message,
  }
}

const forbiddenError = (message: string) => {
  return {
    status: 403,
    type: 'forbidden',
    message,
  }
}

export { conflictError, notFoundError, unauthorizedError, forbiddenError }
