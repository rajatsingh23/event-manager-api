import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js"
import eventRoutes from './routes/eventRoutes.js';
import userRoutes from './routes/userRoutes.js'
import errorHandling from "./middleware/errorHandles.js";
import createEventsTable from "./data/createEventTable.js";
import createRegistrationsTable from "./data/createRegistrationsTable.js";
import createUsersTable from "./data/createUserTable.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

//Create table
createEventsTable();
createRegistrationsTable();
createUsersTable();

//Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/api", eventRoutes);
app.use("/api", userRoutes);

//Error Handling Middlesware
app.use(errorHandling);



//POSTGRES CONNECTION

app.get("/", async(req, res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is ${result.rows[0].current_database}`)
})

//Server Running
app.listen(port, () =>{
    console.log(`Server is running on the port ${[port]}`)
})