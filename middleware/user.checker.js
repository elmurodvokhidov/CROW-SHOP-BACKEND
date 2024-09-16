const Clerk = require('@clerk/clerk-sdk-node');

Clerk.configure({ apiKey: process.env.CLERK_API_KEY });

async function authenticationUser(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

        if (!token) return res.status(401).send("Token mavjud emas!");

        // Verify the Clerk session token
        const session = await Clerk.sessions.verifySessionToken(token);

        if (!session) {
            return res.status(403).send("Yaroqsiz token!");
        }

        // Add session data to request
        req.authId = session.id;
        // req.authRole = session.publicMetadata?.role; // Example for adding custom role, adjust according to your setup

        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        res.status(403).send("Yaroqsiz token!");
    }
}

module.exports = authenticationUser;
