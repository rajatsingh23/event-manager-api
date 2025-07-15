import pool from "../config/db.js";

const createUsersTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    try{
        pool.query(queryText);
        console.log("Users table created")
    }catch(err){
        console.log("Error creating users table: ", err);
    }
};
export default createUsersTable;