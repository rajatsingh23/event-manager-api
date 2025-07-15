import express from "express"
import { cancelEvent, createEvent, getEventById, listEvents, registerEvent, statsEvent } from "../controller/eventController.js";

const router = express.Router();

router.post("/event", createEvent);
router.get("/event/list", listEvents);
router.get("/event/:eventId", getEventById);
router.post("/event/:eventId/register", registerEvent);
router.delete("/event/:eventId/cancel", cancelEvent);
router.get("/event/:eventId/stats", statsEvent);


export default router;