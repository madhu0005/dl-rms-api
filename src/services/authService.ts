// src/services/authService.ts
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import User from '../models/User';
import Role from '../models/Role';

class AuthService {
  static async register(email: string, password: string, roleName: string) {
    const role = await Role.findOne({ where: { name: roleName } });
    if (!role) throw new Error('Role not found');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, roleId: role.id });

    return user;
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user.id, roleId: user.roleId }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    return token;
  }

  static async getRoles() {
    const roles = await Role.findAll();
    return roles;
  }
}

export default AuthService;
