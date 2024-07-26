import { createPool } from "mysql2/promise.js";
import config from './config.js'



export const pool = createPool({
    host: config.dbhost,
    user: config.dbuser,
    password: config.dbpassword,
    database: config.dbname,
    port: config.dbport
})