import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async createAdmin(dto: CreateAdminDto) {
    return this.prisma.admin.create({ data: dto });
  }

  async getAllAdmins() {
    return this.prisma.admin.findMany();
  }

  async getAdminById(id: string) {
    const admin = await this.prisma.admin.findUnique({ where: { id } });
    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  async updateAdmin(id: string, dto: UpdateAdminDto) {
    return this.prisma.admin.update({ where: { id }, data: dto });
  }

  async deleteAdmin(id: string) {
    return this.prisma.admin.delete({ where: { id } });
  }
}
