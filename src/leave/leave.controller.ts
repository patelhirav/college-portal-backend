import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { LeaveService } from './leave.service';
import { ApplyLeaveDto } from './dto/leave.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @UseGuards(JwtAuthGuard)
  @Post('apply')
  applyLeave(@Req() req, @Body() applyLeaveDto: ApplyLeaveDto) {
    const user = req.user; // Extract user from JWT token
    if (user.role !== 'USER') {
      throw new UnauthorizedException('Only students can apply for leave');
    }
    return this.leaveService.applyLeave(user.id, applyLeaveDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-leaves')
  getUserLeaves(@Req() req) {
    return this.leaveService.getUserLeaves(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('pending-leaves')
  getPendingLeaves() {
    return this.leaveService.getPendingLeaves();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-status/:id')
  updateLeaveStatus(
    @Param('id') leaveId: string,
    @Body('status') status: string,
  ) {
    return this.leaveService.updateLeaveStatus(leaveId, status);
  }
}
