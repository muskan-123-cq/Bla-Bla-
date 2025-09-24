
function roleMiddleware(requiredRole) {
    return (req, res, next) => {
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ error: 'Access denied: You do not have permission to perform this action.your r nt a driver' });
        }
        next(); 
    };
}

module.exports = roleMiddleware;