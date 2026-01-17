import supabase from "../config/supabase.js";

// Register Logic
export const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { role: role || 'user' } // Default role if not provided
            }
        });

        if (error) {
            return res.status(400).json({ success: false, message: error.message });
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
            return res.status(401).json({ success: false, message: error.message });
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
