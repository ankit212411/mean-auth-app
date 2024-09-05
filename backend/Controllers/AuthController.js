const UserModel = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => { 
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'Email already exists. Please Login' });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({ message: 'User created successfully', success: true  });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error, success: false });
    }

}

const login = async (req, res) => { 
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(403).json({ message: 'User not found', success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password,);
        if (!isPassEqual) { 
            return res.status(403).json({ message: 'Invalid Credentials', success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SCERET,
            { expiresIn: '24h' }
        )
        res.status(200)
            .json({
                message: 'Login successful',
                success: true,
                jwtToken,
                email,
                name: user.name

            });
    } catch (error) {
        res.status(500).json({ message: 'Error while login', error: error, success: false });
    }

}

module.exports = {
    signup,
    login
}