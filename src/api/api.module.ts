import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { PermissionsModule } from './permissions/permissions.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [BoardsModule, UsersModule, PermissionsModule],
})
export class ApiModule {}
