import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/User.js';
import { loginSchema, registerSchema } from '../validators/authValidator.js';

function signAuthToken(user) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );
}

function buildValidationError(res, zodError) {
  const fieldErrors = zodError.flatten().fieldErrors;
  const firstMessage =
    Object.values(fieldErrors).flat()[0] || 'Please check the submitted fields.';

  return res.status(400).json({
    success: false,
    message: firstMessage,
    errors: fieldErrors,
  });
}

/**
 * POST /api/auth/register
 * Registers a new user. The first account created becomes 'commander'; subsequent accounts default to 'operator'.
 */
export async function register(req, res, next) {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return buildValidationError(res, parsed.error);
    }

    const { name, username, email, password } = parsed.data;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      const conflictField =
        existingUser.email === email ? 'An account with this email already exists.' : 'This username is already taken.';
      return res.status(409).json({
        success: false,
        message: conflictField,
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const existingCount = await User.countDocuments();
    const role = existingCount === 0 ? 'commander' : 'operator';

    const user = await User.create({
      name,
      username,
      email,
      passwordHash,
      role,
    });

    const token = signAuthToken(user);

    return res.status(201).json({
      success: true,
      message: 'Account created successfully.',
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'An account with that email or username already exists.',
      });
    }
    return next(error);
  }
}

/**
 * POST /api/auth/login
 * Authenticates a user by email or username and returns a signed JWT.
 */
export async function login(req, res, next) {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return buildValidationError(res, parsed.error);
    }

    const { identifier, password } = parsed.data;
    const normalizedIdentifier = identifier.toLowerCase();

    const user = await User.findOne({
      $or: [{ email: normalizedIdentifier }, { username: normalizedIdentifier }],
    }).select('+passwordHash');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email/username or password.',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email/username or password.',
      });
    }

    const token = signAuthToken(user);

    return res.status(200).json({
      success: true,
      message: 'Signed in successfully.',
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    return next(error);
  }
}

/**
 * GET /api/auth/me
 * Returns the authenticated user profile.
 */
export async function getMe(req, res) {
  return res.status(200).json({
    success: true,
    user: req.user.toJSON(),
  });
}

/**
 * POST /api/auth/logout
 * Stateless JWT logout acknowledgement; client clears stored token.
 */
export async function logout(_req, res) {
  return res.status(200).json({
    success: true,
    message: 'Signed out successfully.',
  });
}
