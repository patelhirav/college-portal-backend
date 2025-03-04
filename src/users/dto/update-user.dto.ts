import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  branch?: string;

  @IsOptional()
  @IsInt()
  semester?: number;

  @IsOptional()
  @IsInt()
  year?: number;
}
