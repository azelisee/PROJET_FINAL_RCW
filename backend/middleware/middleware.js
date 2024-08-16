const jwt = require('jsonwebtoken');

const checkRole = (roles) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(403).json({ message: "Access forbidden: No token provided" });
            }
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            console.log("\nDecoded Token:", decoded);

            const userRole = decoded.role || decoded.title;
            console.log("User Role from Token:", userRole);

            if (roles.includes(userRole)) {
                console.log('Success : Access granted !!!');
                return next();
            }
            console.log('Access forbidden: Insufficient permissions');
            return res.status(403).json({ message: "Access forbidden: Insufficient permissions" });
        } catch (error) {
            console.error("Error in checkRole middleware:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
};

module.exports = checkRole;
