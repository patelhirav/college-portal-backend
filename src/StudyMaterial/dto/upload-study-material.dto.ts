import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class UploadStudyMaterialDto {
  @ApiProperty({ example: 'Mathematics' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: 'Algebra' })
  @IsString()
  @IsNotEmpty()
  chapter: string;

  @ApiProperty({ example: 2024 })
  @IsInt()
  @IsNotEmpty()
  year: number;

  @ApiProperty({ example: 'Computer Science' })
  @IsString()
  @IsNotEmpty()
  branch: string;

  @ApiProperty({ example: 2 }) 
  @IsInt()
  @IsNotEmpty()
  semester: number;
}
