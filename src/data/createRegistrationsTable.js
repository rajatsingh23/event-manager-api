import pool from "../config/db.js";

const createRegistrationsTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS registrations (
            user_id INTEGER NOT NULL,
            event_id INTEGER NOT NULL,
            PRIMARY KEY (user_id, event_id)
        )
    `;
    try{
        pool.query(queryText);
        console.log("Registrations table created")
    }catch(err){
        console.log("Error creating registrations table: ", err);
    }
};
export default createRegistrationsTable;