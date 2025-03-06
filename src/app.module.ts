import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AssignmentModule } from './assignment/assignment.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from '../src/assignment/config/multer.config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/college-portal'),
    AuthModule,
    PrismaModule,
    AssignmentModule,
    AdminModule,
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
