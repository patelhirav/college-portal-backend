import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  UseGuards,
  Param,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LeaveService } from './leave.service';
import { ApplyLeaveDto } from './dto/apply-leave.dto';
import { UpdateLeaveStatusDto } from './dto/update-leave-status.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Leave')
@ApiBearerAuth()
@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  // Apply for Leave (Only Students)
  @Post('apply')
  @UseGuards(AuthGuard('jwt'))
  async applyForLeave(@Request() req, @Body() dto: ApplyLeaveDto) {
    if (req.user.role !== 'USER') {
      throw new ForbiddenException('Only students can apply for leave');
    }
    return this.leaveService.applyForLeave(req.user.id, dto);
  }

  // Get All Leaves for the Logged-in User
  @Get('my-leaves')
  @UseGuards(AuthGuard('jwt'))
  async getUserLeaves(@Request() req) {
    return this.leaveService.getUserLeaves(req.user.id);
  }

  // Admin: Get Pending Leaves
  @Get('pending')
  @UseGuards(AuthGuard('jwt'))
  async getAllPendingLeaves(@Request() req) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can view pending leaves');
    }
    return this.leaveService.getAllPendingLeaves();
  }

  // Admin: Approve/Reject Leave Request
  @Patch(':id/status')
  @UseGuards(AuthGuard('jwt'))
  async updateLeaveStatus(
    @Request() req,
    @Param('id') leaveId: string,
    @Body() dto: UpdateLeaveStatusDto,
  ) {
    if (req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Only admins can approve/reject leaves');
    }
    return this.leaveService.updateLeaveStatus(leaveId, dto);
  }
}
