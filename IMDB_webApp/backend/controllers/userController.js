const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // MySQL bağlantı dosyanız

exports.register = async (req, res) => {
    const { first_name, last_name, email, password, country, city } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (first_name, last_name, email, password, country, city) VALUES (?, ?, ?, ?, ?, ?)';
        await db.query(query, [first_name, last_name, email, hashedPassword, country, city]);
        res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const query = 'SELECT * FROM users WHERE email = ?';
        const [users] = await db.query(query, [email]);
        if (users.length === 0) {
            return res.status(404).send({ error: 'User not found' });
        }
        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).send({ error: 'Invalid password' });
        }
        const token = jwt.sign({ id: user.user_id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).send({ token, user });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
