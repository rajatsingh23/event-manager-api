
import pool from "../config/db.js";

export const getEventByIdService = async (eventId) => {
    const result = await pool.query("SELECT * FROM events where id = $1",[eventId]);
    const event = result.rows[0];
    const users = await pool.query("SELECT users.id, users.name, users.email FROM users JOIN registrations ON users.id = registrations.user_id WHERE registrations.event_id = $1", [eventId])

    return {
        ...event,
        registeredUsers : users.rows
    };
};

export const createEventService = async (title, dateTime, location, capacity) => {
    const result = await pool.query("INSERT INTO events (title, dateTime, location, capacity) VALUES ($1, $2, $3, $4) RETURNING *", [title, dateTime, location, capacity])
    return result.rows[0];
};

export const registerEventService = async (userId, eventId) => {
    const result = await pool.query("INSERT INTO registrations (event_id, user_id) VALUES ($1, $2) RETURNING *", [eventId, userId])
    return result.rows[0];
};



export const cancelEventService = async (userId, eventId) => {
    const result = await pool.query("DELETE FROM registrations WHERE event_id = $1 AND user_id = $2 RETURNING *", [eventId, userId])
    return result.rows[0];
};

export const listEventService = async () => {
    const result = await pool.query("SELECT * FROM events WHERE datetime > NOW() ORDER BY datetime ASC, location ASC");
    return result.rows;
};

export const statsEventService = async (eventId) => {
    const total = await pool.query("SELECT COUNT(*) FROM registrations WHERE event_id = $1", [eventId]);
    const capacityResult = await pool.query("SELECT capacity FROM events WHERE id = $1", [eventId]);

    const totalRegistered = parseInt(total.rows[0].count);
    const capacity = capacityResult.rows[0].capacity;
    const remainingCapacity = capacity - totalRegistered;
    const percentageCapacity = ((totalRegistered / capacity) * 100).toFixed(2);

    return {
        totalRegistrations: totalRegistered,
        remainingCapacity: remainingCapacity,
        percentageOfCapacityUsed: `${percentageCapacity}%`
    }

};