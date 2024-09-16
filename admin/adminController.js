const jwt = require("jsonwebtoken");
const Admin = require("./adminModel");
const bcrypt = require('bcrypt');

// const signupFunc = async (req, res) => {
//     try {
//         const { fullname, phoneNumber, email, password } = req.body;

//         // Check if phone number or email already exists
//         const isPhoneExist = await Admin.findOne({ phoneNumber });
//         if (isPhoneExist) return res.status(400).send("This phone number has been used");

//         const isEmailExist = await Admin.findOne({ email });
//         if (isEmailExist) return res.status(400).send("This email has been used");

//         // Hash the password before saving
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         const newAuth = await Admin.create({
//             fullname,
//             phoneNumber,
//             email,
//             password: hashedPassword,
//         });

//         // Generate a JWT token
//         const token = jwt.sign({ id: newAuth._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30d' });

//         res.status(201).json({ data: newAuth, token, message: "Successfully signed up!" });
//     } catch (error) {
//         console.log("Error while signing up in backend", error);
//         res.status(500).json({ error: error.message });
//     }
// };
const signinFunc = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        // Find the admin by phone number
        const admin = await Admin.findOne({ phoneNumber });
        if (!admin) return res.status(404).send("This number doesn't exist");

        // Verify password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).send("Invalid credentials");

        // Generate JWT token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY);

        res.status(200).json({ data: admin, token });
    } catch (error) {
        console.log("Error while signing in in backend", error);
        res.status(500).json(error);
    }
};
const updateAdminFunc = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        if (password) {
            // Hash the password if it's being updated
            req.body.password = await bcrypt.hash(password, 10);
        }

        const updateadmin = await Admin.findByIdAndUpdate(id, req.body, { new: true });
        if (!updateadmin) return res.status(404).send("Sorry, info didn't match!");

        res.status(200).json({ data: updateadmin });
    } catch (error) {
        console.log("Error while updating admin in backend:", error);
        res.status(500).json({ error: error.message });
    }
};
const getMe = async (req, res) => {
    try {
        // req.user should be set by your authentication middleware
        const user = req.user;
        
        // Make sure the user object is available
        if (!user) {
            return res.status(401).send("Not authenticated");
        }
        
        // Exclude sensitive information if needed
        const sanitizedUser = {
            _id: user._id,
            username: user.username,
            email: user.email,
            // Add other fields as necessary
        };

        res.status(200).json(sanitizedUser);
    } catch (error) {
        console.log("Error while getting user in backend", error);
        res.status(500).json({ error: error.message });
    }
};
const getAdminFunc = async (req, res) => {
    try {
        const id = req.params.id;
        const admin = await Admin.findById(id).select('-password'); // Exclude password field
        if (!admin) return res.status(404).send("There is no such admin!");
        res.status(200).send(admin);
    } catch (error) {
        console.log("Error while getting admin in backend", error);
        res.status(500).json({ error: error.message });
    }
};
const getAllAdminsFunc = async (req, res) => {
    try {
        const admins = await Admin.find().select('-password'); // Exclude password field
        if (admins.length === 0) {
            return res.status(404).send("There are no admins yet.");
        }
        res.status(200).json({ data: admins });
    } catch (error) {
        console.log("Error while getting all admins in backend:", error);
        res.status(500).json({ error: error.message });
    }
};
const deleteAdminFunc = async (req, res) => {
    try {
        const { id } = req.params;

        // Attempt to find and delete the admin by ID
        const deleteadmin = await Admin.findByIdAndDelete(id);
        
        // If no admin is found or deleted, send a 404 response
        if (!deleteadmin) return res.status(404).send("admin not found or could not be deleted.");

        // Send a success response
        res.status(200).send("admin successfully deleted.");
    } catch (error) {
        // Log the error and send a 500 response
        console.log("Error while deleting admin in backend:", error);
        res.status(500).json({ error: error.message });
    }
};
module.exports = 
    {
    signinFunc, 
    updateAdminFunc,
    getAdminFunc,
    getAllAdminsFunc,
    deleteAdminFunc,
    getMe
}