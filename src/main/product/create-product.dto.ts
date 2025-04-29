import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  productName: string;

  @ApiProperty()
  productModel: string;

  @ApiProperty()
  brandName: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  description: string;

//   @ApiProperty({ type: 'object' })
//   filters?: Record<string, any>;

  @ApiProperty({ type: [String] })
  keyApplications: string[];

  @ApiProperty({ type: [String] })
  keyFeatures: string[];

  @ApiProperty({ type: [String] })
  images: string[];

  @ApiProperty()
  price: number;

  @ApiProperty()
  available: boolean;

  @ApiProperty()
  serviceId: string;
}
