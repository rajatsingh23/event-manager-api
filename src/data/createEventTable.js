import pool from "../config/db.js";

const createEventsTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        dateTime TIMESTAMP NOT NULL,
        location VARCHAR(100) NOT NULL,
        capacity INTEGER NOT NULL CHECK (capacity > 0 AND capacity <= 1000)
        )
    `;
    try{
        pool.query(queryText);
        console.log("Event table created")
    }catch(err){
        console.log("Error creating events table: ", err);
    }
};
export default createEventsTable;