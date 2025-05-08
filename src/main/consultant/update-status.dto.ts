// dto/update-status.dto.ts
import { IsEnum } from 'class-validator';

export enum ConsultantStatus {
  NEW = 'new',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export class UpdateConsultantStatusDto {
  @IsEnum(ConsultantStatus)
  status: ConsultantStatus;
}
