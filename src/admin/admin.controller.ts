import { Controller, Post, Get, Patch, Delete, Body, Param } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  createAdmin(@Body() dto: CreateAdminDto) {
    return this.adminService.createAdmin(dto);
  }

  @Get()
  getAllAdmins() {
    return this.adminService.getAllAdmins();
  }

  @Get(':id')
  getAdminById(@Param('id') id: string) {
    return this.adminService.getAdminById(id);
  }

  @Patch(':id')
  updateAdmin(@Param('id') id: string, @Body() dto: UpdateAdminDto) {
    return this.adminService.updateAdmin(id, dto);
  }

  @Delete(':id')
  deleteAdmin(@Param('id') id: string) {
    return this.adminService.deleteAdmin(id);
  }
}
