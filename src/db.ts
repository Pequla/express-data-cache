import dotenv from "dotenv"
import { DataSource } from "typeorm";
import { Data } from "./entities/Data";
import { Access } from "./entities/Access";

// Connecting to database
dotenv.config();
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: Number.parseInt(process.env.DATABASE_PORT!),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
        Data, Access
    ],
    logging: false,
})