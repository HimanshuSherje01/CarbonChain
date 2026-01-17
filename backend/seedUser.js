import User from "./models/User.js";
import connectDB from "./config/db.js";

connectDB();

const dummyUser = new User({
    name: "Himanshu Sherje",
    email: "himanshu@example.com",
    password: "password123",
    role: "admin",
    isApproved: true,
});


const seed = async () => {
    try {
        await dummyUser.save();
        console.log("User created successfully");
        process.exit(0);
    } catch (error) {
        if (error.code === 11000) {
            console.log("User already exists");
            process.exit(0);
        }
        console.error("Error creating user:", error);
        process.exit(1);
    }
};

seed();