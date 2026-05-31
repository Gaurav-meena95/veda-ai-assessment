import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'VedaAI_Secret_Key_2026';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, school, role } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ error: 'Please supply a name, email, and password.' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ error: 'Password must be at least 6 characters long.' });
      return;
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'A user with this email address already exists.' });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // List of pastel colors for avatars
    const avatarColors = ['#FFE2D2', '#E8F5E9', '#E3F2FD', '#F3E5F5', '#FFF3E0', '#E0F2F1'];
    const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      school: school || 'Delhi Public School, Bokaro Steel City',
      role: role || 'Educator',
      avatarColor: randomColor
    });

    const savedUser = await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { id: savedUser._id, email: savedUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        school: savedUser.school,
        avatarColor: savedUser.avatarColor
      },
      message: 'Account created successfully.'
    });
  } catch (error) {
    console.error('[VedaAI AuthController] Register Error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : String(error)
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Please supply both email and password.' });
      return;
    }

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password || '');
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid email or password.' });
      return;
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        school: user.school,
        avatarColor: user.avatarColor
      },
      message: 'Logged in successfully.'
    });
  } catch (error) {
    console.error('[VedaAI AuthController] Login Error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : String(error)
    });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized. No authorization token supplied.' });
      return;
    }

    const token = authHeader.split(' ')[1];
    
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      res.status(401).json({ error: 'Unauthorized. Invalid or expired token.' });
      return;
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      school: user.school,
      avatarColor: user.avatarColor
    });
  } catch (error) {
    console.error('[VedaAI AuthController] getMe Error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : String(error)
    });
  }
};

export const authController = {
  register,
  login,
  getMe
};

export default authController;
