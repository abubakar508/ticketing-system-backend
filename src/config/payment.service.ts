import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService {
  private readonly darajaConfig: Record<string, string>;

  constructor(private readonly configService: ConfigService) {
    this.darajaConfig = this.configService.get('payment.daraja');
  }

  async initiatePayment(amount: number, phoneNumber: string): Promise<any> {
    const { consumerKey, consumerSecret, shortcode, passkey, callbackUrl } = this.darajaConfig;

    // current tiemstamp in the required format
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, -3);

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    const data = {
      BusinessShortCode: shortcode,
      Password: Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64'),
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: shortcode,
      PhoneNumber: phoneNumber,
      CallBackURL: callbackUrl,
      AccountReference: 'your_account_reference',
      TransactionDesc: 'Payment for services',
    };

    try {
      const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', data, {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to initiate payment: ${error.message}`);
    }
  }
}
