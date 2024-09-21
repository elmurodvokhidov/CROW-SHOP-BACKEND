const { sessions } = require('@clerk/clerk-sdk-node'); 

async function authenticationUser(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).send("Token mavjud emas!");

        const session = await sessions.verifySessionToken(token);

        if (!session){ return res.status(403).send("Yaroqsiz token!");}

        req.authId = session.id;
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(403).send("Yaroqsiz token!");
    }
}

module.exports = authenticationUser;