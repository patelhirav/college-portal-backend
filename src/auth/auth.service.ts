import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as moment from 'moment';
import { MailerService } from '@nestjs-modules/mailer';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AuthService {
  addAdmin(adminDto: SignupDto, id: any) {
    throw new Error('Method not implemented.');
  }
  getAllAdmins() {
    throw new Error('Method not implemented.');
  }
  getAdminById(adminId: string) {
    throw new Error('Method not implemented.');
  }
  updateAdmin(adminId: string, updateAdminDto: UpdateAdminDto) {
    throw new Error('Method not implemented.');
  }
  deleteAdmin(adminId: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  /**
   * User, Admin, or SuperAdmin Login
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const superAdmin = await this.prisma.superAdmin.findUnique({
      where: { email },
    });
    if (superAdmin)
      return this.validateAndGenerateToken(superAdmin, password, 'SUPER_ADMIN');

    const admin = await this.prisma.admin.findUnique({ where: { email } });
    if (admin) return this.validateAndGenerateToken(admin, password, 'ADMIN');

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user) return this.validateAndGenerateToken(user, password, 'USER');

    throw new UnauthorizedException('Invalid credentials');
  }

  /**
   * Validate user password and generate JWT token
   */
  private async validateAndGenerateToken(user, password, role) {
    if (!user.password || !password) {
      throw new UnauthorizedException('Password is missing');
    }

    if (typeof user.password !== 'string' || typeof password !== 'string') {
      throw new UnauthorizedException('Invalid password format');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { id: user.id, email: user.email, role };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role,
      },
    };
  }

  /**
   * User Signup
   */
  async signup(signupDto: SignupDto) {
    const { name, email, password, branch, year, semester, enr_no } = signupDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser)
      throw new BadRequestException('User with this email already exists');

    const existingEnrNo = await this.prisma.user.findUnique({
      where: { enr_no },
    });
    if (existingEnrNo)
      throw new BadRequestException(
        'User with this enrollment number already exists',
      );

    if (!password || typeof password !== 'string') {
      throw new BadRequestException('Password must be a string');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        branch,
        year,
        semester,
        enr_no,
      },
    });

    return {
      message: 'Signup successful. You can now log in.',
      userId: user.id,
    };
  }
}
