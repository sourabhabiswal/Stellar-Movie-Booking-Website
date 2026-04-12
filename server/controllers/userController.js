import { clerkClient } from "@clerk/express";
import { Booking } from "../models/Booking.js";
import Movie from "../models/Movie.js";

// API controller function to get user Bookings
export const getUserBookings = async (req, res) => {
    try {
        const userId = req.auth().userId;  // ✅ fixed: was req.auth().userId assigned to 'user'

        const bookings = await Booking.find({ user: userId }).populate({
            path: "show",
            populate: { path: "movie" }
        }).sort({ createdAt: -1 });  // ✅ fixed: was "createAt" (typo)

        res.json({ success: true, bookings });  // ✅ fixed: was "sucess" + "True"
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}

// API controller Function to update Favorite Movie in clerk user metadata
export const updateFavorite = async (req, res) => {
    try {
        const { movieId } = req.body;
        const userId = req.auth().userId;  // ✅ fixed: was destructuring wrongly { userId } = req.auth().userId

        const user = await clerkClient.users.getUser(userId);

        let favorites = user.privateMetadata.favorites || [];  // ✅ fixed: consistent casing

        if (!favorites.includes(movieId)) {
            favorites.push(movieId);        // add if not present
        } else {
            favorites = favorites.filter(item => item !== movieId);  // remove if already present
        }

        await clerkClient.users.updateUser(userId, {
            privateMetadata: { ...user.privateMetadata, favorites }
        });

        res.json({ success: true, message: "Favorites updated" });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}

// API controller function to get Favorite Movies
export const getFavorites = async (req, res) => {  // ✅ fixed: was arrow func with () instead of {}
    try {
        const user = await clerkClient.users.getUser(req.auth().userId);  // ✅ fixed: was "clerkclient" (wrong case)
        const favorites = user.privateMetadata.favorites || [];  // ✅ fixed: was "getUser" instead of "favorites"

        // get movies from database
        const movies = await Movie.find({ _id: { $in: favorites } });  // ✅ fixed: was "Movies" (wrong name)
        res.json({ success: true, movies });
    } catch (error) {
        console.error(error.message);
        res.json({ success: false, message: error.message });
    }
}