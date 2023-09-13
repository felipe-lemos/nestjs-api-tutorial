import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

//This is the main module.
//A module can import another module.
//It may be good to have modules by features.

//ConfigModule.forRoot uses the .env module!
@Module({
  imports: [AuthModule, ConfigModule.forRoot({isGlobal: true}), UserModule, BookmarkModule, PrismaModule],
})
export class AppModule {}
