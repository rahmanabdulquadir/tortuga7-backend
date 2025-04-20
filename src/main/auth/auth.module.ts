import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UsersModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { MailModule } from '../mail/mail.module';

// @Module({
//   imports: [
//     UsersModule,
//     MailModule,
//     PassportModule,
//     // ConfigModule,
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       useFactory: async (config: ConfigService) => ({
//         secret: config.get<string>('JWT_SECRET'),
//         signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') },
//       }),
//       inject: [ConfigService],
//     }),
//   ],
//   controllers: [AuthController],
  
//   providers: [AuthService, JwtService, ConfigService],
// })
// export class AuthModule {}


@Module({
  imports: [
    UsersModule,
    MailModule,
    PassportModule,
    JwtModule, // ✅ Let’s keep this simple if you're not using async config here
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (config: ConfigService) => ({
    //     secret: config.get<string>('JWT_SECRET'),
    //     signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}