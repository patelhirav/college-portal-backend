import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplyLeaveDto } from './dto/apply-leave.dto';
import { UpdateLeaveStatusDto } from './dto/update-leave-status.dto';

@Injectable()
export class LeaveService {
  constructor(private readonly prisma: PrismaService) {}

  async applyForLeave(userId: string, dto: ApplyLeaveDto) {
    return await this.prisma.leave.create({
      data: {
        userId,
        reason: dto.reason,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
      },
    });
  }

  async getUserLeaves(userId: string) {
    return await this.prisma.leave.findMany({
      where: { userId },
    });
  }

  async getAllPendingLeaves() {
    return await this.prisma.leave.findMany({
      where: { status: 'pending' },
      include: { user: true },
    });
  }

  async updateLeaveStatus(leaveId: string, dto: UpdateLeaveStatusDto) {
    const leave = await this.prisma.leave.findUnique({
      where: { id: leaveId },
    });

    if (!leave) throw new NotFoundException('Leave request not found');

    return await this.prisma.leave.update({
      where: { id: leaveId },
      data: { status: dto.status },
    });
  }
}
