import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { Board } from './entities/board.entity';
import { BoardsService } from './boards.service';
import { Column } from './entities/column.entity';
import { Card } from './entities/card.entity';
import { CardsService } from './cards.service';
import { UsersModule } from '../users/users.module';
import { PermissionsModule } from '../permissions/permissions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, Column, Card]),
    UsersModule,
    PermissionsModule,
  ],
  controllers: [BoardsController],
  providers: [BoardsService, CardsService],
})
export class BoardsModule {}
