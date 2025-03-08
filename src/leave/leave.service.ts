import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplyLeaveDto } from './dto/leave.dto';

@Injectable()
export class LeaveService {
  constructor(private prisma: PrismaService) {}

  async applyLeave(userId: string, dto: ApplyLeaveDto) {
    return this.prisma.leave.create({
      data: {
        userId: userId, // Use the logged-in user ID
        applicantName: 'test',
        leaveDate: new Date(dto.leaveDate), // Convert to Date object
        noOfDays: dto.noOfDays,
        leaveReason: dto.leaveReason,
        status: 'PENDING',
      },
    });
  }

  async getUserLeaves(userId: string) {
    return this.prisma.leave.findMany({
      where: { userId },
      include: { user: true }, // Ensure lowercase 'user'
    });
  }

  async getPendingLeaves() {
    return this.prisma.leave.findMany({
      where: { status: 'PENDING' },
      include: { user: true },
    });
  }

  async updateLeaveStatus(leaveId: string, status: string) {
    return this.prisma.leave.update({
      where: { id: leaveId },
      data: { status },
    });
  }
}
