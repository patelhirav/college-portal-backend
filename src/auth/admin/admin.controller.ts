import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { SignupDto } from '../dto/signup.dto';
import { UpdateAdminDto } from '../dto/update-admin.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add-admin')
  async addAdmin(@Body() adminDto: SignupDto, @Req() req) {
    return this.adminService.addAdmin(adminDto, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('admins')
  async getAllAdmins(@Req() req) {
    return this.adminService.getAllAdmins();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('admin/:id')
  async getAdminById(@Param('id') adminId: string) {
    return this.adminService.getAdminById(adminId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('admin/:id')
  async updateAdmin(
    @Param('id') adminId: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminService.updateAdmin(adminId, updateAdminDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('admin/:id')
  async deleteAdmin(@Param('id') adminId: string) {
    return this.adminService.deleteAdmin(adminId);
  }
}
