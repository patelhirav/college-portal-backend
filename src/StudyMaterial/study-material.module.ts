import { Module } from '@nestjs/common';
import { StudyMaterialService } from './study-material.service';
import { StudyMaterialController } from './study-material.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [StudyMaterialController],
  providers: [StudyMaterialService, PrismaService],
})
export class StudyMaterialModule {}
