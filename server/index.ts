import dotenv from 'dotenv'
const { bootDB } = require('./models/index');
import { bootServer } from "./server";

dotenv.config();

const PORT: number = parseInt(process.env.PORT);
const connectionString: string = process.env.DB_CONN;

bootDB(connectionString);
bootServer(PORT);
