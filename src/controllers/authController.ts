import { Request, Response } from 'express';
import AuthService from '../services/authService';

class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password, roleName } = req.body;
      const user = await AuthService.register(email, password, roleName);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);
      res.status(200).json({ token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }

  static async getRoles(req: Request, res: Response) {
    try {
      const roles = await AuthService.getRoles();
      res.status(200).json({ roles });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }
  }
}

export default AuthController;
