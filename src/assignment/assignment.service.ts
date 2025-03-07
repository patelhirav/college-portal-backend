import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto, UpdateAssignmentDto } from './dto/assignment.dto';
import { Branch } from '@prisma/client';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}

  async create(
    dto: CreateAssignmentDto,
    adminId: string,
    file?: Express.Multer.File,
  ) {
    return this.prisma.assignment.create({
      data: {
        ...dto,
        adminId,
        branch: dto.branch as Branch,
        fileUrl: file ? `/uploads/${file.filename}` : null,
      },
    });
  }

  async findAll() {
    return this.prisma.assignment.findMany();
  }

  async findOne(id: string) {
    const assignment = await this.prisma.assignment.findUnique({
      where: { id },
    });
    if (!assignment) throw new NotFoundException('Assignment not found');
    return assignment;
  }

  async update(
    id: string,
    dto: UpdateAssignmentDto,
    adminId: string,
    file?: Express.Multer.File,
  ) {
    return this.prisma.assignment.update({
      where: { id },
      data: {
        ...dto,
        branch: dto.branch ? (dto.branch as Branch) : undefined,
        fileUrl: file ? `/uploads/${file.filename}` : undefined,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.assignment.delete({ where: { id } });
  }
}
