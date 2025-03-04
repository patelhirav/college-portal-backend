import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  branch: string;

  @IsNotEmpty()
  @IsNumberString()
  year: string; // Convert to number

  @IsNotEmpty()
  @IsNumberString()
  semester: string; // Convert to number

  @IsNotEmpty()
  enr_no: string; // Ensure enr_no is not empty
}
