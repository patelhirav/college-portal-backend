import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class ApplyLeaveDto {
  @ApiProperty({ example: 'Medical Leave' })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({ example: '2025-03-10' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ example: '2025-03-12' })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;
}
