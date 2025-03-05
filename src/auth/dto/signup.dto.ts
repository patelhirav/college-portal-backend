import { IsEmail, IsEnum, IsInt, IsNotEmpty, Min } from 'class-validator';
import { Branch } from '@prisma/client';

export class SignupDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(Branch, { message: 'Invalid branch selected' })
  branch: Branch;

  @IsInt()
  @Min(1)
  year: number;

  @IsInt()
  @Min(1)
  semester: number;

  @IsNotEmpty()
  enr_no: string;
}
