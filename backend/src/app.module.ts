import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './appmodules/user/users.module';
import { AuthModule } from './appmodules/auth/auth.module';
import { SalesModule } from './appmodules/sales/sales.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    SalesModule,
  ],
})
export class AppModule {}
