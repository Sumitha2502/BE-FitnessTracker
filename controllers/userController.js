// import the user model
const User = require('../models/user');
const config = require('../utils/config');
// import the bcrypt library
const bcrypt = require('bcrypt');

// import the jsonwebtoken library
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const Nutrition = require('../models/Nutrition');
const Goals = require('../models/Goals');
const sleepPatterns = require('../models/sleepPatterns');

// define the user controller
const userController = {
    // define the register method
    register: async (request, response) => {
        try {
            // get the user inputs from the request body
            const { username, password, name, location } = request.body;

            // check if the username already exists
            const user = await User.findOne({ username });

            // if the username exists, return an error message
            if (user) {
                return response.status(400).json({ message: 'User already exists' });
            }

            // hash the password
            const passwordHash = await bcrypt.hash(password, 10);

            // create a new user
            const newUser = new User({
                username,
                passwordHash,
                name,
                location
            });

            // save the user
            const savedUser = await newUser.save();

            // return a success message with the saved user
            response.status(201).json({ message: 'User created successfully', user: savedUser });

            // response.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    login: async (request, response) => {
        try {
            // get the username and password from the request body
            const { username, password } = request.body;

            // check if the user exists in the database
            const user = await User.findOne({ username });

            // if the user does not exist, return an error message
            if (!user) {
                return response.status(400).json({ message: 'user not found' });
            }

            // if the user exists, compare the password and check if it is correct
            const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

            // if the password is incorrect, return an error message
            if (!isPasswordCorrect) {
                return response.status(400).json({ message: 'incorrect password' });
            }

            // if the password is correct, generate a token for the user and return it in the response along the success message
            const token = jwt.sign({
                username: user.username,
                id: user._id,
                name: user.name,
            }, JWT_SECRET);

            // set a cookie with the token
            response.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours expiration
            });

            response.status(200).json({ message: 'login successful', token });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    // get the current logged in user
    me: async (request, response) => {
        try {
            // get the user id from the request object
            const userId = request.userId;

            // find the user by id from the database
            const user = await User.findById(userId).select('-passwordHash -__v -_id');

            // if the user does not exist, return an error message
            if (!user) {
                return response.status(400).json({ message: 'user not found' });
            }

            // return the user details
            response.status(200).json({ user });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    // update the user details
    update: async (request, response) => {
        try {
            // get the user id from the request object
            const userId = request.userId;

            // get the user inputs from the request body
            const { name, location } = request.body;

            // find the user by id from the database
            const user = await User.findById(userId);

            // if the user does not exist, return an error message
            if (!user) {
                return response.status(400).json({ message: 'user not found' });
            }

            // update the user details
            if (name) user.name = name;
            if (location) user.location = location;

            // save the user
            const updatedUser = await user.save();

            // return a success message with the updated user
            response.status(200).json({ message: 'user updated successfully', user: updatedUser });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    // delete the user
    delete: async (request, response) => {
        try {
            // get the user id from the request object
            const userId = request.userId;

            // delete the user from the database
            const deletedUser = await User.findByIdAndDelete(userId);

            // if the user does not exist, return an error message
            if (!deletedUser) {
                return response.status(400).json({ message: 'user not found' });
            }

            // return a success message
            response.status(200).json({ message: 'user deleted successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    // logout the user
    logout: async (request, response) => {
        try {
            // clear the token cookie
            response.clearCookie('token');

            // return a success message
            response.status(200).json({ message: 'logout successful' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    // get all users
    getAllUsers: async (request, response) => {
        try {
            // get all users from the database
            const users = await User.find().select('-passwordHash -__v');

            // return the users
            response.status(200).json({ users });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    // get a user by id
    getUserById: async (request, response) => {
        try {
            // get the user id from the request parameters
            const userId = request.params.id;

            // find the user by id from the database
            const user = await User.findById(userId).select('-passwordHash -__v');

            // if the user does not exist, return an error message
            if (!user) {
                return response.status(400).json({ message: 'user not found' });
            }

            // return the user
            response.status(200).json({ user });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    // update the user by id
    updateUserById: async (request, response) => {
        try {
            // get the user id from the request parameters
            const userId = request.params.id;

            // get the user inputs from the request body
            const { name, location } = request.body;

            // find the user by id from the database
            const user = await User.findById(userId);

            // if the user does not exist, return an error message
            if (!user) {
                return response.status(400).json({ message: 'user not found' });
            }

            // update the user details
            if (name) user.name = name;
            if (location) user.location = location;

            // save the user
            const updatedUser = await user.save();

            // return a success message with the updated user
            response.status(200).json({ message: 'user updated successfully', user: updatedUser });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    // delete the user by id
    deleteUserById: async (request, response) => {
        try {
            // get the user id from the request parameters
            const userId = request.params.id;

            // delete the user from the database
            const deletedUser = await User.findByIdAndDelete(userId);

            // if the user does not exist, return an error message
            if (!deletedUser) {
                return response.status(400).json({ message: 'user not found' });
            }

            // return a success message
            response.status(200).json({ message: 'user deleted successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },


    // define the nutrtion method
    Nutrition: async (request, response) => {
        try {
            // get the user inputs from the request body
            const { date, calories, carbs, protein, fat, water } = request.body;

            // check if the username already exists
            const user = await User.findOne({ date });

            // if the username exists, return an error message
            if (user) {
                return response.status(400).json({ message: 'User already exists' });
            }

            // hash the password
            const passwordHash = await bcrypt.hash(password, 10);

            // create a new user
            const newUser = new User({
                date, calories, carbs, protein, fat, water
            });

            // save the user
            const savedUser = await newUser.save();

            // return a success message with the saved user
            response.status(201).json({ message: 'User created successfully', user: savedUser });

            // response.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },

    Goals: async (request, response) => {
        try {
            // get the user inputs from the request body
            const { title, description, targetDate } = request.body;

            // check if the username already exists
            const user = await User.findOne({ title });

            // if the username exists, return an error message
            if (user) {
                return response.status(400).json({ message: 'User already exists' });
            }

            // hash the password
            const passwordHash = await bcrypt.hash(password, 10);

            // create a new user
            const newUser = new User({
                title, description, targetDate
            });

            // save the user
            const savedUser = await newUser.save();

            // return a success message with the saved user
            response.status(201).json({ message: 'User created successfully', user: savedUser });

            // response.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    },
    sleepPatterns: async (request, response) => {
        try {
            // get the user inputs from the request body
            const { date, duration, quality } = request.body;

            // check if the username already exists
            const user = await User.findOne({ date });

            // if the username exists, return an error message
            if (user) {
                return response.status(400).json({ message: 'User already exists' });
            }

            // hash the password
            const passwordHash = await bcrypt.hash(password, 10);

            // create a new user
            const newUser = new User({
                date, duration, quality
            });

            // save the user
            const savedUser = await newUser.save();

            // return a success message with the saved user
            response.status(201).json({ message: 'User created successfully', user: savedUser });

            // response.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            response.status(500).json({ message: error.message });
        }
    }

}
// export the controller
module.exports = userController;