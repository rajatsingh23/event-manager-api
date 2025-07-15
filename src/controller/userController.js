
import pool from "../config/db.js";
import { createUserService, getUserByIdService, listUserService } from "../models/userModel.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    })
}

export const createUser = async(req, res, next) => {
    const {name, email} = req.body;
    try{

        const newUser = await createUserService(name, email);
        return handleResponse(res, 201, "User Created Successfuly", newUser)
    }catch(err){
        next(err);
    }
}

export const getUserById = async(req, res, next) => {
    try{
        const user = await getUserByIdService(req.params.userId);
        return handleResponse(res, 200, "Event fetched Successfuly", user)
    }catch(err){
        next(err);
    }
}

export const listUsers = async(req, res, next) => {
    try{
        const listUser = await listUserService();
        return handleResponse(res, 200, "List of events", listUser);

    }catch(err){
        next(err);
    }
}



