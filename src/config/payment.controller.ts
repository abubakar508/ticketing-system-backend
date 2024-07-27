import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('initiate')
  async initiatePayment(@Body() paymentDetails: { amount: number; phoneNumber: string }) {
    const { amount, phoneNumber } = paymentDetails;
    return this.paymentService.initiatePayment(amount, phoneNumber);
  }
}
