import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

@ApiSchema({ name: 'CreateWalletCredential' })
export class CreateWalletCredentialDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The name of the wallet credential' })
  name?: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ description: 'The context of the wallet credential' })
  context: string[];

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ description: 'The issuance date of the wallet credential' })
  issuanceDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ description: 'The expiration date of the wallet credential' })
  expirationDate?: Date;

  @IsObject()
  @ApiProperty({ description: 'The raw data of the wallet credential' })
  raw: Record<string, any>;
}

@ApiSchema({ name: 'WalletCredential' })
export class WalletCredentialDto {
  @ApiProperty({ description: 'The ID of the wallet credential' })
  id: string;

  @ApiProperty({ description: 'The name of the wallet credential' })
  name?: string;

  @ApiProperty({ description: 'The context of the wallet credential' })
  context: string[];

  @ApiProperty({ description: 'The issuance date of the wallet credential' })
  issuanceDate?: Date;

  @ApiProperty({ description: 'The expiration date of the wallet credential' })
  expirationDate?: Date;

  @ApiProperty({ description: 'The raw data of the wallet credential' })
  raw: Record<string, any>;
}

@ApiSchema({ name: 'Pagination' })
export class PaginationDto {
  @ApiProperty({ description: 'The total number of items' })
  total: number;

  @ApiProperty({ description: 'The current page number' })
  page: number;

  @ApiProperty({ description: 'The number of items per page' })
  limit: number;

  @ApiProperty({ description: 'The total number of pages' })
  pages: number;
}

@ApiSchema({ name: 'PaginatedWalletCredentialsResponse' })
export class PaginatedWalletCredentialsResponseDto {
  @ApiProperty({
    description: 'The wallet credentials',
    type: [WalletCredentialDto],
  })
  credentials: WalletCredentialDto[];

  @ApiProperty({
    description: 'The pagination information',
    type: PaginationDto,
  })
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}
