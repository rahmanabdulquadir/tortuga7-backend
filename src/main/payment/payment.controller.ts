// import { Controller, Post, Body, Headers, Req } from '@nestjs/common';
// import { PaymentService } from './payment.service';
// import { Request } from 'express';
// import Stripe from 'stripe';

// @Controller('payment')
// export class PaymentController {
//   constructor(private readonly paymentService: PaymentService) {}

//   @Post('checkout')
//   createCheckout(@Body() body: { productId: string; userId: string }) {
//     return this.paymentService.createCheckoutSession(
//       body.productId,
//       body.userId,
//       'http://localhost:3000/payment/success',
//       'http://localhost:3000/payment/cancel',
//     );
//   }

//   @Post('webhook')
//   async handleWebhook(@Req() request: Request, @Headers('stripe-signature') signature: string) {
//     const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });
//     const endpointSecret = 'your-stripe-webhook-secret';

//     let event: Stripe.Event;

//     try {
//       event = stripe.webhooks.constructEvent(
//         request['rawBody'],
//         signature,
//         endpointSecret,
//       );
//     } catch (err) {
//       console.log(`Webhook error: ${err.message}`);
//       return { error: 'Webhook signature verification failed' };
//     }

//     await this.paymentService.handleWebhook(event);
//     return { received: true };
//   }
// }