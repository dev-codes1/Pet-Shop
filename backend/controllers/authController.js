const bcrypt = require('bcrypt');
const User = require('../models/user');

// Registro
exports.registerUser = async (req, res) => {
    try {
    const { username, email, password } = req.body;

    // Validar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
    }
};

// Login
exports.loginUser = async (req, res) => {
    try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
    }
};
