import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('admin')
  async addAdmin(@Body() adminDto: SignupDto, @Req() req) {
    return this.authService.addAdmin(adminDto, req.user.id);
  }

  /**
   * Get all Admins (Only Super Admin)
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('admins')
  async getAllAdmins(@Req() req) {
    return this.authService.getAllAdmins();
  }

  /**
   * Get a single Admin by ID
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('admin/:id')
  async getAdminById(@Param('id') adminId: string) {
    return this.authService.getAdminById(adminId);
  }

  /**
   * Update an Admin (Only Super Admin)
   */
  @UseGuards(AuthGuard('jwt'))
  @Patch('admin/:id')
  async updateAdmin(
    @Param('id') adminId: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.authService.updateAdmin(adminId, updateAdminDto);
  }

  /**
   * Delete an Admin (Only Super Admin)
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete('admin/:id')
  async deleteAdmin(@Param('id') adminId: string) {
    return this.authService.deleteAdmin(adminId);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.sendOtp(email);
  }

  @Post('verify-otp')
  async verifyOtp(@Body('email') email: string, @Body('otp') otp: string) {
    return this.authService.verifyOtp(email, otp);
  }

  @Post('resend-otp')
  async resendOtp(@Body('email') email: string) {
    return this.authService.resendOtp(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Body('email') email: string,
    @Body('otp') otp: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.resetPassword(email, otp, newPassword);
  }
}
