import dotenv from 'dotenv';

dotenv.config();

export const config = {
    __PROD__: process.env.NODE_ENV === 'production',
    __API__: process.env.REACT_APP_API_URL,
    __APP_NAME__: process.env.REACT_APP_WEBSITE_NAME,
    __REACT__PORT: process.env.REACT_PORT,
    __ROOT_FOLDER__: process.env.INIT_CWD as string,
    __REDIRECT_URL__: process.env.REACT_APP_REDIRECT_URL,
};
