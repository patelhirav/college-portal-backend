import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Req,
} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  async create(@Req() req, @Body() dto: CreateAssignmentDto) {
    return this.assignmentsService.createAssignment(req.user.id, dto);
  }

  @Get()
  async findAll() {
    return this.assignmentsService.getAllAssignments();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.assignmentsService.getAssignmentById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateAssignmentDto) {
    return this.assignmentsService.updateAssignment(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.assignmentsService.deleteAssignment(id);
  }
}
