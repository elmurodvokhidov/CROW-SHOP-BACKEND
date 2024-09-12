const User = require("./userModel");

const createUser = async (req, res) => {
    try {
        if (!req.auth || !req.auth.user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }          
        const user = req.auth.user;
        const newUser = await User.create(user);

        res.json({ newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error while cheking authorization', error });
    }
};

module.exports = { createUser }