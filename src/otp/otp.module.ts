import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [MailerModule],
  controllers: [OtpController],
  providers: [OtpService, PrismaService],
})
export class OtpModule {}
