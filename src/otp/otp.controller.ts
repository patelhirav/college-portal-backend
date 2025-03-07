import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('otp')
export class OtpController {
  constructor(private otpService: OtpService) {}

  @Post('send')
  sendOtp(@Body() dto: SendOtpDto) {
    return this.otpService.sendOtp(dto);
  }

  @Post('verify')
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.otpService.verifyOtp(dto);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.otpService.resetPassword(dto);
  }
}
