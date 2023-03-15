import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CardDto } from './dto/card.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService {
  @InjectRepository(Card)
  private readonly cardsRepository: Repository<Card>;

  public async sortCards(moved: CardDto, cards: CardDto[]): Promise<CardDto[]> {
    if (cards.length < 2) {
      return cards;
    }

    const displaced = cards.find(
      (card) => card.position === moved.position && card.id !== moved.id,
    );

    displaced.position =
      displaced.position == 0 ? displaced.position + 1 : displaced.position - 1;

    return cards
      .sort((a, b) => a.position - b.position)
      .map((e, i) => ({ position: (e.position = i), ...e }));
  }

  public async getCardsFromColumn(id: number): Promise<CardDto[]> {
    return await getRepository(Card)
      .createQueryBuilder('card')
      .where('card.column_id = :column_id', { column_id: id })
      .orderBy({ position: 'ASC' })
      .getMany();
  }

  public async changePosition(id: number, body: CardDto): Promise<CardDto[]> {
    const cardsInColumn = await this.getCardsFromColumn(body.column_id);
    const prevCard = cardsInColumn.find((card) => card.id === id);

    if (body.position === prevCard.position) {
      return cardsInColumn;
    } else {
      const newCards = cardsInColumn.filter((card) => card.id != id);
      newCards.push(body);
      const sortedCards = await this.sortCards(body, newCards);

      return sortedCards;
    }
  }

  public async getPosition(id: number): Promise<number> {
    const cards = await this.getCardsFromColumn(id);
    let position: number;
    if (cards.length === 0) {
      return (position = cards.length);
    }

    return (position = cards.length);
  }
}
