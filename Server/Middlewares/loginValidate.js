
exports.RoleValidate = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role; // Assuming the user's role is stored in req.user.role
        if (!roles.includes(userRole)) {
            return res.status(403).json({
                message: 'Access denied. You do not have the required role.',
                type_of_response: 'ERROR'
            });
        }
        next();
    };
}