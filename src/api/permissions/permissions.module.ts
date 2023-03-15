import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Permissions from './entities/permissions.entity';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permissions])],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
