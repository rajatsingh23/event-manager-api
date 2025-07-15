////userModel is not mention in the question. Making it for testing purposes
import pool from "../config/db.js";

export const getUserByIdService = async (userId) => {
    const result = await pool.query("SELECT * FROM users where id = $1",[userId]);
    return result.rows[0];
};


export const createUserService = async (userName, email) => {
    const result = await pool.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", [userName, email]);
    return result.rows[0];
};

export const listUserService = async () => {
    const result = await pool.query("SELECT * FROM users ");
    return result.rows;
};