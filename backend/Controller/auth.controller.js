import supabase from "../config/supabase.js";
import User from "../models/User.js";

// Register Logic
export const register = async (req, res) => {
    try {
        const { email, password, role, name } = req.body;

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { role: role || 'user', name } // Store name in metadata
            }
        });

        if (error) {
            console.error("Supabase Register Error:", error);
            return res.status(400).json({ success: false, message: error.message, details: error });
        }

        // Sync with MongoDB
        if (data.user) {
            try {
                let user = await User.findOne({ email });
                if (!user) {
                    user = new User({
                        email,
                        name: name || email.split('@')[0],
                        supabaseId: data.user.id,
                        role: role || 'user',
                        // password is optional now
                    });
                    await user.save();
                }
            } catch (dbError) {
                console.error("MongoDB Sync Error:", dbError);
                // Continue even if sync fails? Ideally we should rollback or retry.
                // For now logging it.
            }
        }

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: data.user,
            session: data.session
        });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Login Logic
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.error("Supabase Login Error:", error);
            return res.status(401).json({ success: false, message: error.message, details: error });
        }

        // Sync with MongoDB (ensure user exists)
        if (data.user) {
            try {
                let user = await User.findOne({ email });
                if (!user) {
                    // If user doesn't exist in Mongo (maybe created directly in Supabase), create it
                    user = new User({
                        email,
                        name: data.user.user_metadata?.name || email.split('@')[0],
                        supabaseId: data.user.id,
                        role: data.user.user_metadata?.role || 'user',
                    });
                    await user.save();
                } else if (!user.supabaseId) {
                    // Link existing mongo user to supabase id
                    user.supabaseId = data.user.id;
                    await user.save();
                }
            } catch (dbError) {
                console.error("MongoDB Sync Error:", dbError);
            }
        }

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: data.user,
            session: data.session
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Logout Logic
export const logout = async (req, res) => {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            return res.status(500).json({ success: false, message: error.message });
        }

        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Get Profile (from token)
export const getProfile = async (req, res) => {
    try {
        const user = req.user; // Set by authMiddleware

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
