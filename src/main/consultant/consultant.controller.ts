import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ConsultantService } from './consultant.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateConsultantDto } from './create-consultant.dto';
import { UpdateConsultantStatusDto } from './update-status.dto';

@ApiTags('Consultants')
@Controller('consultants')
export class ConsultantController {
  constructor(private readonly consultantService: ConsultantService) {}

  @Post()
  @ApiOperation({ summary: 'Request a consultation' })
  @ApiResponse({ status: 201, description: 'Consultation request created' })
  async create(@Body() dto: CreateConsultantDto) {
    return this.consultantService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all consultation requests' })
  async findAll() {
    return this.consultantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one consultation request' })
  async findOne(@Param('id') id: string) {
    return this.consultantService.findOne(id);
  }

  @Patch(':id/status')
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateConsultantStatusDto })
  @ApiOperation({ summary: 'Update consultant status' })
  async updateStatus(
    @Param('id') id: string,
    @Body() body: UpdateConsultantStatusDto,
  ) {
    return this.consultantService.updateStatus(id, body.status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a consultation request' })
  async remove(@Param('id') id: string) {
    return this.consultantService.remove(id);
  }
}
