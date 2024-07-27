import { registerAs } from '@nestjs/config';

export default registerAs('payment', () => ({
  daraja: {
    consumerKey: process.env.DARAJA_CONSUMER_KEY,
    consumerSecret: process.env.DARAJA_CONSUMER_SECRET,
    shortcode: process.env.DARAJA_SHORTCODE,
    passkey: process.env.DARAJA_PASSKEY,
    callbackUrl: 'https://your-callback-url.com/payment/callback',
  },
}));
