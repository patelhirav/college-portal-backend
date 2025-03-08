import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class StudyMaterialDto {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  chapter: string;

  @IsInt()
  year: number;

  @IsString()
  @IsNotEmpty()
  branch: string;

  @IsInt()
  semester: number;
}
