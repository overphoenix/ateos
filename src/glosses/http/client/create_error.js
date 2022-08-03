const __ = ateos.getPrivate(ateos.http.client);

/**
 * Create an Error with the specified message, config, error code, and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
export default function createError(message, config, code, request, response) {
  const error = new Error(message);
  return __.enhanceError(error, config, code, request, response);
}
