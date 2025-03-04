import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateAssignmentDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  subject?: string;

  @IsOptional()
  @IsInt()
  year?: number;

  @IsOptional()
  @IsString()
  branch?: string;

  @IsOptional()
  @IsInt()
  semester?: number;
}
