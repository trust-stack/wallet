import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PrismaClient, WalletCredential } from '@prisma/client';
import {
  CreateWalletCredentialDto,
  PaginatedWalletCredentialsResponseDto,
  WalletCredentialDto,
} from './wallet.dto';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
  constructor(@Inject('PRISMA_CLIENT') private readonly prisma: PrismaClient) {}

  @Get('credentials')
  @ApiOperation({
    summary: 'Get paginated wallet credentials',
    operationId: 'getWalletCredentials',
    parameters: [
      {
        name: 'page',
        description: 'Page number (1-based)',
        in: 'query',
        required: false,
      },
      {
        name: 'limit',
        description: 'Number of items per page',
        in: 'query',
        required: false,
      },
    ],
  })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated credentials',
    type: PaginatedWalletCredentialsResponseDto,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (1-based)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
    example: 10,
  })
  async getCredentials(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<PaginatedWalletCredentialsResponseDto> {
    const skip = (page - 1) * limit;

    const where = {};

    const [credentials, total] = await Promise.all([
      this.prisma.walletCredential.findMany({
        skip,
        take: +(limit || 10),
        orderBy: {
          issuanceDate: 'desc',
        },
      }),
      this.prisma.walletCredential.count({ where }),
    ]);

    return {
      credentials: credentials.map(toCredentialDto),
      pagination: {
        total,
        page: +page,
        limit: +limit,
        pages: Math.ceil(total / limit),
      },
    };
  }

  @Post('credentials')
  @ApiOperation({
    summary: 'Create a new wallet credential',
    operationId: 'addWalletCredential',
  })
  @ApiResponse({
    status: 201,
    description: 'Credential created successfully',
    type: WalletCredentialDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid credential data',
  })
  async addCredential(
    @Body() data: CreateWalletCredentialDto,
  ): Promise<WalletCredentialDto> {
    try {
      const credential = await this.prisma.walletCredential.create({
        data,
      });

      return toCredentialDto(credential);
    } catch (error) {
      throw new HttpException(
        'Failed to create credential',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('credentials/:id')
  @ApiOperation({
    summary: 'Delete a wallet credential',
    operationId: 'deleteWalletCredential',
  })
  @ApiParam({ name: 'id', description: 'Credential ID' })
  @ApiResponse({
    status: 200,
    description: 'Credential deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Credential not found',
  })
  async deleteCredential(@Param('id') id: string): Promise<void> {
    try {
      await this.prisma.walletCredential.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException('Credential not found', HttpStatus.NOT_FOUND);
    }
  }
}

const toCredentialDto = (credential: WalletCredential): WalletCredentialDto => {
  return {
    ...credential,
    raw: credential.raw as Record<string, any>,
  };
};
