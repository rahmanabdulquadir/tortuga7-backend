// import { IsOptional, IsString, IsNumber } from 'class-validator';
// import { Type } from 'class-transformer';
// import { ApiPropertyOptional } from '@nestjs/swagger';

// export class FilterProductDto {
//   @ApiPropertyOptional({
//     description: 'Search keyword to match product name or description',
//     // example: 'cleaning',
//   })
//   @IsOptional()
//   @IsString()
//   search?: string;

//   @ApiPropertyOptional({
//     description: 'Minimum price to filter products',
//     // example: 100,
//   })
//   @IsOptional()
//   @Type(() => Number)
//   @IsNumber()
//   minPrice?: number;

//   @ApiPropertyOptional({
//     description: 'Maximum price to filter products',
//     // example: 500,
//   })
//   @IsOptional()
//   @Type(() => Number)
//   @IsNumber()
//   maxPrice?: number;

//   @ApiPropertyOptional({
//     description: 'Filter products by service ID',
//     // example: 'svc_abc123',
//   })
//   @IsOptional()
//   @IsString()
//   serviceId?: string;

//   @ApiPropertyOptional({
//     description: 'Filter products by partner ID',
//     // example: 'partner_xyz789',
//   })
//   @IsOptional()
//   @IsString()
//   partnerId?: string;
// }

