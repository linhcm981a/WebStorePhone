import User from '../user/models.js'
import hashPassword from '../services/bcrypt.js';
import {isValidEmail,isValidUsername } from '../services/validation.js';

const createNewUser = async (req, res) => {
    try {
      const { username, password, email } = req.body;
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
  
      if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
      }
  
      if (!isValidUsername(username)) {
        return res.status(400).json({ message: 'Invalid username' });
      }
  
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      const hashedPassword = await hashPassword(password);
  
      const user = new User({
        username,
        password: hashedPassword,
        email,
      });
      
      await user.save();
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create user' });
    }
  };
  

export default createNewUser;
