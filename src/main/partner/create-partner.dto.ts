// import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// export class CreatePartnerDto {
//   @ApiProperty({
//     example: 'IKEA',
//     description: 'Name of the partner brand',
//   })
//   @IsString()
//   @IsNotEmpty()
//   name: string;

//   @ApiProperty({
//     example: 'https://example.com/logo.png',
//     description: 'URL to the partner brand logo',
//   })
//   @IsString()
//   @IsNotEmpty()
//   logo: string;

//   @ApiPropertyOptional({
//     example: 'https://www.ikea.com',
//     description: 'Official website of the partner brand (optional)',
//   })
//   @IsOptional()
//   @IsUrl()
//   website?: string;
// }
