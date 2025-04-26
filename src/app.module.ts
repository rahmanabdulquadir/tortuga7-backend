import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './main/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './main/user/user.module';
import { SeederService } from './prisma/seeder.service';
import { MailModule } from './main/mail/mail.module';
// import { ProductModule } from './main/product/product.module';
import { ServiceModule } from './main/service/service.module';
import { BlogModule } from './main/blog/blog.module';
import { ContactModule } from './main/contact/contact.module';
// import { PartnerModule } from './main/partner/partner.module';
// import { SpecsModule } from './main/specs/specs.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './main/auth/jwt.strategy';
import { ItemModule } from './main/item/item.module';
import { CustomServerBuildService } from './main/custom-server-build/custom-server-build.service';
import { CustomServerBuildController } from './main/custom-server-build/custom-server-build.controller';
import { CustomServerBuildModule } from './main/custom-server-build/custom-server-build.module';


@Module({
  imports: [
    AuthModule,
    UsersModule, 
    PrismaModule, 
    MailModule, 
    // ProductModule, 
    ServiceModule, 
    BlogModule, 
    ContactModule, 
    // PartnerModule, 
    // SpecsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: config.getOrThrow('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
    
    ItemModule,
    
    CustomServerBuildModule,
    
  ],
  controllers: [AppController, CustomServerBuildController],
  providers: [AppService, SeederService, JwtStrategy, CustomServerBuildService],
})
export class AppModule {}


