// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { PartnerService } from './partner.service';
// import { ApiTags } from '@nestjs/swagger';
// import { CreatePartnerDto } from './create-partner.dto';
// import { UpdatePartnerDto } from './update-partner.dto';

// @ApiTags('Partner')
// @Controller('partner')
// export class PartnerController {
//   constructor(private readonly partnerService: PartnerService) {}

//   @Post()
//   create(@Body() dto: CreatePartnerDto) {
//     return this.partnerService.create(dto);
//   }

//   @Get()
//   findAll() {
//     return this.partnerService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.partnerService.findOne(id);
//   }

//   @Get(':id/products')
// getProductsByPartner(@Param('id') id: string) {
//   return this.partnerService.findProductsByPartner(id);
// }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() dto: UpdatePartnerDto) {
//     return this.partnerService.update(id, dto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.partnerService.remove(id);
//   }
// }
