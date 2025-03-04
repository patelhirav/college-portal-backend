import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAssignmentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  subject: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  year: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  semester: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  branch: string;

  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  @IsOptional()
  fileUrl?: string; 
}
