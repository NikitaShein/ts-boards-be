import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import typeOrmModule from './db/typeOrmModule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ConfigModule.forRoot(), typeOrmModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
