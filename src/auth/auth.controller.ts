import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({
    type: LoginDto,
    examples: {
      example1: {
        summary: 'Default Login Example',
        value: {
          email: '',
          password: '',
        },
      },
    },
  })
  @UseInterceptors(AnyFilesInterceptor())
  async login(@Body() loginDto: LoginDto) {
    console.log('Received Data:', loginDto);
    return this.authService.login(loginDto);
  }

  @Post('signup')
  @ApiBody({
    type: SignupDto,
    examples: {
      example1: {
        summary: 'Default Signup Example',
        value: {
          name: '',
          email: '',
          password: '',
          branch: '',
          year: '',
          semester: '',
          enr_no: '',
        },
      },
    },
  })
  @UseInterceptors(AnyFilesInterceptor())
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}