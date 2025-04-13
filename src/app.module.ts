import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './main/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './main/user/user.module';
import { SeederService } from './prisma/seeder.service';
import { MailModule } from './main/mail/mail.module';
import { ProductModule } from './main/product/product.module';
import { ServiceModule } from './main/service/service.module';
import { BlogModule } from './main/blog/blog.module';
import { ContactModule } from './main/contact/contact.module';
import { PartnerModule } from './main/partner/partner.module';
import { SpecsModule } from './main/specs/specs.module';


@Module({
  imports: [
    AuthModule,
    UsersModule, 
    PrismaModule, 
    MailModule, 
    ProductModule, 
    ServiceModule, 
    BlogModule, 
    ContactModule, 
    PartnerModule, 
    SpecsModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeederService],
})
export class AppModule {}


