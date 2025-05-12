// controllers/booking.controller.ts
import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { BookingService } from './booking.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateBookingDto } from './create-booking.dto';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  create(@Body() dto: CreateBookingDto) {
    return this.bookingService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bookings' })
  findAll() {
    return this.bookingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking by ID' })
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete booking by ID' })
  delete(@Param('id') id: string) {
    return this.bookingService.delete(id);
  }
}
