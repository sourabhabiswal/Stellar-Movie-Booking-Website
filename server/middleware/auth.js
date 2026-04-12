import { clerkClient } from "@clerk/express";

// Protect regular users - checks if logged in
export const protect = async (req, res, next) => {
    try {
        const userId = req.auth().userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
};

// Protect admin routes - checks if user is admin
export const protectAdmin = async (req, res, next) => {
    try {
        const userId = req.auth().userId;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const user = await clerkClient.users.getUser(userId);
        if (user.privateMetadata?.role !== "admin") {
            return res.status(403).json({ success: false, message: "Admin access only" });
        }

        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: error.message });
    }
};