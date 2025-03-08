import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudyMaterialDto } from './dto/study-material.dto';

@Injectable()
export class StudyMaterialService {
  constructor(private prisma: PrismaService) {}

  async uploadStudyMaterial(data: StudyMaterialDto, filePath: string) {
    if (!filePath) {
      throw new BadRequestException(
        'File is required and must be in PDF format',
      );
    }

    return this.prisma.studyMaterial.create({
      data: {
        subject: data.subject,
        chapter: data.chapter,
        year: Number(data.year), 
        branch: data.branch,
        semester: Number(data.semester), 
        fileUrl: filePath,
      },
    });
  }

  async getAllStudyMaterials() {
    return this.prisma.studyMaterial.findMany();
  }

  async getStudyMaterialsByFilter(
    year: number,
    branch: string,
    semester: number,
  ) {
    return this.prisma.studyMaterial.findMany({
      where: { year, branch, semester },
    });
  }

  async getStudyMaterialById(id: string) {
    const material = await this.prisma.studyMaterial.findUnique({
      where: { id },
    });
    if (!material) throw new NotFoundException('Study Material not found');
    return material;
  }
}
