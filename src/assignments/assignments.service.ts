import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Assignment } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class AssignmentsService {
  constructor(private prisma: PrismaService) {}

  async createAssignment(
    adminId: string,
    data: {
      title: string;
      subject: string;
      year: number;
      branch: string;
      semester: number;
    },
  ): Promise<Assignment> {
    return this.prisma.assignment.create({
      data: { ...data, adminId },
    });
  }

  async getAllAssignments(): Promise<Assignment[]> {
    return this.prisma.assignment.findMany();
  }

  async getAssignmentById(id: string): Promise<Assignment> {
    const assignment = await this.prisma.assignment.findUnique({
      where: { id },
    });
    if (!assignment) throw new NotFoundException('Assignment not found');
    return assignment;
  }

  async updateAssignment(
    id: string,
    data: {
      title?: string;
      subject?: string;
      year?: number;
      branch?: string;
      semester?: number;
    },
  ): Promise<Assignment> {
    return this.prisma.assignment.update({
      where: { id },
      data,
    });
  }

  async deleteAssignment(id: string): Promise<Assignment> {
    return this.prisma.assignment.delete({ where: { id } });
  }
}
