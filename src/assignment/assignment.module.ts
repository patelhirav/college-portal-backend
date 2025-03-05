import { Module } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt'; 
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Reflector } from '@nestjs/core';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [AssignmentController],
  providers: [AssignmentService, JwtAuthGuard, Reflector], 
})
export class AssignmentModule {}
