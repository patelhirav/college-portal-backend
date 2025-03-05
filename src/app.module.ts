import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AssignmentModule } from './assignment/assignment.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from '../src/assignment/config/multer.config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    AssignmentModule,
    MulterModule.register(multerConfig),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      defaults: {
        from: '"No Reply" <patelhirav2212@gmail.com>',
      },
    }),
  ],
})
export class AppModule {}
