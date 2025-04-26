import { PartialType } from '@nestjs/swagger';
import { CreateCustomServerBuildDto } from './create-custom-server-build.dto';

export class UpdateCustomServerBuildDto extends PartialType(CreateCustomServerBuildDto) {}
