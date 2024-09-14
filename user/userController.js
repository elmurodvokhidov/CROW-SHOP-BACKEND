// const bcrypt = require('bcrypt');
// const User = require("./userModel");

// const clerkController = async (req, res) => {
//     const { event, user } = req.body;
//     try {
//         switch (event) {
//             case 'user.created': {
//                 const { id: clerkId, username, email_addresses, password } = user;
//                 const email_address = email_addresses?.[0]?.email_address || null;

//                 if (!username || !email_address || !password) {
//                     return res.status(400).send('Username, email, and password are required');
//                 }

//                 const isExistName = await User.findOne({ username });
//                 if (isExistName) {
//                     return res.status(409).send('This username is already taken');
//                 }

//                 const isExistEmail = await User.findOne({ email_address });
//                 if (isExistEmail) {
//                     return res.status(409).send('This email is already taken');
//                 }

//                 // Hash the password before saving
//                 const hashedPassword = await bcrypt.hash(password, 10);

//                 const newUser = new User({
//                     clerkId, 
//                     username,
//                     email_address,
//                     password: hashedPassword // Save hashed password
//                 });

//                 await newUser.save();
//                 console.log(`User ${clerkId} created in the database.`);
//                 break;
//             }
//             case 'user.updated': {
//                 const { id: clerkId, username, email_addresses, password } = user;
//                 const email_address = email_addresses?.[0]?.email_address || null;

//                 if (!clerkId) {
//                     return res.status(400).send('Clerk ID is required for user update');
//                 }

//                 // Prepare update data
//                 const updateData = { username, email_address };
                
//                 if (password) {
//                     // Hash the new password before updating
//                     updateData.password = await bcrypt.hash(password, 10);
//                 }

//                 const updatedUser = await User.findOneAndUpdate(
//                     { clerkId },
//                     updateData,
//                     { new: true, upsert: true }
//                 );

//                 if (!updatedUser) {
//                     return res.status(404).send('User not found for update');
//                 }

//                 console.log(`User ${clerkId} successfully updated.`);
//                 break;
//             }
//             case 'user.deleted': {
//                 const { id: clerkId } = user;

//                 if (!clerkId) {
//                     return res.status(400).send('Clerk ID is required for user deletion');
//                 }

//                 const deletedUser = await User.findOneAndDelete({ clerkId });

//                 if (!deletedUser) {
//                     return res.status(404).send('User not found for deletion');
//                 }

//                 console.log(`User ${clerkId} successfully deleted.`);
//                 break;
//             }
//             default: {
//                 console.warn(`Unknown event type: ${event}`);
//                 return res.status(400).send('Unknown event type');
//             }
//         }

//         res.status(200).send('Webhook processed successfully');
//     } catch (error) {
//         console.error('Error processing webhook:', error.message);
//         res.status(500).send('Error processing webhook');
//     }
// };

// module.exports = { clerkController };
