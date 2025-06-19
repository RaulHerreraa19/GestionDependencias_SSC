
exports.loginValidate = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'El correo y la contraseña son obligatorios',
            type_of_response: 'ERROR'
        });
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            message: 'El correo electrónico no es válido',
            type_of_response: 'ERROR'
        });
    }

    next();
}