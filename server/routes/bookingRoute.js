import express from "express";
import { requireAuth } from "@clerk/express";


import { createBooking, getOccupiedSeats } from '../controllers/bookingController.js';

const bookingRoutes= express.Router()


bookingRoutes.post("/", requireAuth(), createBooking)

bookingRoutes.get("/seats/:showId", getOccupiedSeats)


export default bookingRoutes;