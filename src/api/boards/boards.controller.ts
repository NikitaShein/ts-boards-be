import {
  Body,
  Controller,
  Delete,
  ExecutionContext,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { BoardDto } from './dto/board.dto';
import { ColumnDto } from './dto/column.dto';
import { CardDto } from './dto/card.dto';
import { Board } from './entities/board.entity';
import { Column } from './entities/column.entity';
import { BoardsService } from './boards.service';
import { Card } from './entities/card.entity';
import { JwtUserGuard } from '../users/jwt-user.guard';
import { PermissonGuard } from '../permissions/permissions.guard';

@Controller('boards')
@UseGuards(JwtUserGuard)
export class BoardsController {
  @Inject(BoardsService)
  private readonly service: BoardsService;

  @Get()
  public getBoards(): Promise<Board[]> {
    return this.service.getBoards();
  }

  @UseGuards(PermissonGuard)
  @Get(':board_id')
  public getBoardWithContent(
    @Param('board_id', ParseIntPipe) board_id: number,
  ) {
    return this.service.getBoardWithContent(board_id);
  }

  @Post()
  public createBoard(@Body() body: BoardDto): Promise<Board> {
    return this.service.createBoard(body);
  }

  @Post(':board_id/columns')
  public createColumn(
    @Body() body: ColumnDto,
    @Param('board_id', ParseIntPipe) id: number,
  ): Promise<Column> {
    return this.service.createColumn(body, id);
  }

  @Delete('columns/:column_id')
  public removeColumn(@Param('column_id', ParseIntPipe) column_id: number) {
    return this.service.removeColumn(column_id);
  }

  @Put('columns/:column_id')
  public updateColumn(
    @Param('column_id', ParseIntPipe) column_id: number,
    @Body() body: ColumnDto,
  ): Promise<Column> {
    return this.service.updateColumn(column_id, body);
  }

  @Post(':board_id/cards')
  public createCard(@Body() body: CardDto): Promise<Card> {
    return this.service.createCard(body);
  }

  @Delete('cards/:card_id')
  public removeCard(@Param('card_id', ParseIntPipe) card_id: number) {
    return this.service.removeCard(card_id);
  }

  @Put('cards/:card_id')
  public updateCard(
    @Param('card_id', ParseIntPipe) card_id: number,
    @Body() body: CardDto,
  ): Promise<Card> {
    return this.service.updateCard(card_id, body);
  }
}
