declare global {
  var MONGO_URI: string;
  var SECRET_KEY: string;
  var PORT: number;
  var EMAIL_HOST: string;
  var EMAIL_PASSWORD: string;
  var EMAIL_USERNAME: string;

  var DEFAULT_LIMIT: number;
  var UPLOADS_FOLDER: string;
  var UPLOADS_PATH: string;
  var MAX_UPLOAD_SIZE: number;
  var SUCCESS_MSG: string;
  var UNAUTH_ERR_MSG: string;
  var FORBIDDEN_ERR_MSG: string;
  var SERVER_ERR_MSG: string;

  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      SECRET_KEY: string;
      PORT: string;
      EMAIL_HOST: string;
      EMAIL_PASSWORD: string;
      EMAIL_USERNAME: string;
    }
  }

  namespace Express {
    interface Response {
      success(message?: string, body?: any, code?: number);
      fail(message?: string, code?: number, body?: any);
    }
  }
}
export {};
