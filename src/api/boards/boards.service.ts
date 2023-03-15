import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CardsService } from './cards.service';
import { BoardDto } from './dto/board.dto';
import { CardDto } from './dto/card.dto';
import { ColumnDto } from './dto/column.dto';
import { Board } from './entities/board.entity';
import { Card } from './entities/card.entity';
import { Column } from './entities/column.entity';

@Injectable()
export class BoardsService {
  constructor(private cardsService: CardsService) {}

  @InjectRepository(Board)
  private readonly boardsRepository: Repository<Board>;
  @InjectRepository(Column)
  private readonly columnsRepository: Repository<Column>;
  @InjectRepository(Card)
  private readonly cardsRepository: Repository<Card>;

  getBoards(): Promise<Board[]> {
    return this.boardsRepository.find();
  }

  public async getBoardWithContent(board_id: number): Promise<Board[]> {
    return await getRepository(Board)
      .createQueryBuilder('board')
      .where({ id: board_id })
      .leftJoinAndSelect('board.columns', 'columns')
      .leftJoinAndSelect('columns.cards', 'cards')
      .orderBy({ columns: 'ASC', position: 'ASC' })
      .getMany();
  }

  public createBoard(body: BoardDto): Promise<Board> {
    const board: Board = new Board();

    board.name = body.name;

    return this.boardsRepository.save(board);
  }

  public getColumnById(id: number): Promise<Column> {
    return this.columnsRepository.findOne(id);
  }

  public createColumn(body: ColumnDto, id: number): Promise<Column> {
    const column: Column = new Column();

    column.name = body.name;
    column.board_id = id;

    return this.columnsRepository.save(column);
  }

  public async removeColumn(id: number): Promise<Column> {
    const entity = await this.columnsRepository.findOne(id);

    return this.columnsRepository.remove(entity);
  }

  public updateColumn(column_id: number, body: ColumnDto): Promise<Column> {
    return this.columnsRepository.save({
      id: column_id,
      ...body,
    });
  }

  public async createCard(body: CardDto): Promise<Card> {
    const position = await this.cardsService.getPosition(body.column_id);

    const card: Card = new Card();
    card.name = body.name;
    card.text = body.text;
    card.position = position;
    card.column_id = body.column_id;

    return this.cardsRepository.save(card);
  }

  public async removeCard(id: number): Promise<Card> {
    const entity = await this.cardsRepository.findOne(id);

    return this.cardsRepository.remove(entity);
  }

  public async updateCard(card_id: number, body: CardDto): Promise<Card> {
    const prevCard = await this.cardsRepository.findOne(card_id);
    const isColumnChanged = prevCard.column_id === Number(body.column_id);

    if (isColumnChanged) {
      const cards = await this.cardsService.changePosition(card_id, body);
      await this.cardsRepository.save(cards);

      return await this.cardsRepository.findOne(card_id);
    } else {
      const updateCard = await this.cardsRepository.save({
        ...body,
      });

      const cardsInColumn = await this.cardsService.getCardsFromColumn(
        prevCard.column_id,
      );

      cardsInColumn.forEach((card, index) => (card.position = index));

      await this.cardsRepository.save(cardsInColumn);

      return updateCard;
    }
  }
}
