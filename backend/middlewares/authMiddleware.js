import supabase from "../config/supabase.js";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = data.user; // Supabase user

    // Fetch Mongo User
    // Try by supabaseId first, then email
    let mongoUser = await User.findOne({ supabaseId: data.user.id });
    if (!mongoUser && data.user.email) {
      mongoUser = await User.findOne({ email: data.user.email });
    }

    if (!mongoUser) {
      // Optional: Auto-create if not found (lazy sync), 
      // OR return 401 if we enforce sync logic strictly. 
      // For now, let's allow it but warn, or strictly require it for project creation.
      // Let's create it if missing to be safe (lazy sync)
      try {
        mongoUser = new User({
          email: data.user.email,
          name: data.user.user_metadata?.name || data.user.email.split('@')[0],
          supabaseId: data.user.id,
          role: data.user.user_metadata?.role || 'user',
        });
        await mongoUser.save();
      } catch (e) {
        console.error("Failed to lazy-create mongo user", e);
        return res.status(500).json({ message: "User sync error" });
      }
    }

    req.mongoUser = mongoUser;

    next();
  } catch (err) {
    res.status(500).json({ message: "Auth middleware failed" });
  }
};

export default authMiddleware;
