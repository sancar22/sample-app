import * as dotenv from "dotenv";
import { Sequelize, Dialect } from "sequelize";
dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME ?? "my_db",
    process.env.DB_USER ?? "my_user",
    process.env.DB_PASSWORD ?? "",
    {
        host: process.env.DB_HOST ?? "localhost",
        dialect: (process.env.DB_DIALECT as Dialect) ?? "postgres",
        logging: true,
    }
);
