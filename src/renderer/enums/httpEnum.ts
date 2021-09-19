/**
 * @description: Request result set
 */
export enum ResultEnum {
  SUCCESS = 0,
  ERROR = 1,
  TIMEOUT = 401,
  TYPE = 'success',
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description:  contentTyp
 */
export enum ContentTypeEnum {
  JSON = 'application/json;charset=UTF-8',
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
