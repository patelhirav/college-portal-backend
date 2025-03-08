import {
  Controller,
  Post,
  Get,
  Param,
  Query,
  UploadedFile,
  UseInterceptors,
  Body,
  Request,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { StudyMaterialService } from './study-material.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadStudyMaterialDto } from './dto/upload-study-material.dto';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Study Material')
@Controller('study-material')
export class StudyMaterialController {
  constructor(private readonly studyMaterialService: StudyMaterialService) {}

  @Post('upload')
  @ApiBearerAuth() // Adds token authentication in Swagger
  @UseGuards(AuthGuard('jwt')) // Protects route with JWT authentication
  @ApiConsumes('multipart/form-data') // Required for file upload
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        subject: { type: 'string', example: 'Mathematics' },
        chapter: { type: 'string', example: 'Algebra' },
        year: { type: 'integer', example: 2024 },
        branch: { type: 'string', example: 'Computer Science' },
        semester: { type: 'integer', example: 2 },
        file: {
          type: 'string',
          format: 'binary', // Indicates file upload in Swagger
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/study-materials',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const filename = `${uniqueSuffix}-${file.originalname}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (file.mimetype !== 'application/pdf') {
          return callback(
            new BadRequestException('Only PDF files are allowed!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadStudyMaterial(
    @Body() data: UploadStudyMaterialDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req, // Get logged-in user
  ) {
    if (!file) {
      throw new BadRequestException('File is required!');
    }

    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Only admins can upload study materials!');
    }

    const filePath = file?.path ?? '';

    return this.studyMaterialService.uploadStudyMaterial(data, filePath);
  }

  @Get()
  async getAllStudyMaterials() {
    return this.studyMaterialService.getAllStudyMaterials();
  }

  @Get('filter')
  async getStudyMaterialsByFilter(
    @Query('year') year: number,
    @Query('branch') branch: string,
    @Query('semester') semester: number,
  ) {
    return this.studyMaterialService.getStudyMaterialsByFilter(
      Number(year),
      branch,
      Number(semester),
    );
  }

  @Get(':id')
  async getStudyMaterialById(@Param('id') id: string) {
    return this.studyMaterialService.getStudyMaterialById(id);
  }
}
