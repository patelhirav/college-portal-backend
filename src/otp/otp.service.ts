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
   * Send OTP for any role (User, Admin, SuperAdmin)
   */
  async sendOtp(dto: SendOtpDto) {
    const { email } = dto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    const admin = await this.prisma.admin.findUnique({ where: { email } });
    const superAdmin = await this.prisma.superAdmin.findUnique({
      where: { email },
    });

    if (!user && !admin && !superAdmin) {
      throw new NotFoundException('User not found');
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = moment().add(5, 'minutes').toDate();

    await this.prisma.OTP.upsert({
      where: {
        userId: user?.id || admin?.id || superAdmin?.id,
      },
      update: { otp, expiresAt },
      create: {
        userId: user?.id,
        adminId: admin?.id,
        superAdminId: superAdmin?.id,
        otp,
        expiresAt,
      },
    });

    await this.mailerService.sendMail({
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp}`,
    });

    return { message: 'OTP sent successfully' };
  }

  /**
   * Verify OTP for any role (User, Admin, SuperAdmin)
   */
  async verifyOtp(dto: VerifyOtpDto) {
    const { email, otp } = dto;

    // Find user in any table
    const user = await this.prisma.user.findUnique({ where: { email } });
    const admin = await this.prisma.admin.findUnique({ where: { email } });
    const superAdmin = await this.prisma.superAdmin.findUnique({
      where: { email },
    });

    if (!user && !admin && !superAdmin) {
      throw new NotFoundException('User not found');
    }

    const userId = user?.id || admin?.id || superAdmin?.id;

    const otpRecord = await this.prisma.OTP.findFirst({
      where: {
        OR: [{ userId }, { adminId: userId }, { superAdminId: userId }],
      },
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
   * Reset Password for any role (User, Admin, SuperAdmin)
   */
  async resetPassword(dto: ResetPasswordDto) {
    const { email, otp, newPassword } = dto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    const admin = await this.prisma.admin.findUnique({ where: { email } });
    const superAdmin = await this.prisma.superAdmin.findUnique({
      where: { email },
    });

    if (!user && !admin && !superAdmin) {
      throw new NotFoundException('User not found');
    }

    const userId = user?.id || admin?.id || superAdmin?.id;

    const otpRecord = await this.prisma.OTP.findFirst({
      where: {
        OR: [{ userId }, { adminId: userId }, { superAdminId: userId }],
      },
    });

    if (!otpRecord || otpRecord.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    if (otpRecord.expiresAt < new Date()) {
      throw new BadRequestException('OTP expired');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    if (user) {
      await this.prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });
    } else if (admin) {
      await this.prisma.admin.update({
        where: { email },
        data: { password: hashedPassword },
      });
    } else if (superAdmin) {
      await this.prisma.superAdmin.update({
        where: { email },
        data: { password: hashedPassword },
      });
    }

    await this.prisma.OTP.delete({
      where: { id: otpRecord.id },
    });

    return { message: 'Password reset successfully' };
  }
}
