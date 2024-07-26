



export default {
    dbuser: process.env.DB_USER || "root",
    dbpassword: process.env.DB_PASSWORD || 'root',
    dbhost: process.env.DB_HOST || "localhost",
    dbport: process.env.DB_PORT || "3306",
    dbname: process.env.DB_NAME || "parqueadero",
}