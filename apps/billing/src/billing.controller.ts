import { Controller, Get } from '@nestjs/common';
import { BillingService } from './billing.service';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { PrismaModel } from '@app/classes';

@Controller()
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('/usage')
  @ApiOperation({ summary: 'Get the collected billing history' })
  @ApiResponse({
    status: 200,
    description: 'History',
    type: PrismaModel.Usage,
    isArray: true,
  })
  async getAll() {
    return await this.billingService.getUsage();
  }
}
