import { cancelEventService, createEventService, getEventByIdService, listEventService, registerEventService, statsEventService } from "../models/eventModel.js";
import pool from "../config/db.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    })
}

export const createEvent = async(req, res, next) => {
    const {title, dateTime, location, capacity} = req.body;
    try{
        if(capacity < 1 || capacity > 1000) return handleResponse(res, 400, "Invalid Capacity");

        const newEvent = await createEventService(title, dateTime, location, capacity);
        return handleResponse(res, 201, "Event Created Successfuly", {id: newEvent.id})
    }catch(err){
        next(err);
    }
}

export const getEventById = async(req, res, next) => {
    try{
        const event = await getEventByIdService(req.params.eventId);
        return handleResponse(res, 200, "Event fetched Successfuly", event)
    }catch(err){
        next(err);
    }
}

export const registerEvent = async(req, res, next) => {
    try{
        const {userId} = req.body;
        const eventId = req.params.eventId;
        const event = await getEventByIdService(eventId); 

        //if event is in past
        if(new Date(event.dateTime) < new Date()){
            return handleResponse(res, 400, "Cannot register for past events")
        }

        //if event is full
        const registrationCount = await pool.query("SELECT COUNT(*) FROM registrations WHERE event_id = $1", [eventId]);
        const totalRegistered = parseInt(registrationCount.rows[0].count);
        if(totalRegistered === capacity){
            return handleResponse(res, 400, "Event is full")
        }

        //if it's duplicate registration
        const alreadyRegistered = await pool.query("SELECT 1 FROM registrations WHERE user_id = $1 AND event_id = $2", [userId, eventId]);
        if(alreadyRegistered.rowCount>0) return handleResponse(res, 400, "User already registered");


        const registration = await registerEventService(userId, eventId);
        return handleResponse(res, 200, "User Registered Successfully", registration)
        
    }catch(err){
        next(err);
    }
}

export const cancelEvent = async(req, res, next) => {
    try{
        const {userId} = req.body;
        const eventId = req.params.eventId;

        //If user is not registered
        const isRegistered = await pool.query("SELECT 1 FROM registrations WHERE event_id = $1 AND user_id = $2", [eventId, userId])
        if(isRegistered.rowCount === 0) return handleResponse(res, 400, "User is not registered for this event");

        const cancel = await cancelEventService(userId, eventId);
        return handleResponse(res, 200, "Event cancelled successfully", cancel)
    }catch(err){
        next(err);
    }

}

export const listEvents = async(req, res, next) => {
    try{
        const list = await listEventService();
        return handleResponse(res, 200, "List of events", list);

    }catch(err){
        next(err);
    }
}

export const statsEvent = async(req, res, next) => {
    try{
        const eventId = req.params.eventId;
        const stats = await statsEventService(eventId);
        return handleResponse(res, 200, "Event Stats", stats)

    }catch(err){
        next(err);
    }
    
    
}

