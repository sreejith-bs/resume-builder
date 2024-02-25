export function createResponse(params) {
    return {
      ...params
    };
}
  
export function createSuccessResponse(data, status = 'success') {
    /**
     * Creates a success response object.
     * @param {*} data - The data to be included in the success response.
     * @param {string} [message='Success'] - The success message.
     * @param {string} [status='success'] - The status of the success response.
     * @returns {Object} - The success response object containing status, message, and data.
    */
    return createResponse({status, data});
}
  
export function createErrorResponse(error, message, status = 'error') {
    /**
     * Creates a error response object.
     * @param {*} error - The error to be included in the error response.
     * @param {string} [message='Error'] - The error message.
     * @param {string} [status='error'] - The status of the error response.
     * @returns {Object} - The error response object containing status, message, and data.
    */
    return createResponse({error , status, message});
}