// dto/update-status.dto.ts
import { IsEnum } from 'class-validator';

export enum ConsultantStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export class UpdateConsultantStatusDto {
  @IsEnum(ConsultantStatus)
  status: ConsultantStatus;
}
