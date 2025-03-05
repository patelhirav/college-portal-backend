import { IsOptional, IsString, IsEmail, IsEnum } from 'class-validator';
import { $Enums } from '@prisma/client'; 

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  @IsEnum($Enums.Branch) 
  branch?: $Enums.Branch;
}
