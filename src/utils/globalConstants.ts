import path from "path";

globalThis.MONGO_URI = process.env.MONGO_URI;
globalThis.API_SENDGRIND = process.env.API_SENDGRIND;
globalThis.SECRET_KEY = process.env.SECRET_KEY;
globalThis.PORT = +(process.env.PORT ?? 3000);
globalThis.EMAIL_HOST = process.env.EMAIL_HOST;
globalThis.EMAIL_USERNAME = process.env.EMAIL_USERNAME;
globalThis.EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

globalThis.DEFAULT_LIMIT = 5;
globalThis.UPLOADS_FOLDER = "/uploads";
globalThis.UPLOADS_PATH = path.join(import.meta.dirname, "..", UPLOADS_FOLDER);
globalThis.MAX_UPLOAD_SIZE = 3 * 1024 * 1024;
globalThis.SUCCESS_MSG = "Operation done successfully";
globalThis.UNAUTH_ERR_MSG = "You must login first";
globalThis.FORBIDDEN_ERR_MSG = "You don't have permission to do this";
globalThis.SERVER_ERR_MSG = "Server Error";
globalThis.COMMON_FILED = "username fullname profilePicture";
