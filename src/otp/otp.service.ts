import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class OtpService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
  ) {}

  /**
   * Send OTP
   */
  async sendOtp(dto: SendOtpDto) {
    const { email } = dto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = moment().add(5, 'minutes').toDate();

    await this.prisma.otp.upsert({
      where: { userId: user.id },
      update: { otp, expiresAt },
      create: { userId: user.id, otp, expiresAt },
    });

    await this.mailerService.sendMail({
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp}`,
    });

    return { message: 'OTP sent successfully' };
  }

  /**
   * Verify OTP
   */
  async verifyOtp(dto: VerifyOtpDto) {
    const { email, otp } = dto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    const otpRecord = await this.prisma.otp.findUnique({
      where: { userId: user.id },
    });
    if (!otpRecord || otpRecord.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (otpRecord.expiresAt < new Date()) {
      throw new BadRequestException('OTP expired');
    }

    return { message: 'OTP verified successfully' };
  }

  /**
   * Reset Password
   */
  async resetPassword(dto: ResetPasswordDto) {
    const { email, otp, newPassword } = dto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');

    const otpRecord = await this.prisma.otp.findUnique({
      where: { userId: user.id },
    });
    if (!otpRecord || otpRecord.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (otpRecord.expiresAt < new Date()) {
      throw new BadRequestException('OTP expired');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    await this.prisma.otp.delete({ where: { userId: user.id } });

    return { message: 'Password reset successfully' };
  }
}
