import path from "path";

globalThis.MONGO_URI = process.env.MONGO_URI;
globalThis.SECRET_KEY = process.env.SECRET_KEY;
globalThis.PORT = +(process.env.PORT ?? 3000);

globalThis.DEFAULT_LIMIT = 5;
globalThis.UPLOADS_FOLDER = "/uploads";
globalThis.UPLOADS_PATH = path.join(import.meta.dirname, "..", UPLOADS_FOLDER);
globalThis.MAX_UPLOAD_SIZE = 3 * 1024 * 1024;
globalThis.SUCCESS_MSG = "Operation done successfully";
globalThis.UNAUTH_ERR_MSG = "You must login first";
globalThis.FORBIDDEN_ERR_MSG = "You don't have permission to do this";
globalThis.SERVER_ERR_MSG = "Server Error";
