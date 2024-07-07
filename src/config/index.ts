import dotenv from 'dotenv';
import path from 'path';

// .env connection
dotenv.config({ path: path.join((process.cwd(), '.env')) });

// env variables
export default {
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    databaseUrl: process.env.DATABASE_URL,
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET,
    bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
    superAdminPassword: process.env.SUPER_ADMIN_PASSWORD,
    superAdminLimit: process.env.SUPER_ADMIN_LIMIT,
};
