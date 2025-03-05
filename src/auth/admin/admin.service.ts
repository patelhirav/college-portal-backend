import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from '../dto/signup.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import * as bcrypt from 'bcrypt';
import { $Enums } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  /**
   * Super Admin Adding Admin
   */
  async addAdmin(adminDto: SignupDto, superAdminId: string) {
    const { name, email, password, branch } = adminDto;

    // Check if the requester is a Super Admin
    const superAdmin = await this.prisma.superAdmin.findUnique({
      where: { id: superAdminId },
    });

    if (!superAdmin) {
      throw new UnauthorizedException('Only Super Admins can add Admins');
    }

    // Check if admin with this email already exists
    const existingAdmin = await this.prisma.admin.findUnique({
      where: { email },
    });
    if (existingAdmin)
      throw new BadRequestException('Admin with this email already exists');

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the Admin
    const admin = await this.prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
        branch,
      },
    });

    return {
      message: 'Admin added successfully',
      adminId: admin.id,
    };
  }

  /**
   * Get all Admins (Only Super Admin can view)
   */
  async getAllAdmins() {
    return this.prisma.admin.findMany({
      select: { id: true, name: true, email: true, branch: true },
    });
  }

  /**
   * Get a single Admin by ID
   */
  async getAdminById(adminId: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
      select: { id: true, name: true, email: true, branch: true },
    });

    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  /**
   * Update Admin (Only Super Admin can update)
   */
  async updateAdmin(adminId: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) throw new NotFoundException('Admin not found');

    const updatedAdmin = await this.prisma.admin.update({
      where: { id: adminId },
      data: {
        name: updateAdminDto.name,
        email: updateAdminDto.email,
        password: updateAdminDto.password
          ? await bcrypt.hash(updateAdminDto.password, 10)
          : undefined,
        branch: updateAdminDto.branch as $Enums.Branch, 
      },
    });

    return { message: 'Admin updated successfully', updatedAdmin };
  }

  /**
   * Delete Admin (Only Super Admin can delete)
   */
  async deleteAdmin(adminId: string) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    });
    if (!admin) throw new NotFoundException('Admin not found');

    await this.prisma.admin.delete({ where: { id: adminId } });

    return {
      message: 'Admin deleted successfully',
    };
  }
}
