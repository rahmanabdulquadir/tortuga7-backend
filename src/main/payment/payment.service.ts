// // 4. payment.service.ts
// import { Injectable } from '@nestjs/common';
// import Stripe from 'stripe';
// import { ConfigService } from '@nestjs/config';
// import { PrismaService } from 'src/prisma/prisma.service';


// @Injectable()
// export class PaymentService {
//   private stripe: Stripe;

//   constructor(
//     private configService: ConfigService,
//     private prisma: PrismaService,
//   ) {
   
//     this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY')!, {
//         apiVersion: '2022-11-15',
//       });
      
//   }

//   async createCheckoutSession(
//     productId: string,
//     userId: string,
//     successUrl: string,
//     cancelUrl: string,
//   ) {
//     const product = await this.prisma.product.findUnique({ where: { id: productId } });
//     if (!product) throw new Error('Product not found');

//     const session = await this.stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             unit_amount: product.price * 100,
//             product_data: {
//               name: product.name,
//               description: product.description || '',
//             },
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: successUrl,
//       cancel_url: cancelUrl,
//       metadata: {
//         userId,
//         productId,
//       },
//     });

//     return { url: session.url };
//   }

//   async handleWebhook(event: Stripe.Event) {
//     if (event.type === 'checkout.session.completed') {
//       const session = event.data.object as Stripe.Checkout.Session;
//       const userId = session.metadata.userId;
//       const productId = session.metadata.productId;

//       await this.prisma.order.create({
//         data: {
//           userId,
//           productId,
//           amount: session.amount_total / 100,
//           paymentIntent: session.payment_intent as string,
//           status: 'PAID',
//         },
//       });
//     }
//   }
// }
