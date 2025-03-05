import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  title: string;

  @IsString()
  subject: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  year: number;

  @IsString()
  branch: string;

  @IsInt()
  sem: number;

  @IsOptional()
  @IsString()
  fileUrl?: string; 
}

export class UpdateAssignmentDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  year?: number;

  @IsOptional()
  @IsString()
  branch?: string;

  @IsOptional()
  @IsInt()
  sem?: number;

  @IsOptional()
  @IsString()
  fileUrl?: string;
}
