import { IsString, IsDate, IsInt, IsUUID } from 'class-validator';

export class ApplyLeaveDto {
  @IsUUID()
  userId: string;

  @IsString()
  applicantName: string;

  @IsDate()
  leaveDate: Date;

  @IsInt()
  noOfDays: number;

  @IsString()
  leaveReason: string;
}
